import { createContext, useState } from "react";
import run from "../config/gemini";

export let Context = createContext();

const ContextProvider = (props) => {

    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");//text from the input filed text;
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");//result information
     
    const delayPara=(index,nextword)=>{
        setTimeout(()=>{
         setResultData(prev=>prev+nextword);
        },75*index)
    }
 
    const onSent = async (prompt) => {
     setResultData("");
     setLoading(true);
     setShowResult(true);
     setRecentPrompt(input);
     setPrevPrompts((prev)=>{[...prev,input]});
     const response = await run(input); 
    let responseArray = response.split("**");
    let newArray;
    for(let i=0;i<responseArray.length;i++) {
        if(i===0 || i%2 !==1){
             
             newArray += responseArray[i];
        }else{
            newArray +="<b>" + responseArray[i] + "</b>";
        }
    }
    let newArray2 = newArray.split("*").join("<br/>");
    
     let naga = newArray2.split(" ");
     for(let i=0; i<naga.length; i++){
       const nextword = naga[i];
       delayPara(i,nextword+"  ");
     }
     setLoading(false);
     setInput("");

    }
   
    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        
    }

   
    

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;