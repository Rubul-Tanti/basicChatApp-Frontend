import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { context } from '../../context/context'  // Fixed import path
export default function Onlineuser() {
  const {user, socket, setchat,setsocket, alluser, setalluser} = useContext(context)
useEffect(() => {
socket.emit('register', user)
socket.on('onlineusers', (users) => {
  console.log(users)
  setalluser(users)})
  
// Add check for socket and user
}, [socket])


    // Added user to dependency array
const handleonPress=(value,e)=>{
  e.preventDefault()
  console.log("value",value.name)
  console.log('user',user,user.username)
  if(value.name===user.username){return}
  setchat(value)
} 
  return (
    <View className='flex w-screen h-screen justify-start gap-5 bg-primary p-5 '>
      <Text className='text-secondary font-semibold text-4xl'>ONLINE USERS</Text>
      {alluser.map((user, i) => (
        <TouchableOpacity onPress={(e)=>{handleonPress(user,e)}} key={i}>
          <View className='flex flex-row justify-start gap-2 p-2 w-full h-16 border-b-secondary bg-primary border-b rounded-lg pl-2'>

            <Text className='text-secondary'>{user.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
