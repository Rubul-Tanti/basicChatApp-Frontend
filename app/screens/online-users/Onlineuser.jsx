import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { context } from '../../context/context'  // Fixed import path
export default function Onlineuser() {
  const {user, socket, setchat,setsocket, alluser, setalluser} = useContext(context)
useEffect(() => {
socket.emit('register', user)
socket.on('onlineusers', (users) => {

  setalluser(users)})
  
// Add check for socket and user
}, [socket])


    // Added user to dependency array
const handleonPress=(value,e)=>{
  e.preventDefault()
  
  if(value.name===user){return}
  setchat(value)
} 
  return (
    <View className='flex w-screen h-screen justify-start gap-5  '>
      <Text className='text-secondary bg-primary p-5 font-semibold text-4xl'>ONLINE USERS</Text>
      {alluser.length===1&&<Text className='text-purple-300 font-semibold text-sm'>No one is online</Text>}
      {alluser.map((User, i) =>{
        if(user==User.name){return
        }
        return(
        <TouchableOpacity className='w-full px-5 flex ' onPress={(e)=>{handleonPress(User,e)}} key={i}>
          <View className='flex flex-row justify-start gap-2 p-2 w-full h-16 border-b-primary  border-b rounded-lg pl-2'>

            <Text className='text-primary font-semibold text-2xl'>{User.name}</Text>
          </View>
        </TouchableOpacity>
      )
})}
    </View>
  )
}
