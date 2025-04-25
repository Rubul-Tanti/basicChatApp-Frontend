import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React,{useContext, useState} from 'react'
import {context}from'../../context/context'

const Login = () => {
  const {setuser,setuserloged}=useContext(context)
const [username,setUsername]=useState()
const handleonchange=()=>{
  fetch('https://basic-mobile-chat-app-backend.onrender.com/user/api/createaccount',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      username:username
    })
  })
.then((res)=>res.json())
.then((data)=>{if(data.success){setuserloged(true); setuser(data.data)};})


}
  return (
       <View className="w-full h-screen flex items-center justify-center bg-primary">
    <View className="flex w-[85%] relative border bg-secondary h-[45%] gap-2 rounded-2xl p-5">
<Text>do not repeat name</Text>
<Text className='text-primary h-16 py-2 font-semibold text-3xl'>Login</Text>
<TextInput className='border mt-5 rounded-md bg-secondary h-14 pl-2 ' onChangeText={setUsername} placeholder='Eneter your name'></TextInput>

<TouchableOpacity onPress={handleonchange} title='Login' className=' w-full bg-primary border border-secondary mt-5 py-3 flex items-center rounded-lg '>
  <Text className='text-secondary font-semibold  '>Login</Text></TouchableOpacity>

</View>
       </View>
  )
}

export default Login