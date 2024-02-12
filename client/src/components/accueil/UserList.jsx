import { useEffect, useState } from "react"
import UserForm from "./UserForm"
import Cookies from 'universal-cookie';

/**
 * @param userCookie Le cookie contenant les données de l'utilisateur.
 * @returns La liste des utilisateurs sous forme de composant React.
 */
export default function UserList ({ userCookie }) {
    const [user, setUser] = useState([])
    const [msg, setAccueil] = useState('Salut')

    const handleAccueil = async () => {
        const response = await window.fetch('http://localhost:3500/accueil')
        const json = await response.json()
        const msg = json.msg

        setAccueil(msg)
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
            <h2>Bonjour {userCookie.username}</h2>
            <h1 onClick={handleAccueil}>Liste des utilisateurs</h1>
            <p>{msg}</p>
            {user.map((user) => (
                <div key={user.id} className="">
                    <p>{user.firstname}</p>
                    <p>{user.lastname}</p>
                    <p>{user.email}</p>
                </div>
            ))}
            <UserForm setUser={setUser} />
        </>
    )
}