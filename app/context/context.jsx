import React, { createContext, useEffect, useState } from 'react'
export const context = createContext({
  userloged: false,
  setuserloged: () => {},
  user: null,
  setuser: () => {},
  chat: null,
  setchat: () => {},
  alluser: [],
  setalluser: () => {},
  socket: null,
  setsocket: () => {}
});
function Contextdata ({children}){
  const [userloged,setuserloged]=useState(false)
  const [user,setuser]=useState(null)
  const [chat,setchat]=useState(null)
const [alluser,setalluser]=useState([])
const [socket,setsocket]=useState(null)

  return(
    <context.Provider value={{socket,setsocket,userloged,setuser,setuserloged,user,chat,setchat,alluser,setalluser}}>
      {children}
    </context.Provider>
  )
}
export default Contextdata