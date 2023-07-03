import React, {useContext} from "react";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/system";
import {round} from "@/helpers/utils";
import ContextApi from "@/Store/ContextApi";

interface IETHCARD {
    title: string,
    amount: number,
    dollar: boolean
}
const EthCard : React.FC<IETHCARD> = ({dollar, amount, title}) => {
    const rate = useContext(ContextApi).rate
        return (
            <Stack sx={{my:0.5}}>
                <Typography sx={{color: '#93a3b8'}} variant={'caption'}>
                    {title}
                </Typography>
                <Typography variant={'body1'} sx={{color: '#f2f6fa'}} >
                    {dollar ? '$' : ''} {dollar ? round(amount * rate) :  round(amount)} {dollar ? '' : 'ETH'}
                </Typography>
            </Stack>
        )
}

export default EthCard;