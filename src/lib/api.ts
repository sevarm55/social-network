import axios from 'axios'
import { IResponse, InputUpdate, InputUser, InputUserLogin } from './types'

const Axios = axios.create({
  baseURL: 'http://localhost:4002',
  withCredentials: true
})

export const handleSignup = async (user: InputUser): Promise<IResponse> => {
  const response = await Axios.post('/signup', user)
  return response.data
}

export const handleLogin = async (user: InputUserLogin): Promise<IResponse> => {
  const response = await Axios.post('/login', user)
  return response.data
}

export const handleverify = async (): Promise<IResponse> => {
  const response = await Axios.get('/verify')
  return response.data
}

export const handleLogOut = async ():Promise<IResponse> => {
  const response = await Axios.post('/logout')
  return response.data
}

export const handleUpdatePassword = async (user:InputUpdate):Promise<IResponse> => {
  const response = await Axios.patch('/update/password',user)
  return response.data
}

export const handleUpdateLogin = async (user:InputUpdate):Promise<IResponse> => {
  const response = await Axios.patch('/update/login',user)
  return response.data
}

export const handlePictureUpload = async (data:FormData):Promise<IResponse> => {
  const response = await Axios.patch('/profile/upload',data)
  return response.data
}

export const handleCoverUpload = async (data:FormData):Promise<IResponse> => {
  const response = await Axios.patch('cover/upload',data)
  return response.data
}

export const handleGetPosts = async (): Promise<IResponse> => {
  const response = await Axios.get('/posts')
  return response.data
}

export const handlePostCreation = async (data:FormData): Promise<IResponse> => {
  const response = await Axios.post('/posts',data)
  return response.data
}

export const handleSearch = async (text:string): Promise<IResponse> => {
  const response = await Axios.get('/search/' + text)
  return response.data
}

export const handlePublicPrive = async (): Promise<IResponse> => {
  const response = await Axios.patch('/account/set')
  return response.data
}

export const handleGetUserById = async (id:string): Promise<IResponse> => {
  const response = await Axios.get('/account/' + id)
  return response.data
}