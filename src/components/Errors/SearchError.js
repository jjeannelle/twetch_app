import React from 'react'

export default function SearchError(props) {

    return (
        <div className="PageContainer">
            <div className="PageHeading">
                <h1 className="PageHeading-title">Résultats de recherche : <br></br> pas de résultats pour "<strong>{props.result}</strong>"</h1>
                <p className="PageHeading-text">Vérifiez l'orthographe de votre saisie, ou ce streamer n'existe pas.</p>
            </div>
        </div>
    )
}
