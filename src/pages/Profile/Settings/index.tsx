
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBInput, MDBTypography, MDBCardText, MDBListGroup, MDBListGroupItem, MDBCardImage } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IContextType, InputUpdate, Tab } from '../../../lib/types';
import { useForm } from 'react-hook-form';
import { handleUpdateLogin, handleUpdatePassword } from '../../../lib/api';


export const Settings = () => {
    const { account } = useOutletContext<IContextType>();
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Profile);
    const [errorApi,setErrorApi] = useState<string>("")
    const {register,handleSubmit,formState:{errors}} = useForm<InputUpdate>()
    const navigate = useNavigate()

    const handleTabChange = (tab:Tab) => {
        setActiveTab(tab)
    }

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

    
    return account && <>
        <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
      <MDBRow className="h-100">

          <MDBCol md="4" className="d-flex flex-column">
            <MDBListGroup>
              <MDBListGroupItem 
                active={activeTab === 'profile'} 
                onClick={() => handleTabChange(Tab.Profile)} 
                style={{ cursor: 'pointer' }}
              >
                Profile Info
              </MDBListGroupItem>
              <MDBListGroupItem 
                active={activeTab === 'changePassword'} 
                onClick={() => handleTabChange(Tab.ChangePassword)} 
                style={{ cursor: 'pointer' }}
              >
                Change Password
              </MDBListGroupItem>
              <MDBListGroupItem 
                active={activeTab === 'changeLogin'} 
                onClick={() => handleTabChange(Tab.ChangeLogin)} 
                style={{ cursor: 'pointer' }}
              >
                Change Login
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCol>

          <MDBCol md="8">
            <MDBCard>
              <MDBCardBody className="text-black p-4">

                {activeTab === 'profile' && (
                  <>
                    <MDBTypography tag="h2">Profile Info</MDBTypography>
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-0 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                    <MDBCardText>Name: {account.name}</MDBCardText>
                    <MDBCardText>Surname: {account.surname}</MDBCardText>
                  </>
                )}

                {activeTab === 'changePassword' && (
                  <>
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
                )}

                {activeTab === 'changeLogin' && (
                  <>
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
                )}

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
    </div>
    </>
}