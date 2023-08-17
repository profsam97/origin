import {Address, IAddress, IBalance} from "@/types/types";
import axios from "axios";
import {ethers} from 'ethers'
import {useInfiniteQuery, useMutation, useQuery} from "react-query";
import {baseUrl} from '../helpers/baseUrl'
import {convertDateFormat, convertDateToTimestamp} from "@/helpers/utils";
import {useContext} from "react";
import ContextApi from "@/Store/ContextApi";

const API_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_PROJECT_ID}`;
const apiKey = process.env.NEXT_PUBLIC_API_KEY

// this function is reponsible for fetching the transactions of the provided address
export function useInfiniteFetch(onSuccess : any, data: IAddress) {
    const {startBlock, endBlock} = data;
    let address = useContext(ContextApi).address;
    let contract = useContext(ContextApi).contract;
    //trim the address and contract of trailing space
    address = address.trim()
    contract = contract.trim()
    // the current page the user is view, initially it is set to 0.
    const page = useContext(ContextApi).currentPage

    //the number of data fetch per page
    const  limit : number = 10;
    const fetchTransactions = async (currentpage : number) => {
        currentpage = page + 1;
        // endpoint for fetching ethereum trans
        const ethTrans : string = `${baseUrl}module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${currentpage}&offset=${limit}&sort=desc&apikey=${apiKey}`;
        const otherTrans : string = `${baseUrl}module=account&action=tokentx&contractaddress=${contract}&address=${address}&page=${currentpage}&offset=${limit}&startblock=${startBlock}&endblock=${endBlock}&sort=desc&apikey=${apiKey}`;
        // if the contract is provided, it means we fetch the other trans else we fetch ether trans
        const url  : string = contract === '' ? ethTrans : otherTrans

        const response = await axios.get(`${url}`);
        return response.data;
    }

    return useInfiniteQuery(['transactions'],
        ({pageParam = 1}) => fetchTransactions(pageParam),
        {
            //we define the logic for fetching the next and previous pages
            getNextPageParam: (lastPage) => {
                const nextPage =  page + 1;
                return lastPage?.length !== 0 ? nextPage : undefined
            },
            getPreviousPageParam: (firstPage) => firstPage.previousPage,
            onSuccess,
            // initially, we disable the request, since we dont yet have the data provided by the user
            enabled: false
        }
    )
}


// this function is responsible for fetching  the exchange rate for ethereum 
export const useFetchExchangeRate = (onSuccess: any) => {

    const handleFetchExchangeRate = async () => {
        const response = await axios.get(
            `${baseUrl}module=stats&action=ethprice&apikey=${apiKey}`
        );
        const ethPrice = response.data.result.ethusd;
        return parseFloat(ethPrice);
    }
    return useQuery('fetchExchangeRate', handleFetchExchangeRate, {onSuccess})
}


//function for fetching eth balance 
export const useFetchEthBalance =   (onSuccess: any, onError : any) => {
        const handleFetchBalance = async (postData : IBalance) => {
            //we get the address and date from the data
            let {address, date} = postData
            address = address.trim()
            const convertedDate = convertDateFormat(date);
            try {
                // we convert the date to timestamp
                const timestamp = convertDateToTimestamp(convertedDate)
                const fetchBlock = await axios.get(`${baseUrl}module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`);
               const blockNo = fetchBlock.data.result
                let block = ethers.utils.hexlify(Number(blockNo));
               // convert the number into hexadecimal representation
                //for some reasons date later than march 7 2023 are not working, im guessing that those date have eip-1898, and
                //alchemy does not support it
                let data = JSON.stringify({
                    "jsonrpc": "2.0",
                    "id": 1,
                    "method": "eth_getBalance",
                    "params": [
                        address, block.toString(),
                    ]
                });
                let config = {
                    method: 'post',
                    url: `${API_URL}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    data
                };

                const response = await axios(config);
                let balance = response['data']['result'];
                balance = ethers.utils.formatEther(balance);
                return balance;
            }
            catch (e) {
                console.log(e)
            }
            }

        return useMutation('fetchEthBal', handleFetchBalance, {onSuccess})
}

// this function is used to fetch transactions by hash
export const useGetTransactionByHash = (onSuccess: any, hash: string) => {
    const fetchTransByHash = async () => {
        const response = await axios.get(`${baseUrl}module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${apiKey}`)
        return response.data
    }

    return useQuery('getTransactionByHash', fetchTransByHash, {onSuccess})
}