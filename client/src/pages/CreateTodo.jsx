import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { createTodo } from '../features/todo/todoSlice'

const CreateTodo = () => {

let dispatch = useDispatch()
let {loading,message, error} = useSelector(state=> state.todo)
let [form,setForm] = useState({
    text: '',
    avatar: ''
})

let handleSubmit = ()=>{
    
    let formData = new FormData()
    formData.append('text', form.text)
    formData.append('avatar', form.avatar)
    dispatch(createTodo(formData))
}


  return (
    <> 
    <h2>CreateTodo</h2>
    <input onChange={(e)=> setForm({...form, avatar: e.target.files[0]})} type="file" name="avatar"/>
    <input onChange={(e)=> setForm({...form, text : e.target.value})} type="text" placeholder='write here...'/>
    <button onClick={handleSubmit}> {loading ? 'Loading...' : 'Submit'} </button>
    
    {message && <h2> {message} </h2>}
    {error && console.log(error)}
    
    </>
  )
}
 
export default CreateTodo