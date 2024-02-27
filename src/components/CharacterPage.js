import './CharacterPage.css'

import React,  {useState, useEffect} from 'react'

import http from '../api/httpClient'

function CharacterPage ({characterId, updateCharacterId, setExitOrEnterSearch}) {
    const [character, setCharacter] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await http.getCharacter(characterId).then( result => {
                setCharacter(result)
                setIsLoading(false)
            })
        })()
    }, [characterId])

    const handleBackButton = () => {
        updateCharacterId(0)
        setExitOrEnterSearch(true)
    }

    return (
        <>
            <div className="CharacterPage">
                {!isLoading && (
                    <>
                        <img src={character.thumbnail.path + "." +character.thumbnail.extension} alt={"character-image-"+characterId} id="character-image"/>
                        <p>{character.name}</p>
                        <button id="back-button" onClick={handleBackButton}>Back</button>
                    </>
                )}
                
            </div>
        </>
    )
}

export default CharacterPage