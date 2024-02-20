import './List.css'

import React, { useEffect } from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'

import styled from 'styled-components'

import http from '../../api/httpClient'

const StyledCard = styled(Card)
`
    width:25%;
    margin:10px;
`

function List () {

    console.log(http.get("characters"))

    return(
        <div className="List">
            <StyledCard>
                <CardMedia 
                    component="img"
                    wide
                    image="https://i.pinimg.com/originals/76/46/a9/7646a94792eeb2b072335e16dd7c9f11.png"
                    height={100}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Spiderman
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    His name is Spiderman
                    </Typography>
                </CardContent>
            </StyledCard>

            <StyledCard>
                <CardMedia 
                    component="img"
                    wide
                    image="https://i.pinimg.com/originals/76/46/a9/7646a94792eeb2b072335e16dd7c9f11.png"
                    height={100}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Spiderman
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    His name is Spiderman
                    </Typography>
                </CardContent>
            </StyledCard>

            <StyledCard>
                <CardMedia 
                    component="img"
                    wide
                    image="https://i.pinimg.com/originals/76/46/a9/7646a94792eeb2b072335e16dd7c9f11.png"
                    height={100}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Spiderman
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    His name is Spiderman
                    </Typography>
                </CardContent>
            </StyledCard>

            <StyledCard>
                <CardMedia 
                    component="img"
                    wide
                    image="https://i.pinimg.com/originals/76/46/a9/7646a94792eeb2b072335e16dd7c9f11.png"
                    height={100}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Spiderman
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    His name is Spiderman
                    </Typography>
                </CardContent>
            </StyledCard>

            <StyledCard>
                <CardMedia 
                    component="img"
                    wide
                    image="https://i.pinimg.com/originals/76/46/a9/7646a94792eeb2b072335e16dd7c9f11.png"
                    height={100}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Spiderman
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    His name is Spiderman
                    </Typography>
                </CardContent>
            </StyledCard>

            <StyledCard>
                <CardMedia 
                    component="img"
                    wide
                    image="https://i.pinimg.com/originals/76/46/a9/7646a94792eeb2b072335e16dd7c9f11.png"
                    height={100}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Spiderman
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    His name is Spiderman
                    </Typography>
                </CardContent>
            </StyledCard>
        </div>
    )
}

export default List