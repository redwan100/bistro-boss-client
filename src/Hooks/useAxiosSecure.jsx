import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/ContextProvider'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate()

    const axiosSecure= axios.create({
        baseURL: 'http://localhost:5000'
    })

    useEffect(()=>{
        axiosSecure.interceptors.request.use((config) =>{
            const token = localStorage.getItem('access-token')

            if(token){
                config.headers.Authorization = `bearer ${token}`
            }

            return config;
        })

        axiosSecure.interceptors.response.use(
            (response)=> response,
            async(err)=>{
                if(err.response && (err.response.status == 401 || err.response.status === 403)){
                    await logOut()
                    navigate('/login')
                }
                 return Promise.reject(err)
            }
        )
    },[logOut, navigate, axiosSecure])

  return axiosSecure;
}

export default useAxiosSecure