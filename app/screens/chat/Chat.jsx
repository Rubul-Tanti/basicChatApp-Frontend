import { View, Text, TextInput, Button} from 'react-native'
import React,{useContext, useState} from 'react'
import {context}from'../../context/context'
import { Socket } from 'socket.io-client'
export default function Chat() {
  const [msg,setmsg]=useState([])
  
const {chat,setchat,alluser,socket}=useContext(context)
const [text,settext]=useState()
const [turn,setturn]=useState(0)
const handleonchange=(e)=>{
  e.preventDefault()
  setchat(null)
}
const handleonPress=(e)=>{
  if(text===''){return}
setturn(0)
  e.preventDefault()
  setmsg([...msg,{code:0,text:text}])
socket.emit('privatemessage',{reciever:chat.socketId,sender:socket.id,text:text})
settext('')
}
socket.on('privatemessage',(data)=>{
  console.log(data)
  const newtext=data.text
 setturn(1)
  setmsg([...msg,{code:1,text:newtext}])
})
  return (
    <View className='  bg-primary '>
      <View className='flex flex-row p-5 gap-5 border-b border-secondary items-center  h-24'>
      <Button onPress={(e)=>{handleonchange(e)}} title='Back' color={'black'} ></Button>

<Text   className='text-white text-2xl'>{chat.name}</Text>
      </View>
      <View className="h-[80%] flex-col flex justify-start bg-white">
{msg.map((msg)=>(<View className={msg.code===0&&'flex flex-row-reverse  w-full'}>
<Text className={`self-start mt-2  rounded-lg text-base py-4 min-w-24 px-4 mx-2 ${msg.code===0?'bg-secondary border-primary border  text-primary':'text-white bg-primary '}`}>{msg.text}</Text>
</View>
))}
      </View>
      <View className=' w-full  h-20 p-5 flex flex-row gap-3 '>
        <TextInput value={text} placeholder='Type a message'  onChangeText={settext} className='w-72 h-12 border bg-gray-300 border-gray-300 rounded-lg px-4 text-base text-black' ></TextInput>
        <Button onPress={(e)=>{handleonPress(e)}} title='Send' ></Button>
      </View>
    </View>
  )
}