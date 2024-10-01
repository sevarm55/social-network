
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBInput, MDBTypography, MDBCardText, MDBListGroup, MDBListGroupItem, MDBCardImage } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IContextType, InputUpdate, Tab } from '../../../lib/types';
import { useForm } from 'react-hook-form';
import { handleUpdateLogin, handleUpdatePassword } from '../../../lib/api';
import { BASE_URL, DEFAULT_PIC } from '../../../lib/constant';
import { EditPassword } from '../../../components/EditPassword';
import { EditLogin } from '../../../components/EditLogin';


export const Settings = () => {
    const { account } = useOutletContext<IContextType>();
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Profile);

    const handleTabChange = (tab:Tab) => {
      setActiveTab(tab)
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
                    <MDBCardImage 
                      src={!account.picture ? DEFAULT_PIC : `${BASE_URL}${account.picture}`}
                      alt="Generic placeholder image" 
                      className="mt-0 mb-2 img-thumbnail" 
                      fluid 
                      style={{ width: '150px', zIndex: '1' }} />
                    <MDBCardText>Name: {account.name}</MDBCardText>
                    <MDBCardText>Surname: {account.surname}</MDBCardText>
                  </>
                )}

                {activeTab === 'changePassword' && (
                  <EditPassword />
                )}

                {activeTab === 'changeLogin' && (
                  <EditLogin />
                )}

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
    </div>
    </>
}