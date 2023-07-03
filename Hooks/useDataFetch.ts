import {Address, IAddress, IBalance} from "@/types/types";
import axios from "axios";
import {ethers} from 'ethers'
import  EthDater from 'ethereum-block-by-date'
import {useInfiniteQuery, useMutation, useQuery} from "react-query";
import {baseUrl, apiKey} from '../helpers/baseUrl'
import {convertDateFormat, convertDateToTimestamp} from "@/helpers/utils";
import {useContext} from "react";
import ContextApi from "@/Store/ContextApi";

const API_URL = 'https://eth-mainnet.g.alchemy.com/v2/Mgq9vjmhi9Y09Zpr8KVXiktN9UIYzZAO';
const apikey = 'Mgq9vjmhi9Y09Zpr8KVXiktN9UIYzZAO'

export function useInfiniteScroll(onSuccess : any, data: IAddress) {
    const {address,startBlock, endBlock, contract} = data;

    const  limit : number = 10;
    const fetchTransactions = async (page : number) => {
        const ethTrans : string = `${baseUrl}module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${limit}&sort=desc&apikey=${apiKey}`;
        const otherTrans : string = `${baseUrl}module=account&action=tokentx&contractaddress=${contract}&address=${address}&page=${page}&offset=${limit}&startblock=${startBlock}&endblock=${endBlock}&sort=desc&apikey=${apiKey}`;
        const url  : string = contract === '' ? ethTrans : otherTrans

        const response = await axios.get(`${url}`);
        return response.data;

    }
    return useInfiniteQuery(['transactions'],
        ({pageParam = 1}) => fetchTransactions(pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const nextPage =     allPages.length + 1;
                return lastPage?.length !== 0 ? nextPage : undefined
            },
            getPreviousPageParam: (firstPage) => firstPage.previousPage,
            onSuccess,
            enabled: false
        }
    )
}

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
export const useFetchEthBalance =   (onSuccess: any, onError : any) => {
        const handleFetchBalance = async (postData : IBalance) => {
            const {address, date} = postData
            const convertedDate = convertDateFormat(date);
            try {
                const timestamp = convertDateToTimestamp(convertedDate)
                const fetchBlock = await axios.get(`${baseUrl}module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`);
               const blockNo = fetchBlock.data.result
                // let block = await dater.getDate(convertedDate);
                let block = ethers.utils.hexlify(Number(blockNo));
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

        return useMutation('fetchEthBal', handleFetchBalance, {onSuccess, onError})
}

