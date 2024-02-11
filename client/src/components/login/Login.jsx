import { useState } from "react"

export default function Login(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        const loginData = {
            email: login,
            password: password
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
                <input type="text" name="login" value={login} onChange={e => setLogin(e.target.value)} />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Connexion" />
            </form>
            {message &&
                <p>{message}</p>
            }
        </>
    )
}