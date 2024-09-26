import { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { InputUser } from '../../lib/types';
import { handleSignup } from '../../lib/api';
import { useForm } from 'react-hook-form';

export function Signup() {
    const {register,handleSubmit,formState:{errors}} = useForm<InputUser>()
    const [errorApi,setErrorApi] = useState<string>("")
    const navigate = useNavigate()
    const onSubmit = (data:InputUser) => {
        handleSignup(data)
        .then(res => {
            if(res.status == 'error' && res.message) {
                setErrorApi(res.message)
            }
            navigate('/login')
        })
        setErrorApi('')
    }
    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                {errorApi && <p className='text-danger'>{errorApi}</p>}
                                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    type='text'
                                    {...register('name', { required: 'Please fill your name' })}
                                />
                                {errors.surname && <p className='text-danger'>{errors.surname.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Surname'
                                    type='text'
                                    {...register('surname', { required: 'Please fill your surname' })}
                                />
                                {errors.login && <p className='text-danger'>{errors.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    {...register('login', { required: 'Please fill your login' })}
                                />
                                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
                                    {...register('password', {
                                        required: 'Please fill your password',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}
