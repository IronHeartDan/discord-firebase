import { Help, Inbox, Notifications, People, PersonPin, Search } from '@material-ui/icons'
import React from 'react'
import './ChatHeader.css';

function ChatHeader({channelName}) {
    return (
        <div className='chat_header'>
            <div className="header_left">
                <h3>
                    <span className='header_hash'>#</span>
                    {channelName}
                </h3>
            </div>

            <div className="header_right">
                <Notifications/>
                <PersonPin/>
                <People/>
                <div className="chat_search">
                    <input type="text" placeholder='Search'/>
                    <Search/>
                    </div>
                    <Inbox/>
                    <Help/>
            </div>
        </div>
    )
}

export default ChatHeader
