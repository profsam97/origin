import React from "react";
import {Card} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/system";
import EthCard from "@/Component/utils/EthCard";


interface IEtheruemBal {
    amount: number
}
const BalanceCard : React.FC<IEtheruemBal> = ({amount}) => {
        return (
                    <Card sx={{bgcolor: '#162138', maxWidth: 350, my:2, borderRadius: '8px'}}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            mx:2,
                            my:2
                        }}>
                            <Typography sx={{color: '#f2f6fa'}} gutterBottom variant={'body1'}>
                                Overview
                            </Typography>
                            <EthCard title={'ETH BALANCE'} dollar={false} amount={ amount} />
                            <EthCard title={'ETH VALUE'} dollar={true} amount={ amount} />
                            <EthCard title={'TOKEN HOLDINGS'} dollar={true} amount={ 444434.23232} />
                        </Box>
                    </Card>
        )
}
export default BalanceCard;