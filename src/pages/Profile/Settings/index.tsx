
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody,  MDBTypography, MDBCardText, MDBListGroup, MDBListGroupItem, MDBCardImage, MDBSwitch } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiLock } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";

import { IContextType, Tab } from '../../../lib/types';
import { BASE_URL, DEFAULT_PIC } from '../../../lib/constant';
import { EditPassword } from '../../../components/EditPassword';
import { EditLogin } from '../../../components/EditLogin';
import { handlePublicPrive } from '../../../lib/api';


export const Settings = () => {
    const { account,setAccount } = useOutletContext<IContextType>();
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Profile);

    const handleTabChange = (tab:Tab) => {
      setActiveTab(tab)
    }

    const handleToggle = () => {
      handlePublicPrive()
      .then(res => {
        setAccount({...account, isPrivate:res.payload as boolean})
        console.log(res.payload);
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
                    <MDBCardImage 
                      src={!account.picture ? DEFAULT_PIC : `${BASE_URL}${account.picture}`}
                      alt="Generic placeholder image" 
                      className="mt-0 mb-2 img-thumbnail" 
                      fluid 
                      style={{ width: '150px', zIndex: '1' }} />
                    <MDBCardText>Name: {account.name}</MDBCardText>
                    <MDBCardText>Surname: {account.surname}</MDBCardText>
                    <hr />
                    <MDBCardText>PrivacySwitch</MDBCardText>
                    <div className="private">
                      <MDBSwitch 
                        id="privacySwitch"
                        checked={account.isPrivate} 
                        onChange={handleToggle}
                        style={{ marginRight: '10px' }}
                      />
                      <span>{account.isPrivate ? <FiLock /> : <FiUnlock />}</span>
                    </div>
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