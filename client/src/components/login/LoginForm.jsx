import { useState } from "react"
import Cookies from 'universal-cookie';

export default function Login(){
    const [message, setMessage] = useState('')
    const [credentials, setCredentials] = useState({
        login: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const loginData = {
            email: credentials.login,
            password: credentials.password
        };

        fetch('http://localhost:3500/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
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
                // data contient l'objet JSON renvoyé par le serveur
                const user = data.user;
                const cookies = new Cookies();
                cookies.set('user', user, { path: '/' });
                setMessage('Connexion réussi')
            })
            .catch((error) => {
            console.error('Une erreur est survenue lors de la requête de connexion', error)
            })
    }

    return (
        <>
            <form action="POST" onSubmit={handleSubmit}>
                <input type="text" name="login" value={credentials.login} onChange={handleChange} />
                <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                <input type="submit" value="Connexion" />
            </form>
            {message &&
                <p>{message}</p>
            }
        </>
    )
}