import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Login from '../components/login/LoginForm'
import UserList from '../components/accueil/UserList'
import Nav from '../components/nav/Nav'

import '../assets/css/nav.css'

function Home() {
    const [cookieUser, setCookieUser] = useState('')

    useEffect(() => {
      let cookies = new Cookies('', { path: '/' })
      let userSess = cookies.get('user')
      setCookieUser(userSess)
    }, [])

    return (
        <>
            <Nav />
            <Login />
            <UserList userCookie={cookieUser}/>
        </>
    )
}

export default Home