import React, {useState} from "react";
import ContextApi from "@/Store/ContextApi";
import {ITrans, TransResult} from "@/types/types";
import {number} from "yup";
import {compileNonPath} from "next/dist/shared/lib/router/utils/prepare-destination";

interface IProvider {
    children: React.ReactNode
}
const ContextProvider  : React.FC<IProvider>= ({children}) => {

    const [rate, setRate] = useState<number>(1911);
    const [transactions, setTransaction] = useState<ITrans[]>([])

    const [amount, setAmount] = useState<any>(null)
    const handleUpdateBalance = (amount : number | null) => {
        setAmount(amount)
    }


    const updateRate = (rate : number) => {
        setRate(rate)
    }
        const content = {
                rate,
                updateRate,
                transactions,
                amount,
                handleUpdateBalance,
        }
        return (
            <ContextApi.Provider value={content}>
                {children}
            </ContextApi.Provider>
    )

}

export default ContextProvider