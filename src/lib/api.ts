import axios from 'axios'
import { IResponse, InputUser, InputUserLogin } from './types'

const Axios = axios.create({
  baseURL: 'http://localhost:4002',
})

export const handleSignup = async (user: InputUser): Promise<IResponse> => {
  const response = await Axios.post('/signup', user)
  return response.data
}

export const handleLogin = async (user: InputUserLogin): Promise<IResponse> => {
    const response = await Axios.post('/login', user)
    return response.data
}