import React, {useState} from "react";
import ContextApi from "@/Store/ContextApi";
import {ITrans, TransResult} from "@/types/types";
import {number} from "yup";
import {compileNonPath} from "next/dist/shared/lib/router/utils/prepare-destination";

interface IProvider {
    children: React.ReactNode
}
const ContextProvider  : React.FC<IProvider>= ({children}) => {

    const [contract, setContract] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [rate, setRate] = useState<number>(1911);
    const [transactions, setTransaction] = useState<ITrans[]>([])
    const [page, setPage] = React.useState(0);
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [amount, setAmount] = useState<any>(null)
    const handleUpdateBalance = (amount : number | null) => {
        setAmount(amount)
    }


    const handleUpdateTransaction = (newTable: ITrans[], empty: boolean) => {
        if (empty) {
            setTransaction([])
            return
        }

        setTransaction(prevState => [...prevState, ...newTable])
    }
    const handleUpdatePage = (page : number) => {
        setPage(page)
    }
    const handleAddressContract = (address : string, contract: string) => {
        setAddress(address)
        setContract(contract)
    }
    const updateRate = (rate : number) => {
        setRate(rate)
    }
    const handleCurrentPage = (page: number) => {
        setCurrentPage(page)
    }
        const content = {
                rate,
                updateRate,
                transactions,
                amount,
                page,
                address,
                contract,
                currentPage,
                handleCurrentPage,
                handleAddressContract,
                handleUpdatePage,
                handleUpdateTransaction,
                handleUpdateBalance,
        }
        return (
            <ContextApi.Provider value={content}>
                {children}
            </ContextApi.Provider>
    )

}

export default ContextProvider