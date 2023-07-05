import {GetServerSideProps, NextPage} from "next";
import axios from "axios";
import {IGetTransByHash, ITransaction} from "@/types/types";
import TransactionDetailsCard from "@/Component/utils/TransactionDetailCard";
import React, {useState} from "react";
import { baseUrl} from "@/helpers/baseUrl";
import {useRouter} from "next/router";
import {useGetTransactionByHash} from "@/Hooks/useDataFetch";
import Typography from "@mui/material/Typography";
import {CircularProgress} from "@mui/material";

type Transaction = {
    result : IGetTransByHash,
    id: number,
    error: object
}

const ViewTransaction : NextPage = () => {

    const router = useRouter();

    const hash : string = router.query.slug as  string
    const [data, setData] = useState<IGetTransByHash>({
        blockNumber: "",
        from: "",
        gas: "",
        gasPrice: "",
        hash: "",
        maxFeePerGas: "",
        to: "",
        value: 0
    })
    const onSuccess  = (data: Transaction) => {
        if (data.error) {
            router.back()
            return
        }
        setData(data.result)
    }
    const {isLoading, isSuccess}  = useGetTransactionByHash(onSuccess, hash)
    return  (
        <>
            {isLoading && <Typography variant={'body1'}><CircularProgress/></Typography>}
            {isSuccess && <TransactionDetailsCard data={data}/>}
        </>
    )
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//     //get the transaction hash from the url
//     const transactionHash: string | undefined | any = context.params?.slug;
//     try {
//         const response = await axios.get(`${baseUrl}module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${apiKey}`);
//         const data = response.data.result;
//         return {
//             props: {
//                 data,
//             },
//         };
//     }
//     catch (e) {
//         //if there is an error we redirect to the homepage.
//         return  {
//             redirect: {
//                 destination: '/',
//                 permanent: true
//             }
//         }
//     }
// };

export default ViewTransaction