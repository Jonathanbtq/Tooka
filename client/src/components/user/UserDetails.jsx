import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDetails = ({ user }) => {
    const {id} = useParams()
    const [userProfile, setUserProfile] = useState('')

    const fetchUser = () => {
        fetch('http://localhost:3500/user/'+id, {
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
            console.log(response)
            return response.json()
        })
        .then(data => {
            if (data == null) {
                data = 'null'
            }
            console.log(data);
            setUserProfile(data)
        })
        .catch((err) => {
            console.error(err)
        })  
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (!userProfile) {
        return null; // Si user est null ou undefined, retourne null pour ne rien afficher
    }
    
    return (
        <div className="user-details">
          <h2>Détails de l'utilisateur</h2>
          <p>Prénom: {userProfile.firstname}</p>
          <p>Nom: {userProfile.lastname}</p>
          <p>Email: {userProfile.email}</p>
          {/* Ajoutez d'autres détails de l'utilisateur au besoin */}
        </div>
    );
}

export default UserDetails