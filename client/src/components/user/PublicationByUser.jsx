import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PublicationForm from "../accueil/publications/PublicationForm";

const PublicationByUser = ({ user }) => {
    const [publicationUser, setPublicationUser] = useState([]);

    const handleFetchPublication = () => {
        fetch('', {
            method: 'GET',
            cors: 'cors',
            body: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
                return response.json()
            })
            .then(data => {
                setPublicationUser(data)
            })
            .catch(err => {
                console.error('Une erreur est survenue', err);
            })
    }

    useEffect(() => {
        // handleFetchPublication();
    }, [])
    
    return (
        <>
            {publicationUser &&  publicationUser.length > 0 ? (
                publicationUser.map((publi) => (
                    <div className="user_publ_card" key={publi.id}>
                        <p>Aucune publication</p>
                    </div>
                ))
            ) : (
                <div className="user_publ_card">
                    <p>Aucune publication</p>
                </div>
            )}
        </>
    )
}

export default PublicationByUser;