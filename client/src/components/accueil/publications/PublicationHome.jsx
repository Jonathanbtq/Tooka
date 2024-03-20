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
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur dans la recherche de publications');
                }
            })
            .then(publications => {
                setPublications(publications)
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
                <div className="idx_public_ctn">
                    {publications.map((publi) => {
                        return (
                            <div className="publi_idx_card" key={publi.id}>
                                <p>Texte : {publi.text}</p>
                                <p>Author : {publi.fk_author}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}