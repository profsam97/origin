import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useMediaQuery} from "@mui/material";

const Hero : React.FC = () => {
    const isMobile : boolean = useMediaQuery('(max-width: 600px)')
    return <Container maxWidth={'lg'} component={'main'}>
                    <Box
                    sx={{
                        marginTop:3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyItems: 'center'
                    }}
                    >

                        <Typography variant={isMobile ? 'h4' : 'h2'}  textAlign={'center'}>
                            Ethereum transactions   crawler
                        </Typography>

                        <Box className={'heroImage'}>
                            <img  src={'assets/img/ethereumLogo.png'}/>
                        </Box>
                    </Box>
            </Container>
}
export default Hero;