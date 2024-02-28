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

    function listStrings(list) {
        if (list.length <= 1) {
          return list[0].name + ".";
        }
        return list.slice(0, -1).map(item => {return item.name}).join(",") + " and " + list.at(-1).name + ".";
      }

    return (
        <>
            <div className="CharacterPage">
                {!isLoading && (
                    <>
                        <div className="heading">
                            <img src={character.thumbnail.path + "." +character.thumbnail.extension} alt={"character-image-"+characterId} id="character-image"/>
                            <div className="overview">
                                <p>{character.name}</p>
                                <p>{character.description}</p>
                                <p>Comics: {listStrings(character.comics.items)}</p> 
                                <p>Series: {listStrings(character.series.items)}</p>
                                <p>Stories: {listStrings(character.stories.items)}</p>
                            </div>
                        </div>
                        <button id="back-button" onClick={handleBackButton}>Back</button>
                    </>
                )}
                
            </div>
        </>
    )
}

export default CharacterPage