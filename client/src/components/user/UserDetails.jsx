import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PublicationForm from "../accueil/publications/PublicationForm";
import PublicationByUser from "./PublicationByUser";

const UserDetails = ({ user }) => {
    const [userProfile, setUserProfile] = useState('')

    if (useParams() != null) {
        const {id} = useParams()

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
                return response.json()
            })
            .then(data => {
                if (data == null) {
                    data = 'null'
                }
                setUserProfile(data)
            })
            .catch((err) => {
                console.error(err)
            })  
        }

        useEffect(() => {
            fetchUser()
        }, [])
    } else {
        setUserProfile(user)
    }


    if (!userProfile) {
        return null; // Si user est null ou undefined, retourne null pour ne rien afficher
    }
    
    return (
        <div className="user-details">
            <div className="user_prof_leftside">
                {userProfile.username && (
                    <h2>{userProfile.username}</h2>
                )}
                {userProfile.description && (
                    <p>{userProfile.description}</p>
                )}
            <p>{userProfile.firstname + ' ' + userProfile.lastname}</p>
            </div>
            <div className="user_prof_rgtside">
                <div className="user_prof_rgt_head">
                    {PublicationForm}
                    <div className="usr_prf_rgt_ctn">
                        {PublicationByUser}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails