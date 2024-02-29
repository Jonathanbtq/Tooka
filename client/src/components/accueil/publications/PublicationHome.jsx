import { useEffect, useState } from "react";

export default function PublicationHome() {
    const [publications, setPublications] = useState([])

    const handlePublicationGet = () => {
        fetch('http://localhost:3500/publicationget', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur dans la recherche de publications');
                }
            })
            .then(publications => {
                setPublications(publications)
                console.log(publications)
            })
            .catch(err => {
                console.error('Une erreur est survenue' + err)
            })
    }

    useEffect(() => {
        handlePublicationGet()
    }, [])

    return (
        <>
            <div className="">
                <h3>Nouvelles publications</h3>
                {publications.map((publi) => {
                    <p>{publi.text}</p>,
                    <p>{publi.author}</p>
                })}
            </div>
        </>
    )
}