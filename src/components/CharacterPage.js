import './CharacterPage.css'

import React,  {useState, useEffect} from 'react'

import http from '../api/httpClient'

function CharacterPage ({characterId, updateCharacterId}) {
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

    return (
        <>
            <div className="CharacterPage">
                {!isLoading && (
                    <>
                        <img src={character.thumbnail.path + "." +character.thumbnail.extension} alt={"character-image-"+characterId} id="character-image"/>
                        <p>{character.name}</p>
                        <button id="back-button" onClick={() => updateCharacterId(0)}>Back</button>
                    </>
                )}
                
            </div>
        </>
    )
}

export default CharacterPage