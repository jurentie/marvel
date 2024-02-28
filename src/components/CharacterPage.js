import './CharacterPage.css'

import React,  {useState, useEffect} from 'react'
import { motion } from 'framer-motion'

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
                            <motion.img 
                                initial={{scale:0, opacity: 0}}
                                animate={{scale:1, opacity: 1}}
                                transition={{duration: 1}}
                                src={character.thumbnail.path + "." +character.thumbnail.extension} alt={"character-image-"+characterId} 
                                id="character-image"
                            />
                            <div className="overview">
                                <motion.h1
                                    initial={{y: 50, opacity: 0}}
                                    animate={{y:0, opacity: 1}}
                                    transition={{duration: 1}}
                                >{character.name}</motion.h1>
                                <motion.div
                                    initial={{opacity:0}}
                                    animate={{opacity:1}}
                                    transition={{duration:1.5}}
                                >
                                    <p>{character.description}</p>
                                    <p><span className="sub-heading">Comics:</span> {listStrings(character.comics.items)}</p> 
                                    <p><span className="sub-heading">Series:</span>{listStrings(character.series.items)}</p>
                                    <p><span className="sub-heading">Stories:</span> {listStrings(character.stories.items)}</p>
                                </motion.div>
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