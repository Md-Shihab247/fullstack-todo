import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registration } from "../features/auth/authSlice"

const Ragistration = () => {
  let dispatch = useDispatch()
  let {message, error} = useSelector(state => state.auth)
  let [from,setFrom] = useState({
    username: '',
    email: '',
    password: ''
  })

  return (
    <>
      <input onChange={(e)=> setFrom({...from, username: e.target.value })} type="text"  placeholder="username..."/>
      <input onChange={(e)=> setFrom({...from, email: e.target.value})} type="email" placeholder="email..."/>
      <input onChange={(e)=> setFrom({...from, password: e.target.value })} type="password" placeholder="password..."/>
      <button onClick={()=> dispatch(registration(from))}>Ragister</button>

      {message && <h2>{message}</h2>}
      {error && console.log(error)}
      
    </>
  )
}

export default Ragistration