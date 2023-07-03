import {CircularProgress, Container, FormHelperText, TextField, useMediaQuery} from "@mui/material"
import React, {useContext, useState} from "react"
import {useFetchEthBalance, useFetchExchangeRate} from "@/Hooks/useDataFetch";
import ContextApi from "@/Store/ContextApi";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IBalance} from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Stack} from "@mui/system";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import BalanceCard from "@/Component/utils/BalanceCard";
import {scrollToBottom, scrollToPercentage} from "@/helpers/utils";

const schema = yup.object().shape({
    address: yup.string().required(),
    date:  yup.string().required(),
});
const CheckBal : React.FC = () => {


    const { handleSubmit: handleSubmitBal, formState: {errors}, control : controlBal, reset: resetBal } =
        useForm<IBalance>({
            resolver: yupResolver(schema),
            mode: "onBlur",
            defaultValues: {
                address: "",
                date: '',
            },
        });
    const [isError, setIsError] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>('')
    const handleUpdateBalance = useContext(ContextApi).handleUpdateBalance;
    const balance = useContext(ContextApi).amount

    const onBalSuccess = (data : number | undefined) => {
          if (!data) {
              setErrorMessage('something went wrong')
              setIsError(true)
              return
          }
        handleUpdateBalance(data)
        resetBal()
       setTimeout(() => {
           scrollToBottom()
       },20)
    }
    const onError = (data : any) => {
        setIsError(true)
        setErrorMessage('something went wrong')
    }

    const {isSuccess, isLoading: isBalLoading, mutate: postAddDate} = useFetchEthBalance(onBalSuccess, onError)


    const onBalSubmit : SubmitHandler<IBalance> = async (data) => {
        setIsError(false)
        postAddDate(data)
        handleUpdateBalance(null)
    }

    const updateRate = useContext(ContextApi).updateRate
    const onExchangeRateSuccess = (data: number) => {
        updateRate(data)
    }
    useFetchExchangeRate(onExchangeRateSuccess)
    const isMobile : boolean = useMediaQuery('(max-width: 740px)')

        return (
                <Container maxWidth={'lg'} component={'main'}>

                    <Stack spacing={2} my={3}>
                    <Typography variant={'body1'}>
                        ETH Account Balance Checker
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmitBal(onBalSubmit)}
                        noValidate
                        sx={{ mt: 1,  display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}
                    >
                        <Controller
                            name="address"
                            control={controlBal}
                            render={({ field, formState: { errors } }) => (
                                <TextField
                                    label={"search address"}
                                    variant="outlined"
                                    margin={"normal"}
                                    sx={{ width: isMobile ? '100%' : '60%'}}
                                    required={true}
                                    error={!!errors?.address}
                                    helperText={errors?.address?.message}
                                    type={"text"}
                                    {...field}
                                    autoComplete={'off'}
                                />
                            )}
                        />
                        <Stack sx={{mx: isMobile ? 0 : 2}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    name="date"
                                    control={controlBal}
                                    render={({
                                                 field: { onChange, value },
                                                 formState: { errors },
                                             }) => (
                                        <DatePicker
                                            label={'Select date'}
                                            disableFuture
                                            value={value ? dayjs(value).format("MM / DD / YYYY") : null} // Set initial value to null
                                            onChange={(value) =>
                                                onChange(dayjs(value).format("MM / DD / YYYY"))
                                        }
                                            slotProps={{ textField:
                                                    {
                                                        variant: 'standard',
                                                        margin: "dense",
                                                        error: !!errors.date,
                                                        helperText: 'MM/DD/YYYY',
                                                        id: "date",
                                                        placeholder:"Select date",
                                                        color: "primary"
                                                    }
                                        }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <FormHelperText  sx={{ color: "red" }}>
                               {errors?.date?.message}
                            </FormHelperText>
                        </Stack>

                        <Stack spacing={1}>
                            <Button
                                disabled={isBalLoading}
                                type="submit"
                                size={'large'}
                                variant="contained"
                                sx={{ mt: 3, mb: 2}}
                            >
                                {isBalLoading && (
                                    <CircularProgress
                                        aria-describedby={"progress bar"}
                                        size={"small"}
                                    />
                                )}
                                View
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
                <Stack my={3}>
                {isBalLoading &&  <Typography textAlign={'center'}>  <CircularProgress/></Typography>}
                {balance  && <BalanceCard amount={balance} />}
                    {isError && !balance && <Typography textAlign={'center'}  sx={{color: 'red'}} variant={'subtitle2'}>{errorMessage} </Typography>}

                </Stack>
                </Container>
        )

}


export default CheckBal