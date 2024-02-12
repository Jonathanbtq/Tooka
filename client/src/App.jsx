import UserList from './components/accueil/UserList'
import Login from './components/login/Login'

function App() {
  const {account} = useAuth()
  
  return (
    <>
      <Login />
      <UserList />
    </>
  )
}

export default App
