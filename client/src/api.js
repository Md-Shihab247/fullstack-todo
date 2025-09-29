import axios from 'axios' 
import {jwtDecode} from 'jwt-decode' 


let api = axios.create({
        baseURL: "http://localhost:8000/api",
        withCredentials: true
 })

 let accessToken = JSON.parse(localStorage.getItem('accessToken')) || null
 
 api.interceptors.request.use(async (config)=>{
        if(accessToken){
            let decoded = jwtDecode(accessToken)
            if (decoded.exp * 1000 < Date.now()) {
                 let res = await api.post('/auth/refresh')
                 accessToken = res.data 
              }
          config.headers.Authorization = `Bearer ${accessToken}`
       }
       return config
  }) 

  export default api 