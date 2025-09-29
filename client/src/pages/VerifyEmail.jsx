import { useEffect } from "react"
import { useSelector , useDispatch } from "react-redux"
import {useParams} from 'react-router-dom'
import { verifyEmail } from "../features/auth/authSlice"
const VerifyEmail = () => {

  let {token} = useParams()
  let {message} = useSelector(state => state.auth)
  let dispatch = useDispatch()

  useEffect(()=>{

    if (token) {
      dispatch(verifyEmail(token))
    }

  },[])

  return (

    <>

    {message  &&  <h2>{message}</h2>}
    </>
  )
}

export default VerifyEmail