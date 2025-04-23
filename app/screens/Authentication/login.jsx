import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React,{useContext, useState} from 'react'
import {context}from'../../context/context'

const Login = () => {
  const {setuser,setuserloged}=useContext(context)
const [username,setUsername]=useState()
const handleonchange=()=>{
  fetch('http://192.168.186.218:3000/user/api/createaccount',{
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
<Text className='text-primary font-semibold text-3xl'>Login</Text>
<TextInput className='border mt-5 rounded-md bg-secondary ' onChangeText={setUsername} placeholder='Eneter your name'></TextInput>

<TouchableOpacity onPress={handleonchange} title='Login' className='bottom-5 absolute left-5 w-full bg-primary border border-secondary mt-5 py-3 flex items-center rounded-lg '>
  <Text className='text-secondary font-semibold  '>Login</Text></TouchableOpacity>

</View>
       </View>
  )
}

export default Login