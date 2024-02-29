import { useEffect, useState } from "react"
import UserForm from "./UserForm"
import Cookies from 'universal-cookie';
import UserDetails from "../user/UserDetails";
import { Link } from "react-router-dom";

/**
 * @param userCookie Le cookie contenant les données de l'utilisateur.
 * @returns La liste des utilisateurs sous forme de composant React.
 */
export default function UserList ({ userCookie }) {
    const [user, setUser] = useState([])
    const [msg, setAccueil] = useState('Salut')
    const [isVisibleUser, setIsVisibleUser] = useState(false)
    const [userDetails, setUserDetails] = useState('')

    const handleAccueil = async () => {
        const response = await window.fetch('http://localhost:3500/accueil')
        const json = await response.json()
        const msg = json.msg

        setAccueil(msg)
    }

    const handleUserClick = (userInfo) => {
        setIsVisibleUser(!isVisibleUser);
        setUserDetails(userInfo)
    }

    const fetchUser = () => {
        fetch('http://localhost:3500/utilisateurs', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête')
                }
                return response.json()
            })
            .then((response) => {
                if (response == null) {
                    response = 'null'
                }
                setUser(response)
                console.log(response)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <div className="userlist_ctn">
                <h2>Bonjour {userCookie.username}</h2>
                <h1 onClick={handleAccueil}>Liste des utilisateurs</h1>
                <p>{msg}</p>
                <div className="userlist_map">
                    {user.map((user) => (
                        <div key={user.id} className={`userlst_card ${user.email === userCookie.email ? 'selectedUser' : ''}`} onClick={() => handleUserClick(user)}>
                            <div className="">
                                <p><Link to={"/profile/" + user.id}>{user.firstname}</Link></p>
                                <p>{user.lastname}</p>
                            </div>
                            <p>@ {user.email}</p>
                        </div>
                    ))}
                </div>
                {isVisibleUser && (
                    <UserDetails user={userDetails}/>
                )}
                <UserForm setUser={setUser} />
            </div>
            
        </>
    )
}