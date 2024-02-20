import './SuperheroGrid.css'

import React, { useEffect, useState } from 'react'
import { Card, CardMedia, CardContent, Typography, Pagination } from '@mui/material'
import { motion, useCycle } from 'framer-motion'

import styled from 'styled-components'

import http from '../../api/httpClient'

const StyledCard = styled(Card)
`
    width:11%;
    height:175px;
    margin:10px;
`

const StyledPagination = styled(Pagination)
`
    margin-bottom: 50px;

    & .MuiPaginationItem-root {
        color: white !important;
    }
`

function SuperheroGrid () {
    const [characters, setCharacters] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [pages, setPages] = useState(0)
    const [offset, setOffset] = useState(0)

    const limit = 24

    const [animate, cycle] = useCycle(
        {opacity: 1, x: 0, transition:{duration:1}},
        {opacity: 0, x: -100, transition:{duration:.5}},
        {opacity: 0, x: 100}, 
        {opacity: 0, x: 500},
    )

    useEffect(() => {
        (async () => {
            await http.get("characters", offset, limit).then( result => {
                setCharacters(result)
                setIsLoading(false)
                setPages(Math.ceil(result.data.total / limit))
            })
        })()
    }, [offset])

    const handleChange = (event, page) => {
        setOffset((page - 1) * limit)
        cycle()
        setTimeout(() => {
            cycle()
        }, 1000)
        setTimeout(() => {
            cycle()
        }, 1050)
        setTimeout(() => {
            cycle()
        }, 1100)
    }

    return(
        <>
            <motion.div 
                initial={{opacity:0, x: 100}}
                animate={animate}
                className="SuperheroGrid"
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
                                height={120}
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
            <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay: 1, duration: 1}}
            >
                <StyledPagination 
                    count={pages} 
                    color="secondary" 
                    showFirstButton 
                    showLastButton 
                    onChange={handleChange}
                />
            </motion.div>
        </>
    )
}

export default SuperheroGrid