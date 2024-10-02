import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { FiLock } from "react-icons/fi"

import { handleGetUserById } from "../../../lib/api"
import { IAccount } from "../../../lib/types"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"
import { Gallery } from "../../../components/Gallery"

export const Account = () => {
    
    const {id} = useParams()
    const [account,setAccount] = useState<IAccount | null>(null)

    useEffect(() => {
        if(id) {
            handleGetUserById(id)
            .then(res => {
                setAccount(res.payload as IAccount)
            })
        }
    },[])
    
    

    return <>
       <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div 
                className="rounded-top text-white d-flex flex-row" 
                style={{ 
                    backgroundColor: '#000',
                    backgroundImage: account?.cover ?
                    `url(${BASE_URL}${account?.cover})`
                    : "none",
                    height: '200px' 
                }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage 
                    src={account?.picture ? `${BASE_URL}${account.picture}` : DEFAULT_PIC}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{account?.name} {account?.surname}</MDBTypography>
                  <MDBCardText>New York</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">{account?.posts?.length || 0}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{account?.followers?.length || 0}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{account?.following?.length || 0}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <button className="btn btn-s btn-info my-2">follow</button>
                </div>
                {!account?.isPrivate ? (
                    <div className="mt-5">
                        <MDBTypography tag="h4">Gallery</MDBTypography>
                        {account?.posts && account.posts.length ? (
                            <Gallery posts={account.posts} account={account} />
                        ) : (
                            <MDBTypography tag="p">No posts</MDBTypography>
                        )}
                    </div>
                ) : (
                    <MDBTypography tag="p" className="text-muted" style={{ marginTop: '20px' }}>
                        This user's account is private.
                        <br />
                        <FiLock />
                    </MDBTypography>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    </>
}