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
    amount: null,
    handleUpdateBalance: (amount: number | null) => {}
})

export default ContextApi;