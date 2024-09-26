import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { handleLogOut, handleverify } from "../../lib/api"
import { IWideUser } from "../../lib/types"
import { CustomNavLink } from "../../lib/CutomNavLink"

export const Profile = () => {
    const navigate = useNavigate()
    const [account,setAccount] = useState<IWideUser|null>(null)
    useEffect(() => {
        handleverify()
            .then(res => {
                if(!res.user) {
                    navigate('/login')
                }else {
                    setAccount(res.user)
                }
            })
    },[])

    const logout = () => {
        handleLogOut()
        .then(res => {
            navigate('/login')
        })
    }

    return account && <>
        <nav>
            <CustomNavLink to='/profile'>Profile</CustomNavLink>
            <CustomNavLink to='/profile/settings'>Settings</CustomNavLink>
            <CustomNavLink to='/profile/search'>Search</CustomNavLink>
            <CustomNavLink to='/profile/posts'>Posts</CustomNavLink>
            <CustomNavLink to='/profile/followers'>Followers</CustomNavLink>
            <CustomNavLink to='/profile/followings'>Followings</CustomNavLink>
            <button onClick={logout}>Logout</button>
        </nav>

        <Outlet 
            context={{account, setAccount}}
        />
    </>
}