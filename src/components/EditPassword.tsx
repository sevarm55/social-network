import { MDBCol, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { handleUpdatePassword } from "../lib/api"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { InputUpdate } from "../lib/types"

export const EditPassword = () => {

    const navigate = useNavigate()
    const [errorApi,setErrorApi] = useState<string>("")
    const {register,handleSubmit,formState:{errors}} = useForm<InputUpdate>()
    
    const handleChangePassword = (data:InputUpdate) => {
        handleUpdatePassword(data)
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
        <MDBTypography tag="h5">Change Password</MDBTypography>
                        <form onSubmit={handleSubmit(handleChangePassword)}>
                    <MDBRow className="mb-4">
                            {errorApi && <p className='text-danger'>{errorApi}</p>}
                        <MDBCol md="12">
                            <MDBInput 
                                type="password" 
                                label="Current Password" 
                                {...register('old', {
                                    required: 'Please fill your old password',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                                />
                            {errors.old && <p className='text-danger'>{errors.old.message}</p>}
                        </MDBCol>
                        <MDBCol md="12">
                            <MDBInput 
                                type="password" 
                                label="New Password" 
                                {...register('newpwd', {
                                    required: 'Please fill your new password',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                                />
                        {errors.newpwd && <p className='text-danger'>{errors.newpwd.message}</p>}
                        </MDBCol>
                    </MDBRow>
                    <button type='submit' className='btn btn-outline-info' >Change Password</button>
                    </form>
    </>
}