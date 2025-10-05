import axios from 'axios' 
import {jwtDecode} from 'jwt-decode' 


let api = axios.create({
        baseURL: "http://localhost:8000/api",
        withCredentials: true
 })

 let exceptions = ['/auth/login', '/auth/registration', '/auth/refresh']

 api.interceptors.request.use(async (config)=>{

        if(exceptions.includes(config.url)) return config
        if(localStorage.getItem('accessToken')){ 

            let accessToken = JSON.parse(localStorage.getItem('accessToken'))  
            let decoded = jwtDecode(accessToken)
            if (decoded.exp * 1000 < Date.now()) {
                 let res = await api.post('/auth/refresh')
                 accessToken = res.data.accessToken 
                 localStorage.setItem('accessToken', JSON.stringify(accessToken))
              }
              
          config.headers.Authorization = `Bearer ${accessToken}`
       }
       return config
  }) 

  export default api  