import { useOutletContext } from "react-router-dom"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { IoCloudUploadOutline } from "react-icons/io5";

import { IContextType } from "../../../lib/types"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant";
import { useRef } from "react";
import { handleCoverUpload, handlePictureUpload } from "../../../lib/api";

export function Dashboard() {
  const {account,setAccount} = useOutletContext<IContextType>()
  const photo = useRef<HTMLInputElement | null>(null)
  const cover = useRef<HTMLInputElement | null>(null)
  
  const handlePic = () => {
    if(photo.current) {
      const file = photo.current.files?.[0]
      if(file) {
        const form = new FormData()
        form.append('picture',file)

        handlePictureUpload(form)
        .then(res => {
          setAccount({...account, picture:res.payload as string})
        })
      }
    }
  }

  const hadnleCover = () => {
    if(cover.current) {
      const file = cover.current.files?.[0]
      if(file) {
        const form = new FormData()
        form.append('cover',file)

        handleCoverUpload(form)
        .then(res => {
          setAccount({...account,cover:res.payload as string})
        })
      }
    }
  }

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row cover" 
                style={{
                  backgroundColor: !account.cover ? "#000" : "", 
                  backgroundImage: account.cover ?
                  `url(${BASE_URL}${account.cover})`
                  : "none",
                  height: '200px',
                  position:"relative"
                }}>
                <IoCloudUploadOutline
                  className="icon"
                  onClick={() => cover.current?.click()} 
                />
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <input 
                    type="file"
                    ref={photo}
                    onChange={handlePic}
                    style={{
                      display:"none"
                    }}
                  />
                  <input 
                    type="file" 
                    ref={cover}
                    onChange={hadnleCover}
                    style={{
                      display:"none"
                    }}
                  />
                  <MDBCardImage 
                    src={!account.picture ? DEFAULT_PIC : `${BASE_URL}${account.picture}`}
                    alt="Generic placeholder image" 
                    className="mt-4 mb-2 img-thumbnail photo" 
                    fluid 
                    style={{ width: '150px', zIndex: '1' }}
                    onClick={(e) => {
                      if(e.target == e.currentTarget) {
                        photo.current?.click()
                      }
                    }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{account.name} {account.surname}</MDBTypography>
                  <MDBCardText>New York</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{account.followers.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{account.following.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}