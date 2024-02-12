import { useState } from "react"

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

        console.log(loginData)

        fetch('http://localhost:3500/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then((response) => {
                if (response.ok) {
                    setMessage('Connexion réussi')
                } else {
                    setMessage('Identifiants invalides')
                    throw new Error('Identifiants invalides');
                }
            }).catch((error) => {
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