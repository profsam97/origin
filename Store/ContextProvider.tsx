import React, {useState} from "react";
import ContextApi from "@/Store/ContextApi";
import {ITrans} from "@/types/types";
interface IProvider {
    children: React.ReactNode
}
const ContextProvider  : React.FC<IProvider>= ({children}) => {
    //this component makes our state global, that is accessible component-wide
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

    //this function updates the transaction state, expect 2 argument, 
    // newtable contains the transaction data, which will be added to the prev trans data if any, 
    // the empty boolean indicate whether the trans data should be reseted, this is used when the user clicks on the search button
    //so the previous trans  will be deleted, since we are fetching for a new address 
    const handleUpdateTransaction = (newTable: ITrans[], empty: boolean) => {
        if (empty) {
            setTransaction([])
            return
        }

        setTransaction(prevState => [...prevState, ...newTable])
    }
    // this allows use to track the current table page the user is on, useful when fetch data from the api endpoint
    const handleUpdatePage = (page : number) => {
        setPage(page)
    }
    const handleAddressContract = (address : string, contract: string) => {
        setAddress(address)
        setContract(contract)
    }
    // this update the rate of eth to dollars
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