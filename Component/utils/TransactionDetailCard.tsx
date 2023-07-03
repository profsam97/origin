import React, {useContext} from 'react';
import {Card, CardContent, Typography, useMediaQuery} from '@mui/material';
import Container from "@mui/material/Container";
import {Stack, useTheme} from "@mui/system";
import Box from "@mui/material/Box";
import {IGetTransByHash, ITransaction} from "@/types/types";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Link from "next/link";
import {
    calculateTransactionFee,
    convertTimestampToTimeAgo, convertToEth,
    convertTokenValue,
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
    data : IGetTransByHash
}

const TransactionDetailsCard : React.FC<Transaction> = ({data}) => {
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
        <Card sx={{bgcolor: '#111A2E', borderRadius: '10px', my:6 }}>
            <Box sx={{maxWidth: 800, display: 'flex', justifyContent: 'space-between'}}>
            <CardContent sx={{ mr: 2 }}>
                <Stack spacing={1.5} sx={{color: '#7e8ea2'}}>
                <Typography  variant="subtitle2">Transaction Hash:</Typography>
                    {isMobile &&   <Typography variant="body2">0x84b4ee4410bc3300db0f39d26d4a33ed1b8dc8f6395c04016d76f4ff39a88f85</Typography>}
                <Typography  variant="subtitle2">Status:</Typography>
                    {isMobile &&    <Typography variant="body2">Success</Typography>}
                <Typography variant="subtitle2">Block:</Typography>
                    {isMobile &&        <Typography variant="body2">17453419</Typography>}
                <Typography variant="subtitle2">From:</Typography>
                    {isMobile &&      <Typography  variant="body2">0x9204AAB44A4B8ECae2340907A16f038DBaa7EbcE</Typography>}
                <Typography variant="subtitle2">To:</Typography>
                    {isMobile &&    <Typography variant="body2">0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe (EthDev)</Typography>}
                <Typography  variant="subtitle2">Value:</Typography>
                    {isMobile &&     <Typography variant="body2">0.000052012 ETH </Typography>}
                <Typography  variant="subtitle2">Transaction Fee:</Typography>
                    {isMobile &&      <Typography variant="body2">0.00037299860534552 ETH</Typography>}
                <Typography  variant="subtitle2">Gas Price:</Typography>
                    {isMobile &&      <Typography variant="body2">16.58951278 Gwei (0.00000001658951278 ETH)</Typography>}
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
                <Typography variant="body2">{convertToEth(value)} ETH </Typography>
                <Typography variant="body2">{calculateTransactionFee(gas, gasPrice) } ETH</Typography>
                <Typography variant="body2">  {getGasPriceToGwei(gasPrice) } Gwei ({getGasPrice(gasPrice)} ETH)</Typography>
                </Stack>
            </CardContent>
            }
            </Box>
        </Card>
            {/*<Table stickyHeader  sx={{ minWidth: 550 }} size={"medium"} aria-label="stats table">*/}
            {/*    <TableHead>*/}
            {/*        <TableRow  sx={{bgcolor: '#111A2E'}}>*/}
            {/*            <TableCell> Transaction Hash</TableCell>*/}
            {/*            <TableCell align="left">*/}
            {/*                Status*/}
            {/*            </TableCell>*/}

            {/*            <TableCell align="left" sx={{minWidth: 140}}>*/}
            {/*                Block*/}
            {/*            </TableCell>*/}
            {/*            <TableCell align="left">*/}
            {/*                From*/}
            {/*            </TableCell>*/}
            {/*            <TableCell align="left">*/}
            {/*                To*/}
            {/*            </TableCell>*/}
            {/*            <TableCell align="left">*/}
            {/*                Value*/}
            {/*            </TableCell>*/}
            {/*            <TableCell align="left">*/}
            {/*                Transaction Fee*/}
            {/*            </TableCell>*/}
            {/*            <TableCell align="left">*/}
            {/*                Gas Price*/}
            {/*            </TableCell>*/}
            {/*        </TableRow>*/}
            {/*    </TableHead>*/}
            {/*    <TableBody sx={{color: '#fff'}}>*/}
            {/*            <TableRow*/}
            {/*                sx={{"&:last-child td, &:last-child th": {border: 0}, color: '#fff'}}*/}
            {/*            >*/}
            {/*                <TableCell component="th" scope="row">*/}
            {/*                    <Button*/}
            {/*                        variant="outlined"*/}
            {/*                        color="success"*/}
            {/*                        startIcon={<CheckCircleOutlineIcon />}*/}
            {/*                        disabled*/}
            {/*                        size="small"*/}
            {/*                    >*/}
            {/*                        Success*/}
            {/*                    </Button>*/}
            {/*                </TableCell>*/}
            {/*                <TableCell component="th" scope="row">*/}
            {/*                        xxxxx*/}
            {/*                </TableCell>*/}
            {/*                <TableCell align="left">xxxx </TableCell>*/}
            {/*                <TableCell align="left">xxxx    </TableCell>*/}
            {/*                <TableCell align="left">xxxx </TableCell>*/}
            {/*                <TableCell align="left">xxxxxxx </TableCell>*/}
            {/*                <TableCell align="left">xxx</TableCell>*/}
            {/*                <TableCell align="left">xxxx</TableCell>*/}
            {/*            </TableRow>*/}
            {/*    </TableBody>*/}
            {/*</Table>*/}
        </Container>
</>

);
};

export default TransactionDetailsCard;
