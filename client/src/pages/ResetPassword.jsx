import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetPass } from "../features/auth/authSlice"
import {useParams} from 'react-router-dom'
const ResetPassword = () => {
  let {message, error} = useSelector(state => state.auth)
  let dispatch = useDispatch()
  let token = useParams()
  let [from,setFrom] = useState({resetToken: token , password: ''})


  let handleReset = ()=> {
    if (token) {
      dispatch(resetPass({from}))
    }
  }

  return (
    <>
        <div>ResetPassword</div>

        <input onChange={(e)=> setFrom({...from, password: e.target.value })} type="password" placeholder="password..."/>
        <button onClick={handleReset}>submit</button>
  
        {message && <h2>{message}</h2>}
        {error && console.log(error)}
    </>
  )
}

export default ResetPassword