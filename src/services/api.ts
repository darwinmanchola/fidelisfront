import { authOptions } from '@/configs/nextauthConfig';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';



const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(async (config) => {
    const sessionUser = await getServerSession(authOptions); // Pasa `authOptions`

    if (sessionUser ) {    
    config.headers.Authorization = `Bearer ${sessionUser.access}`;
  }  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;