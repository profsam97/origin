import React from "react";
import {ITrans} from "@/types/types";
const ITrans = {
    blockNumber: 0,
    hash:'',
    gas: '',
    gasPrice:'',
    timeStamp: 1111,
    from : '',
    tokenSymbol: '',
    to : '',
    value: 0,
    tokenDecimal: ''
}
const ContextApi =  React.createContext({
    rate: 1983,
    updateRate: (rate: number) => {},
    transactions: [ITrans],
    address: '',
    contract: '',
    currentPage: 0,
    handleCurrentPage: (page: number) => {},
    handleAddressContract: (address : string, contract: string) => {},
    handleUpdatePage: (page: number) => {},
    handleUpdateTransaction: (newData : ITrans[], empty: boolean) => {},
    page: 0,
    amount: null,
    handleUpdateBalance: (amount: number | null) => {}
})

export default ContextApi;