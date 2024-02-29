import { useState } from "react"
import Cookies from "universal-cookie"

export default function PublicationForm({ userCookie }) {
    const [publicationText, setPublicationText] = useState('')
    const [message, setMessage] = useState('')

    const handleChangeText = (event) => {
        setPublicationText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setPublicationText('');

        const newPublicationText = {
            text: publicationText,
            author: userCookie.id
        }

        fetch('http://localhost:3500/publicationcreate', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPublicationText)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setMessage('Identifiants invalides')
                    throw new Error('Identifiants invalides');
                }
            })
            .then(data => {
                setMessage('Publication réussi')
            })
            .catch(err => {
                console.error('Une erreur est survenue' + err)
            })
    }  

    return (
        <>
            { message && 
                <p>{message}</p>
            }
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input
                        type="text"
                        name="text"
                        placeholder="Quoi de neuf ?!"
                        onChange={handleChangeText}
                        value={publicationText}
                    />
                    <input type="submit" value="Publier" />
                </div>
            </form>
        </>
    )
}