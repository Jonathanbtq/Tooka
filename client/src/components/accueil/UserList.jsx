import { useEffect, useState } from "react"
import UserForm from "./UserForm"

export default function UserList () {
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
                console.log(user)
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
            <h1 onClick={handleAccueil}>Liste des utilisateurs</h1>
            <p>{msg}</p>
            <UserForm />
        </>
    )
}