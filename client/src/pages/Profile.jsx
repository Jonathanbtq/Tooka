import UserDetails from "../components/user/UserDetails"
import { useState, useEffect } from "react"
import Cookies from 'universal-cookie';
import Nav from '../components/nav/Nav'

export default function Profile(){
    const [cookieUser, setCookieUser] = useState('')

    useEffect(() => {
      let cookies = new Cookies('', { path: '/' })
      let userSess = cookies.get('user')
      setCookieUser(userSess)
    }, [])

    return (
        <>
            <Nav />
            <h1>Profile Page</h1>
            <UserDetails user={cookieUser}/>
        </>
    )
}