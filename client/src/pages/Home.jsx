import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Login from '../components/login/LoginForm'
import UserList from '../components/accueil/UserList'
import Nav from '../components/nav/Nav'

import '../assets/css/nav.css'
import '../assets/css/UserList.css'
import '../assets/css/PublicationHome.css'
import PublicationForm from '../components/accueil/publications/PublicationForm';
import PublicationHome from '../components/accueil/publications/PublicationHome';

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
            {cookieUser &&
                <PublicationForm userCookie={cookieUser}/>
            }
            {cookieUser &&
                <UserList userCookie={cookieUser}/>
            }
            <PublicationHome />
        </>
    )
}

export default Home