import { useState } from "react"

export default function UserForm(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        birth_day: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({ ...formData, [name]: value})
    }

    const handleClickUserCreate = (event) => {
        event.preventDefault()

        fetch('http://localhost:3500/addutilisateurs', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: formData})
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

    return (
        <>
            <h2>Création d'un utilisateur</h2>
            <form onSubmit={handleClickUserCreate}>
                <div className="">
                    <label htmlFor="">email*</label>
                    <input
                    type="text"
                    name="email"
                    placeholder="Adresse Email"
                    value={formData.email} 
                    onChange={handleChange} 
                    /> 
                </div>
                <div className="">
                    <label htmlFor="">password*</label>
                    <input
                    type="password"
                    name="password"
                    placeholder="Mot De Passe"
                    value={formData.password} 
                    onChange={handleChange} /> 
                </div>
                <div className="">
                    <label htmlFor="">Username</label>
                    <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={formData.username} 
                    onChange={handleChange} /> 
                </div>
                <div className="">
                    <label htmlFor="">firstname*</label>
                    <input
                    type="text"
                    name="firstname"
                    placeholder="Prénom"
                    value={formData.firstname} 
                    onChange={handleChange} /> 
                </div>
                <div className="">
                    <label htmlFor="">lastname*</label>
                    <input
                    type="text"
                    name="lastname"
                    placeholder="Nom de famille"
                    value={formData.lastname} 
                    onChange={handleChange} />
                </div>
                <div className="">
                    <label htmlFor="">birth_day</label>
                    <input
                    type="text"
                    name="birth_day"
                    placeholder="Date de naissance"
                    value={formData.birth_day} 
                    onChange={handleChange} />
                </div>
                <input type="submit" value="Créer l'utilisateur" />
            </form>
        </>
    )
}