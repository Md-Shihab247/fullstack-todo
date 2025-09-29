import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/auth/authSlice"

const Login = () => {
  let dispatch = useDispatch()
  let {message, error, loading} = useSelector(state => state.auth)
  let [from,setFrom] = useState({
      email: '',
      password: ''
  })
    
   return (
      <>
        <input onChange={(e)=> setFrom({...from, email: e.target.value})} type="email" placeholder="email..."/>
        <input onChange={(e)=> setFrom({...from, password: e.target.value })} type="password" placeholder="password..."/>
        
        {loading
        ?
        <button>loading...</button>
        :
        <button onClick={()=> dispatch(login(from))}>login</button>
        }
  
        {message && <h2>{message}</h2>}
        {error && console.log(error)}
        
      </>
    )
}

export default Login
