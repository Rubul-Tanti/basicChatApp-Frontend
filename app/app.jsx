import { View, Text } from 'react-native'
import io from "socket.io-client"
import './global.css'
import Onlineuser from "./screens/online-users/Onlineuser";
import Login from './screens/Authentication/login'
import Chat from'./screens/chat/Chat'
import { context } from "./context/context";
import { useEffect, useContext } from "react";
export default function App() {
  const {userloged,setsocket,socket,chat}=useContext(context)
useEffect(()=>{
  if(!socket){
    const Socket=io('https://basic-mobile-chat-app-backend.onrender.com')
    setsocket(Socket)
  }
},[])
  return (
    <View >
      {chat!==null?<Chat/>:userloged?<Onlineuser/>:<Login/>
    }
    </View>
  )
}