import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBTypography } from "mdb-react-ui-kit"
import { IAccount, IPost } from "../lib/types"
import { BASE_URL } from "../lib/constant"

interface IProps {
    posts:IPost[]
    account?:IAccount
}

export const Gallery:React.FC<IProps> = ({posts,account}) => {


    return posts && <>
            {
                account ?
                <MDBCardText className="mb-2">{account?.name[0].toUpperCase() + account?.name.slice(1)} have {posts.length} posts</MDBCardText>
                : <MDBCardText>you have {posts.length} posts</MDBCardText>
            } 
        <div className="posts-container">
            {posts.map(post => (
                <MDBCard key={post.id} className="post-card">
                <MDBCardBody>
                    <MDBTypography tag="h5">{post.title}</MDBTypography>
                    {post.picture && (
                        <MDBCardImage 
                            src={`${BASE_URL}${post.picture}`} 
                            alt="Post image" 
                            className="post-image mb-2" 
                        />
                    )}
                    <MDBCardText>
                        <strong>{'likes'}</strong> Likes
                    </MDBCardText>
                    <MDBCardText>
                        <strong>{'comments length'}</strong> Comments
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            ))}
        </div>
    </>
}