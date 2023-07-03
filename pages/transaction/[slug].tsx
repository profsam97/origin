import {GetServerSideProps, NextPage} from "next";
import axios from "axios";
import {IGetTransByHash, ITransaction} from "@/types/types";
import TransactionDetailsCard from "@/Component/utils/TransactionDetailCard";
import React from "react";
import {apiKey, baseUrl} from "@/helpers/baseUrl";

type Transaction = {
    data : IGetTransByHash
}

const ViewTransaction : React.FC<Transaction> = ({data}) => {
    return <TransactionDetailsCard data={data} />
}
export const getServerSideProps: GetServerSideProps = async (context) => {
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
        return  {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
};

export default ViewTransaction