import './SuperheroGrid.css'

import React, { useEffect, useState } from 'react'
import { Card, CardMedia, CardContent, Typography, TextField, Pagination } from '@mui/material'
import { motion, useCycle, useAnimate } from 'framer-motion'

import styled from 'styled-components'

import http from '../api/httpClient'
import useWindowDimensions from './utility/UseWindowDimensions'

const StyledCard = styled(Card)
`
    height:175px;
    margin:10px;
`

const StyledPagination = styled(Pagination)
`
    margin-bottom: 50px;
    position:relative;
    & .MuiPaginationItem-root {
        color: white !important;
    }
`

const WhiteBorderTextField = styled(TextField)`
  & label {
    color: white;
  }
  & input {
    color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white;
    }
  }
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: white;
    }
  }
  width: 300px;
  margin-bottom:10px !important;
`;

function SuperheroGrid ({updateCharacterId, activePage, setActivePage, characterSearch, setCharacterSearch, exitOrEnterSearch, setExitOrEnterSearch}) {
    const limit = 24

    const {width} = useWindowDimensions()

    const [characters, setCharacters] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [offset, setOffset] = useState((activePage - 1) * limit)
    const [pages, setPages] = useState(0)
    const [pageIncOrDec, setPageIncOrDec] = useState(false)

    const [scope, animateBlock] = useAnimate();

    const [animate, cycle] = useCycle(
        {opacity: 1, x: 0, transition:{duration:1}},
        {opacity: 0, x: -10, transition:{duration:.5}},
        {opacity: 0, x: 10}, 
        {opacity: 0, x: 10},
    )

    useEffect(() => {
        (async () => {
            if(characterSearch === ""){
                await http.getCharacters(offset, limit).then( result => {
                    setCharacters(result)
                    setIsLoading(false)
                    setPages(Math.ceil(result.data.total / limit))
                        setTimeout(() => {
                            cycle()
                        }, 1050)
                        setTimeout(() => {
                            cycle()
                        }, 1100)
                })
            }else{
                await http.searchCharacters(characterSearch, offset, limit).then(result => {
                    setCharacters(result)
                    setIsLoading(false)
                    setPages(Math.ceil(result.data.total / limit))
                    if(exitOrEnterSearch || pageIncOrDec){
                        setTimeout(() => {
                            cycle()
                        }, 1050)
                        setTimeout(() => {
                            cycle()
                        }, 1100)
                    }
                })
            }
        })()
    // eslint-disable-next-line
    }, [offset, characterSearch])

    useEffect(() => {
        setPageIncOrDec(true)
        setOffset((activePage - 1) * limit)
        cycle()
        setTimeout(() => {
            cycle()
        }, 1000)
    // eslint-disable-next-line
    }, [activePage])

    const handleChange = (event, page) => {
        setActivePage(page)
    }

    const handleAnimate = async (i) => {
        const resize = width < 750 ? 1.2 : 1.75
        animateBlock("#styled-card-" + i, {scale: resize})
        document.getElementById("card-media-" + i).height = 50
        document.getElementById("name-" + i).style.fontSize = "9px"
        document.getElementById("description-" + i).style.display = "block"
        document.getElementById("read-more-button-" + i).style.display = "flex"
    }

    const handleHoverEnd = (i) => {
        document.getElementById("card-media-" + i).height = 120
        document.getElementById("name-" + i).style.fontSize = "16px"
        document.getElementById("description-" + i).style.display = "none"
        document.getElementById("read-more-button-" + i).style.display = "none"
    }

    const truncate = (str) =>{
        const characters = width < 750 ? 100 : 200
        return (str.length > characters) ? str.slice(0, characters-1) + '...' : str;
    }

    const handleSearch = (event) => {
        setPageIncOrDec(false)
        setCharacterSearch(event.target.value)
        setOffset((activePage - 1) * limit)
        setActivePage(1)
        if(enterOrExitSearch(event.target.value)){
            cycle()
            setTimeout(() => {
                cycle()
            }, 1000)
        }
    }

    const enterOrExitSearch = (search) => {
        if(characterSearch !== "" && search === ""){
            setExitOrEnterSearch(true)
            return true
        }
        else if(characterSearch === "" && search !== ""){
            setExitOrEnterSearch(true)
            return true
        }
        else{
            setExitOrEnterSearch(false)
            return false
        }
    }

    return(
        <>
            <WhiteBorderTextField 
                id="outlined-basic" 
                label="Search" 
                value={characterSearch}
                variant="outlined" 
                onChange={handleSearch}
            />
            <motion.div 
                initial={{opacity:0, x: 10}}
                animate={animate}
                className="SuperheroGrid"
                ref={scope}
            >
                {!isLoading && characters.data.results.map((character, i) => {
                    return (
                        <StyledCard
                            id={"styled-card-" + i}
                            component={motion.div}
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.3 }
                            }}
                            onTap={() => handleAnimate(i)}
                            onHoverEnd={()=> handleHoverEnd(i)}
                            sx={width < 750 ? {width: 150} : {width: 190}}
                        >
                            <CardMedia 
                                id={"card-media-" + i}
                                component="img"
                                wide
                                image={character.thumbnail.path + "." + character.thumbnail.extension }
                                height={120}
                            />
                            <CardContent>
                                <Typography id={"name-" + i}   gutterBottom variant="p" component="p">
                                {character.name}
                                </Typography>
                                <div>
                                    <p id={"description-" + i} className="description" >
                                        {(character.description === "") ? "This character was not provided a description from the marvel API." : truncate(character.description)}
                                    </p>
                                </div>
                                <button 
                                    id={"read-more-button-" + i} 
                                    className="read-more-button"
                                    onClick={() => {updateCharacterId(character.id)}}
                                >
                                    Read More
                                </button>
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
                    page={activePage}
                    color="secondary" 
                    showFirstButton 
                    showLastButton 
                    onChange={handleChange}
                    size={width < 750 ? "small" : "medium"}
                />
            </motion.div>
        </>
    )
}

export default SuperheroGrid