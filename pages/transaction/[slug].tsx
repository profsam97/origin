import {GetServerSideProps, NextPage} from "next";
import axios from "axios";
import {IGetTransByHash, ITransaction} from "@/types/types";
import TransactionDetailsCard from "@/Component/utils/TransactionDetailCard";
import React from "react";
import { baseUrl} from "@/helpers/baseUrl";

type Transaction = {
    data : IGetTransByHash
}

const ViewTransaction : React.FC<Transaction> = ({data}) => {
    return <TransactionDetailsCard data={data} />
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    //get the transaction hash from the url
    const transactionHash: string | undefined | any = context.params?.slug;
    try {
        const response = await axios.get(`${baseUrl}module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${apiKey}`);
        const data = response.data.result;
        return {
            props: {
                data,
            },
        };
    }
    catch (e) {
        //if there is an error we redirect to the homepage.
        return  {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
};

export default ViewTransaction