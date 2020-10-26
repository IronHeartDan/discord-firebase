import { Avatar } from '@material-ui/core'
import { Add, ExpandMore, Headset, Mic, Settings } from '@material-ui/icons'
import db, { auth } from './Firebase'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import './Sidebar.css'
import SidebarChannel from './SidebarChannel'

function Slidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(()=>{
      db.collection('channels').onSnapshot(snapshot=>{
          setChannels(snapshot.docs.map(doc=>({
              id: doc.id,
              channel: doc.data()
          })))
      })
  },[])

  const handleAddChannel = () =>{
      const channelName = prompt("Enter A New Channel Name...");
      if(channelName){
          db.collection('channels').add({
              channelName: channelName
          })
      }
  }

    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <h3>DarkNoon</h3>
                <ExpandMore/>
            </div>


            <div className="sidebar__channels">
                <div className="sidebar_channelsHeader">
                    <div className="sidebar_header">
                        <ExpandMore/>
                        <h4>Text Channels</h4>
                    </div>
                    <Add onClick={handleAddChannel} className="sidebar_addChannel"/>
                </div>
                <div className="channels_list">
                    {channels.map(({id,channel}) =>(
                        <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
                    ))}
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar onClick={()=>auth.signOut()} src={user.photo}/>
                <div className="sidebar_profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,8)}</p>
                </div>
                <div className="sidebar_profileIcons">
                    <Mic/>
                    <Headset/>
                    <Settings/>
                </div>
            </div>
        </div>
    )
}

export default Slidebar
