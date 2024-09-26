import React from "react"
import { Link, useLocation } from "react-router-dom"

interface IProps {
    children:string
    to: string
}

export const CustomNavLink:React.FC<IProps> = ({children='newLink',to}) => {
    
    const location = useLocation()
    return <>
        <Link className={location.pathname == to ? "customActive" : ""} to={to}>{children}</Link>
    </>
}