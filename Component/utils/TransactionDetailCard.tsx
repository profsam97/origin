import React, {useContext} from 'react';
import {Card, CardContent, CircularProgress, Typography, useMediaQuery} from '@mui/material';
import Container from "@mui/material/Container";
import {Stack, useTheme} from "@mui/system";
import Box from "@mui/material/Box";
import {IGetTransByHash, ITransaction} from "@/types/types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    calculateTransactionFee,
    convertWeiToEther, getGasPrice, getGasPriceToGwei,
    truncate
} from "@/helpers/utils";
import Button from "@mui/material/Button";
import Header from "@/Component/utils/Header";
import Nav from "@/Component/Layout/Nav";
import {ArrowBack} from "@mui/icons-material";
import {useRouter} from "next/router";
import ContextApi from "@/Store/ContextApi";
type Transaction = {
    data : IGetTransByHash,
    isLoading: boolean,
    isSuccess: boolean
}

const TransactionDetailsCard : React.FC<Transaction> = ({data, isSuccess, isLoading}) => {
    const {from,gas,gasPrice,maxFeePerGas,to,hash,blockNumber,value} = data;
    const theme = useTheme();
    const router = useRouter()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleUpdateUrl = () => {
        router.back()
    }
    return (
        <>
        <Nav/>
        <Container maxWidth={'lg'} component={'main'}>
           <Stack direction={'row'} my={2} spacing={2}>
               <ArrowBack onClick={handleUpdateUrl} sx={{cursor: 'pointer'}}/>
               <Typography variant={'body1'}>Go back</Typography>
           </Stack>
            {isLoading && <Typography textAlign={'center'} variant={'body1'}><CircularProgress/></Typography>}
            {isSuccess &&
            <Card sx={{bgcolor: '#111A2E', borderRadius: '10px', my:6 }}>
            <Box sx={{maxWidth: 800, display: 'flex', justifyContent: 'space-between'}}>
            <CardContent sx={{ mr: 2 }}>
                <Stack spacing={1.5} sx={{color: '#7e8ea2'}}>
                <Typography  variant="subtitle2">Transaction Hash:</Typography>
                    {isMobile &&   <Typography variant="body2">{truncate(hash, 40)}</Typography>}
                <Typography  variant="subtitle2">Status:</Typography>
                    {isMobile && blockNumber &&  <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="1px solid #00a186"
                            borderRadius="6px"
                            padding="4px"
                            maxWidth="80px"
                            maxHeight={'25px'}
                            fontWeight="bold"
                            color="#00a186"
                        >
                            <Stack direction={'row'} spacing={0.4}>
                                <CheckCircleIcon fontSize="small" htmlColor="#00a186"  sx={{fontSize: 14, mt:0.4}}/>
                                <Typography variant={'caption'}> Success</Typography>
                            </Stack>
                        </Box>
                    }
                    {isMobile && !blockNumber &&
                        <Typography variant={'body2'}>(Pending)</Typography>
                    }
                <Typography variant="subtitle2">Block:</Typography>
                    {isMobile &&        <Typography variant="body2">{blockNumber ? blockNumber : '(Pending)'}</Typography>}
                <Typography variant="subtitle2">From:</Typography>
                    {isMobile &&      <Typography  variant="body2">{from}</Typography>}
                <Typography variant="subtitle2">To:</Typography>
                    {isMobile &&    <Typography variant="body2">{to} </Typography>}
                <Typography  variant="subtitle2">Value:</Typography>
                    {isMobile &&     <Typography variant="body2">{convertWeiToEther(value)} ETH </Typography>}
                <Typography  variant="subtitle2">Transaction Fee:</Typography>
                    {isMobile &&      <Typography variant="body2">{calculateTransactionFee(gas, gasPrice) } ETH</Typography>}
                <Typography  variant="subtitle2">Gas Price:</Typography>
                    {isMobile &&      <Typography variant="body2">{getGasPriceToGwei(gasPrice) } Gwei ({getGasPrice(gasPrice)} ETH)</Typography>}
                </Stack>
            </CardContent>
            {!isMobile && <CardContent>

                <Stack spacing={1.7} sx={{color: '#7e8ea2'}}>
                <Typography variant="body2">{hash}</Typography>
                    {blockNumber ?  <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="1px solid #00a186"
                            borderRadius="6px"
                            padding="4px"
                            maxWidth="80px"
                            maxHeight={'25px'}
                            fontWeight="bold"
                            color="#00a186"
                        >
                            <Stack direction={'row'} spacing={0.4}>
                                <CheckCircleIcon fontSize="small" htmlColor="#00a186"  sx={{fontSize: 14, mt:0.4}}/>
                                <Typography variant={'caption'}> Success</Typography>
                            </Stack>
                        </Box>  :

                        <Typography variant={'body2'}>(Pending)</Typography>

                    }
                <Typography variant="body2">{blockNumber ? blockNumber : '(Pending)'}</Typography>
                <Typography variant="body2">{from}</Typography>
                <Typography variant="body2">{to} </Typography>
                <Typography variant="body2">{convertWeiToEther(value)} ETH </Typography>
                <Typography variant="body2">{calculateTransactionFee(gas, gasPrice) } ETH</Typography>
                <Typography variant="body2">  {getGasPriceToGwei(gasPrice) } Gwei ({getGasPrice(gasPrice)} ETH)</Typography>
                </Stack>
            </CardContent>
            }
            </Box>
        </Card>
            }
        </Container>
</>

);
};

export default TransactionDetailsCard;
