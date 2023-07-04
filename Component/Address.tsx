import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {useContext, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Stack} from "@mui/system";
import Typography from "@mui/material/Typography";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, CircularProgress, TextField, useMediaQuery} from "@mui/material";
import {IAddress, TransResult} from "@/types/types";
import {useInfiniteFetch } from "@/Hooks/useDataFetch";
import TransactionTable from "@/Component/utils/TransactionTable";
import ContextApi from "@/Store/ContextApi";
import {scrollToBottom, scrollToPercentage} from "@/helpers/utils";
//define scheme for yup, which handles form validation
const schema = yup.object().shape({
    address: yup.string().required(),
    contract: yup.string(),
    startBlock:  yup.number().typeError('Must be a number').nullable().min(0),
    endBlock: yup.number().typeError('Must be a number').nullable().min(0)
});
const initialData = {
    address: '',
    startBlock: 0,
    contract: '',
    endBlock: 99999999
}

let isFirst = true
const Address : React.FC = () => {
    const [addressData, setAddressDate] = useState<IAddress>(initialData)
    const { handleSubmit, control, getValues, reset } =
        useForm<IAddress>({
            resolver: yupResolver(schema),
            mode: "onBlur",
            defaultValues: {
                address: "",
                startBlock: 0,
                contract: '',
                endBlock: 99999999
            },
        });
    const isMobile : boolean = useMediaQuery('(max-width: 740px)')
    //this variable contains all the transactions returned from the api 
    const transactions = useContext(ContextApi).transactions
    //this variable holds whether there is an error or not
    const [isError, setIsError] = useState<boolean>(false);
    //state for managing error message if any
    const [errorMessage, setErrorMessage] = useState<string>('')
    //this is a function provided in the contextprovider
    const handleUpdateTransaction = useContext(ContextApi).handleUpdateTransaction;

    const onTransSuccess = (data : any) => {
        //we check the status of the data
        const status = data?.pages[0].status;
            //if the status is 0, we set the error variable to true, and the errorMessage to the result which contains the error message
        if (Number(status) === 0) {
            setIsError(true)
            setErrorMessage(data?.pages[0].result)
            return
        }
        const tableData = data?.pages.flatMap((page : TransResult) => page.result) ?? [];
       const length = tableData.length
        const newTable = tableData.slice(length-10, length)
        handleUpdateTransaction(newTable, false)
        reset()
        if (isFirst){
            isFirst = false
            setTimeout(() => {
                scrollToPercentage(70)
            },50)
        }
    }
        //this is a function provided in the contextprovider

    const handleAddressContract = useContext(ContextApi).handleAddressContract;
        //this is a function provided in the contextprovider
    const handleUpdatePage = useContext(ContextApi).handleUpdatePage;
    //the below is a hook provided by react-query which handles server-side data, we pass a function called onTranSuccess, which will 
    //execute if the request was successful, also the addressData, which contains the data the user submitted
   const { isLoading,isFetching,fetchNextPage,fetchPreviousPage, hasPreviousPage, 
    isFetchingPreviousPage, refetch, hasNextPage, isFetchingNextPage} =   useInfiniteFetch(onTransSuccess, addressData)
   //these function is the submit handler
   const onSubmit : SubmitHandler<IAddress> = async (data) => {
        // we get all the field which was submitted
        const {address,startBlock,endBlock, contract} = data;
        handleUpdateTransaction([], true)
        //we set the error to false
        setIsError(false)
        const newData = {
                address,
                startBlock,
                endBlock,
                contract
            }

            handleUpdatePage(0)
            //we set the addressData with the newly submitted data by the user
            setAddressDate(newData)
        handleAddressContract(address, contract)
        setTimeout(() => {
            refetch()
        }, 100)
        }
        return (
            <Container maxWidth={'lg'} component={'main'}>
                <Stack spacing={2}>
                    <Typography variant={'body1'}>
                        The Ethereum Transactions Explorer
                    </Typography>
                    <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1,  display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}
                        >
                            <Controller
                                name="address"
                                control={control}
                                render={({ field, formState: { errors } }) => (
                                    <TextField
                                        label={"search address"}
                                        variant="outlined"
                                        margin={"normal"}
                                        sx={{ width: isMobile ? '100%' : '50%'}}
                                        required={true}
                                        error={!!errors?.address}
                                        helperText={errors?.address?.message}
                                        type={"text"}
                                        {...field}
                                    />
                                )}
                            />
                        <Controller
                            name="contract"
                            control={control}
                            render={({ field, formState: { errors } }) => (
                                <TextField
                                    label={"type contract address"}
                                    variant="outlined"
                                    margin={"normal"}
                                    sx={{ mx: isMobile ? 0 : 2,width: isMobile ? '100%' : '30%'}}
                                    error={!!errors?.contract}
                                    helperText={errors?.contract?.message}
                                    type={"text"}
                                    {...field}
                                />
                            )}
                        />
                            <Controller
                                control={control}
                                name="startBlock"
                                render={({ field, formState: { errors } }) => (
                                    <TextField
                                        label={"Start Block"}
                                        variant="outlined"
                                        margin={"normal"}
                                        sx={{mx: isMobile ? 0 : 2}}
                                        error={!!errors?.startBlock}
                                        helperText={errors?.startBlock?.message}
                                        type={ "number"}
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="endBlock"
                                render={({ field, formState: { errors } }) => (
                                    <TextField
                                        label={"End Block"}
                                        variant="outlined"
                                        margin={"normal"}
                                        sx={{mx: isMobile ? 0 : 2}}
                                        error={!!errors?.endBlock}
                                        helperText={errors?.endBlock?.message}
                                        type={ "number"} 
                                        {...field}
                                    />
                                )}
                            />
                            <Stack spacing={1}>
                                <Button
                                    disabled={isLoading}
                                    className={"buttonClass"}
                                    type="submit"
                                    size={'large'}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2}}
                                >
                                    {isFetching && (
                                        <CircularProgress
                                            aria-describedby={"progress bar"}
                                            size={"small"}
                                        />
                                    )}
                                    Search
                                </Button>
                            </Stack>
                        </Box>
                </Stack>
                <Typography textAlign={'center'}>{isFetching && <CircularProgress />} </Typography>
                { transactions?.length > 0 &&  <TransactionTable  isFetching={isFetching}  fetchPreviousPage={fetchPreviousPage} hasPreviousPage={hasPreviousPage} isFetchingPreviousPage={isFetchingPreviousPage}  hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}  trans={transactions}/>}
                {isError && transactions?.length === 0 && <Typography textAlign={'center'}  sx={{color: 'red'}} variant={'subtitle2'}>{errorMessage} </Typography>}
            </Container>
        )
}
export default Address;