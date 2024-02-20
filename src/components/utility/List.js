import './List.css'

import React, { useEffect, useState } from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { motion } from 'framer-motion'

import styled from 'styled-components'

import http from '../../api/httpClient'

const StyledCard = styled(Card)
`
    width:20%;
    height:250px;
    margin:10px;
`

function List () {
    const [characters, setCharacters] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            setCharacters(await http.get("characters"))
            setIsLoading(false)
        })()
    }, [])

    return(
        <motion.div 
            initial={{scale:0, x:1000, y: 1000}}
            animate={{scale: 1, x: 0, y: 0}}
            transition={{delay: 1, duration: 1}}
            className="List"
        >
            {!isLoading && characters.data.results.map((character, i) => {
                return (
                    <StyledCard
                        component={motion.div}

                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <CardMedia 
                            component="img"
                            wide
                            image={character.thumbnail.path + "." + character.thumbnail.extension }
                            height={190}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="p" component="p">
                            {character.name}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                )
            })}
        </motion.div>
    )
}

export default List