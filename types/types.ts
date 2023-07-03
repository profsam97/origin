import {
    FetchNextPageOptions,
    FetchPreviousPageOptions,
    InfiniteQueryObserverResult
} from "react-query/types/core/types";

export interface IAddress {
    address : string,
    startBlock :number,
    endBlock: number,
    contract: string
}

export interface IBalance {
    address : string,
    date: string
}
export interface Address {
    address : string
}
export type ITrans = {
    blockNumber: number;
    hash:string,
    gas: string,
    gasPrice:string,
    timeStamp: number,
    from : string,
    tokenSymbol: string,
    to : string,
    value: number,
    tokenDecimal: string
};
export type IRound  = {
    dec: number,
    number: number
}

export interface TransResult  {
    result: ITrans[],
    message: string
}
export interface ITransTable {
    trans: ITrans[][],
    isFetching: boolean,
    hasNextPage: boolean | undefined,
    isFetchingNextPage: boolean,
    fetchNextPage: any,
    hasPreviousPage: boolean | undefined,
    isFetchingPreviousPage: boolean,
    fetchPreviousPage: any
}

export interface ITransaction {
    status: string,
    block: number,
    to: string,
    value: number,
    fee: number
}

export interface IInnerTable {
    column: string,
    row: string
}

export interface IGetTransByHash {
    blockNumber: string,
    from : string,
    to: string,
    gas: string,
    gasPrice: string,
    maxFeePerGas: string,
    hash: string,
    value: string
}

export interface IHeader {
    title: string,
    description: string,
    content: string
}