import { useEffect, useRef, useState } from "react"
import { handleGetPosts, handlePostCreation } from "../../../lib/api"
import { IPost } from "../../../lib/types"
import {  MDBCard, MDBCardBody,  MDBCol, MDBContainer, MDBInput, MDBRow, } from "mdb-react-ui-kit"
import { Gallery } from "../../../components/Gallery"

export const Posts = () => {
    const [list, setList] = useState<IPost[]>([])
    const [text,setText] = useState<string>("")
    const photo = useRef<HTMLInputElement | null>(null)
    
    const handleUpload = () => {
        if(photo.current) {
            const file = photo.current.files?.[0]
            if(file) {
                const form = new FormData()
                form.append('photo',file)
                form.append('content',text)

                handlePostCreation(form)
                .then(res => {
                  console.log(res);
                  setList([...list, res.payload as IPost])
                })
            }
        }
    }
    
    useEffect(() => {

        handleGetPosts()
        .then(res => {
            console.log(res.payload);
            setList(res.payload as IPost[])
        })


    },[])

    return list && <>
        <div className="gradient-custom-2">
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody className="text-black p-4">

                                <div className="mb-4">
                                    <MDBInput 
                                        type="text" 
                                        placeholder="what's on your maind?" 
                                        id="post-title" 
                                        className="mb-3"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                    <MDBInput 
                                        type="file" 
                                        id="post-image"
                                        ref={photo}
                                        onChange={handleUpload}
                                        style={{
                                            display: "none"
                                        }} 
                                    />
                                    <button 
                                        onClick={() => photo.current?.click()}
                                        className="btn btn-s btn-info my-2"
                                    >
                                        Add Post
                                    </button>
                                </div>

                                <Gallery posts={list} />

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    </>
}