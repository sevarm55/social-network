import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardText,  MDBInput, } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"

import { IUser, IWideUser } from "../../lib/types"
import { handleSearch } from "../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../lib/constant"
import { Link } from "react-router-dom"
import { FiLock, FiUnlock } from "react-icons/fi"

export const Search = () => {

    const [users,setUsers] = useState<IUser[]>([])
    const [text, setText] = useState<string>("")

    useEffect(() => {
        if(!text.trim()) {
            setUsers([])
        }else {
            handleSearch(text)
            .then(res => {
                setUsers(res.payload as IUser[])
            })
        }
    },[text])

    
    return <div className="search-container" style={{ padding: '20px' }}>
        <h3>Search</h3>
        <MDBInput
            placeholder="search for a friends..."
            type="text"
            className="search-input"
            style={{ width: '100%' }} 
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        

        <div className="search-results"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '20px'
                }}
            >
                {users.map(user => (
                    <MDBCard key={user.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', maxWidth: '100%' }}>
                        <MDBCardImage 
                            src={!user.picture ? DEFAULT_PIC : `${BASE_URL}${user.picture}`} 
                            alt="User Avatar" 
                            style={{ height: '80px', width: '80px', objectFit: 'cover', borderRadius: '50%' }} 
                        />
                        <MDBCardBody style={{ paddingLeft: '15px' }}>
                            <span>{user.isPrivate ? <FiLock /> : <FiUnlock /> }</span>
                            <MDBCardText style={{ margin: '0', fontWeight: 'bold' }}>{user.name}</MDBCardText>
                            <MDBCardText style={{ margin: '0', fontSize: '12px', color: '#888' }}>{user.surname}</MDBCardText>
                            <Link to={"/profile/" + user.id}>Account</Link>
                        </MDBCardBody>
                    </MDBCard>
                ))}
            </div>
        
        {users.length > 0 && <small>{users.length} users found !</small>}
    </div>
}