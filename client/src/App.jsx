import { useEffect, useState } from 'react';
import UserList from './components/accueil/UserList'
import Login from './components/login/Login'
import Cookies from 'universal-cookie';

function App() {
  const [cookieUser, setCookieUser] = useState('')

  useEffect(() => {
    let cookies = new Cookies('', { path: '/' })
    let userSess = cookies.get('user')
    setCookieUser(userSess)
  }, [])
  return (
    <>
      <Login />
      <UserList userCookie={cookieUser}/>
    </>
  )
}

export default App
