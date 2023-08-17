import React, {useContext, useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {ITrans, ITransTable} from "@/types/types";
import {
    calculateTransactionFee,
    convertTimestampToTimeAgo,
    convertTokenValue,
    convertWeiToEther,
    truncate
} from "@/helpers/utils";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import {TablePagination} from "@mui/base";
import IconButton from "@mui/material/IconButton";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import ContextApi from "@/Store/ContextApi";

const PaginationContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
}));

const PaginationText = styled('span')({
    marginRight: '16px',
    margin: '1px',
    color: '#333', 
});

const TransactionTable: React.FC<ITransTable> = ({ isFetching, isFetchingPreviousPage, trans,hasNextPage,isFetchingNextPage,fetchNextPage }) => {
    //no of rows to be fetched per page
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const page = useContext(ContextApi).page;
    const handleUpdatePage = useContext(ContextApi).handleUpdatePage;
    const handleCurrentPage = useContext(ContextApi).handleCurrentPage;
    const handlePageChange = (_ : React.MouseEvent<HTMLButtonElement> | null, newPage : number) => {
        handleCurrentPage(newPage)
        //we check if the newpage is greater than the current page
        if (newPage > page) {
            //if it is, fetch the next page
            setTimeout(() => {
                fetchNextPage(newPage);
            },10)
            setTimeout(() => {
                handleUpdatePage(newPage);
            },800)
        } else {
            //if not update the pagenumber
            // fetchPreviousPage(newPage);
            handleUpdatePage(newPage);
        }

    };
        useEffect(() => {
                console.log(trans.slice(0, 10))
                console.log(trans[0], trans[10])
        },[])
    return (
        <Paper>
            <TableContainer component={Paper} sx={{my:2, bgcolor: '#111A2E', color: '#fff',
                '&::-webkit-scrollbar': {
                    width: '2px !important',
                    scrollbarWidth: 'thin'
                },
                '&::-webkit-scrollbar-track': {
                    background: '#fff',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#47566a',
                    borderRadius: '5px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#7e8ea2',
                },

            }}>
                <Table stickyHeader  sx={{ minWidth: 450 }} size={"medium"} aria-label="stats table">
                    <TableHead>
                        <TableRow  sx={{bgcolor: '#111A2E'}}>
                            <TableCell> N/A</TableCell>
                            <TableCell> Transaction Hash</TableCell>
                            <TableCell align="left">
                                Block
                            </TableCell>

                                <TableCell align="left" sx={{minWidth: 140}}>
                                    Date Time
                                </TableCell>
                            <TableCell align="left">
                                From
                            </TableCell>
                            <TableCell align="left">
                               To
                            </TableCell>
                            <TableCell align="left">
                                Value
                            </TableCell>
                            <TableCell align="left">
                                <Typography sx={{color: '#0784C3'}}>Tnx Fee</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{color: '#fff'}}>
                        { trans.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        ).map(({from,tokenDecimal, tokenSymbol, value,gasPrice, gas, timeStamp,blockNumber, hash,to} , index) => (
                               <TableRow
                                key={index}
                                sx={{"&:last-child td, &:last-child th": {border: 0}, color: '#fff'}}
                            >
                                   <TableCell component="th" scope="row">
                                       {((page * rowsPerPage) + (index + 1)) }
                                   </TableCell>
                                <TableCell component="th" scope="row">
                                    <Link href={`/transaction/${hash}`} style={{color: '#0784C3', textDecoration: 'none'}}> {truncate(hash, 20)} </Link>
                                </TableCell>
                                <TableCell align="left">{blockNumber} </TableCell>
                                <TableCell align="left">{convertTimestampToTimeAgo(timeStamp)}</TableCell>
                                <TableCell align="left">{truncate(from, 20)} </TableCell>
                                <TableCell align="left">{truncate(to, 20)} </TableCell>
                                <TableCell align="left">{ tokenSymbol ? convertTokenValue(value, tokenDecimal) : convertWeiToEther(value)}{ tokenSymbol ? ' ' +  tokenSymbol  : ' ETH'}</TableCell>
                                   <TableCell align="left">{calculateTransactionFee(gas, gasPrice)} ETH</TableCell>
                               </TableRow>
                           ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationContainer>
                {isFetching && <CircularProgress/>}
                <PaginationText>
                    {`${page * rowsPerPage  +  1 + ' - ' +  (page * rowsPerPage + rowsPerPage)}`}
                </PaginationText>
                <IconButton
                    onClick={() => handlePageChange(null, page - 1)}
                    disabled={page === 0 || isFetchingPreviousPage}
                    aria-label="Previous Page"
                >
                    <ChevronLeft />
                </IconButton>
                <IconButton
                    onClick={() => handlePageChange(null, page + 1)}
                    disabled={isFetchingNextPage}
                    aria-label="Next Page"
                >
                    <ChevronRight />
                </IconButton>
            </PaginationContainer>
        </Paper>
    );
};
export default TransactionTable;
