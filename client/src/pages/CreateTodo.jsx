import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { createTodo } from '../features/auth/authSlice'

const CreateTodo = () => {

let dispatch = useDispatch()
let {message} = useSelector(state=> state.auth)
let [form,setForm] = useState({
    text: '',
    avatar: ''
})

let handleSubmit = ()=>{
    console.log(form);
    dispatch(createTodo(form))
    setForm({
    text: '',
    avatar: ''
})
}


  return (
    <> 
    <h2>CreateTodo</h2>
    <input onChange={(e)=> setForm({...form, avatar: e.target.files})} type="file" name="avatar"/>

    <input onChange={(e)=> setForm({...form, text : e.target.value})} type="text" placeholder='write here...'/>
    <button onClick={handleSubmit}>submit</button>
    
    {message && console.log(message)}
    
    </>
  )
}

export default CreateTodo