import { useEffect, useState } from "react"

export default function UserList () {
    const [user, setUser] = useState([])

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
                return response.json
            })
            .then((response) => {
                console.log(response)
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
            <h1>Liste des utilisateurs</h1>
            <p>{user.map((user) => {
                user.username
            })}</p>
        </>
    )
}