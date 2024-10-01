import { MDBCol, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { InputUpdate } from "../lib/types"
import { useNavigate } from "react-router-dom"
import { handleUpdateLogin } from "../lib/api"

export const EditLogin = () => {
    
    const [errorApi,setErrorApi] = useState<string>("")
    const {register,handleSubmit,formState:{errors}} = useForm<InputUpdate>()
    const navigate = useNavigate()

    const handleChangeLogin = (data:InputUpdate) => {
        handleUpdateLogin(data)
        .then(res => {
            if(res.status == 'error' && res.message) {
                setErrorApi(res.message)
                return
            }
            setErrorApi('')
            navigate('/profile')
        })
    }
    
    return <>
        <MDBTypography tag="h5">Change Login</MDBTypography>
                    <form onSubmit={handleSubmit(handleChangeLogin)}>
                    {errorApi && <p className='text-danger'>{errorApi}</p>}
                    <MDBRow className="mb-4">
                        <MDBCol md="12">
                            <MDBInput 
                                type="password" 
                                label="Password"
                                {...register('password', {
                                    required: 'Please fill your password',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />
                            {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                        </MDBCol>
                        <MDBCol md="12">
                            <MDBInput 
                                type='text'
                                label="New Login"
                                {...register('login', { required: 'Please fill your new login' })}
                            />
                            {errors.login && <p className='text-danger'>{errors.login.message}</p>}
                        </MDBCol>
                    </MDBRow>
                    <button type='submit' className='btn btn-outline-info' >Change Login</button>
                    </form>
    </>
}