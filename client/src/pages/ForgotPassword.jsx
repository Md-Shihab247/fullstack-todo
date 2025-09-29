import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { forgotPass } from "../features/auth/authSlice"

const ForgotPassword = () => {
  let dispatch = useDispatch()
  let {message, error} = useSelector(state => state.auth)
  let [from,setFrom] = useState({ email: ''})

  return (
   <>
      <input onChange={(e)=> setFrom({...from, email: e.target.value})} type="email" placeholder="email..."/>  

      <button onClick={()=> dispatch(forgotPass(from))}>submit</button>

      {message && <h2>{message}</h2>}
      {error && console.log(error)}
           
    </>

  )
}

export default ForgotPassword