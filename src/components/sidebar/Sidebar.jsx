import React, {  useState } from 'react'
import './sidebar.css'
import {assets} from '../../assets/assets'


const Sidebar = () => {

    const [extended, setExtended] = useState(false);
   

    return (
        <div className='sidebar'>
            <div className="top">
                <img src={assets.menu_icon} alt="" className="menu" onClick={() => setExtended(prev => !prev)} />
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended
                    ? <div className="recent">
                        <p className='recent-title'>Recent</p>
                        
                    </div>
                    : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
