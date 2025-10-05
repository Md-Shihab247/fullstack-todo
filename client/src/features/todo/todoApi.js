import api from '../../api'

export const createTodo = (data) => api.post('/todo/create', data)
export const getTodos = () => api.get('/todo/all')
export const updateTodo = (id, data) => api.put(`/todo/${id}`, data)
export const deleteTodo = (id) => api.delete(`/todo/${id}`)