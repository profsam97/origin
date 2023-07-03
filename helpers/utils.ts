import {IRound} from "@/types/types";

export function truncate (word: string, len: number) {
    if (word?.length > len)
        return word?.substring(0, len) + '...';
    else
        return word;
}
export function convertTimestampToTimeAgo(timestamp: number): string {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
    const timeDifference = currentTimestamp - timestamp; // Calculate the time difference in seconds

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;

    if (timeDifference < secondsInMinute) {
        return `${timeDifference} seconds ago`;
    } else if (timeDifference < secondsInHour) {
        const minutes = Math.floor(timeDifference / secondsInMinute);
        return `${minutes} minutes ago`;
    } else if (timeDifference < secondsInDay) {
        const hours = Math.floor(timeDifference / secondsInHour);
        return `${hours} hours ago`;
    } else {
        const days = Math.floor(timeDifference / secondsInDay);
        return `${days} days ago`;
    }
}

export const convertDateFormat = (dateString: string): string =>  {
    const [month, day, year] = dateString.split('/').map((part) => part.trim());

    const convertedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`;


    return convertedDate;
}
export const convertDateToTimestamp = (dateString : string)  => {
    const timestamp = Date.parse(dateString) / 1000;
    return timestamp;
}


export const round = (number: number): any => {
    const formattedNumber = new Intl.NumberFormat('en-US', {  maximumFractionDigits: 18}).format(number);

    return formattedNumber
};


export const  calculateTransactionFee = (gas: string, gasPrice: string): string => {
    const gasPriceWei = BigInt(gasPrice);
    const gasUsed = BigInt(gas);
    const transactionFeeWei = gasPriceWei * gasUsed;
    const decimalFactor = BigInt('1000000000000000000'); // Decimal factor for 18 decimal places
    const transactionFeeEther = Number(transactionFeeWei) / Number(decimalFactor);

    return transactionFeeEther.toFixed(7);

}
export const convertToEth = (value: string) : string => {
    const wei = BigInt(value);
    const eth = Number(wei) / 1e18;
    return eth.toFixed(18).replace(/\.?0+$/, '');

}
export const  convertWeiToEther = (wei: number): string => {
    const decimalFactor = BigInt('1000000000000000000'); // Decimal factor for 18 decimal places
    const valueWei = BigInt(wei);
    const valueEther = Number(valueWei) / Number(decimalFactor);
    const truncatedValue = Math.floor(valueEther * Math.pow(10, 7)) / Math.pow(10, 7);

    return truncatedValue.toString();
}

export const convertTokenValue = (value: number, decimalPlace: string) : string => {
    const decimalFactor = BigInt(`10${'0'.repeat(Number(decimalPlace))}`); // Decimal factor for the token
    const valueToken = BigInt(value);
    const valueReadable = Number(valueToken) / Number(decimalFactor);
    const truncatedValue = Math.floor(valueReadable * Math.pow(10, 7)) / Math.pow(10, 7);

    return truncatedValue.toString();
}

export const getGasPrice = (gasPriceWei: string) : string => {
    const weiPerEth = 1000000000000000000; // 1 ETH = 10^18 Wei
    const gasPriceEth = parseInt(gasPriceWei, 16) / weiPerEth;
    return gasPriceEth.toFixed(18).replace(/\.?0+$/, '');
}

export const getGasPriceToGwei = (gasPriceWei: string) : string => {
    const weiPerGwei = 1000000000; // 1 Gwei = 10^9 Wei
    const gasPriceGwei = parseInt(gasPriceWei, 16) / weiPerGwei;

    return  gasPriceGwei.toFixed(0);

}


export  const scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth', // Add smooth scrolling effect
    });
};

export const scrollToPercentage = (percentage: number) => {
    const windowHeight = window.innerHeight;
    const scrollPosition = (windowHeight * percentage) / 100;

    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth', // Add smooth scrolling effect
    });
};