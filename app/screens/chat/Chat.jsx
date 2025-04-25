import { View, Text, TextInput,Keyboard, Button} from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import {context}from'../../context/context'
import { Socket } from 'socket.io-client'
export default function Chat() {
  const [msg,setmsg]=useState([])
  
const {chat,setchat,alluser,socket}=useContext(context)
const [text,settext]=useState()
const [turn,setturn]=useState(0)
const [keyboardHeight,setKeyboardHeight]=useState(0)
useEffect(()=>{
const hideSubscription=  Keyboard.addListener('keyboardDidHide',(e)=>{

  setKeyboardHeight(e.endCoordinates.height)
})
const showSubscription= Keyboard.addListener('keyboardDidShow',(e)=>{
  console.log(e.endCoordinates.height)
    setKeyboardHeight(e.endCoordinates.height)
  })
  

  return () => {
    showSubscription.remove();
    hideSubscription.remove();
  };


},[])
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
  if(data.sender===chat.socketId){
    const newtext=data.text
    setturn(1)
    setmsg([...msg,{code:1,text:newtext}])
  }
})
  return (
    <View className='  h-full'>
      <View className='flex flex-row p-5 gap-5 border-b border-purple-100 items-center  h-24'>
      <Button onPress={(e)=>{handleonchange(e)}} title='Back' color={'black'} ></Button>

<Text   className='text-primary font-semibold text-2xl'>{chat.name}</Text>
      </View>
      <View className="h-[78%] flex-col flex justify-start bg-white">
{msg.map((msg,i)=>(<View key={i} className={msg.code===0&&'flex flex-row-reverse  w-full'}>
<Text  className={`self-start mt-2  rounded-lg text-base py-4 min-w-24 px-4 mx-2 ${msg.code===1?'bg-secondary border-primary border  text-primary':'text-white bg-primary '}`}>{msg.text}</Text>
</View>
))}
      </View>
      <View className={` w-full  h-20 fixed ${keyboardHeight?"bottom-16":"bottom-0"} p-5 flex justify-center items-center flex-row gap-3`}>
        <TextInput onSubmitEditing={(e)=>{handleonPress(e)}} value={text} placeholder='Type a message'  onChangeText={settext} className='w-[85%]  h-16 border bg-gray-300 border-gray-300 rounded-lg text-base text-black' ></TextInput>
        <Button color={"purple"}    onPress={(e)=>{handleonPress(e)}} title='Send' ></Button>
      </View>
    </View>
  )
}