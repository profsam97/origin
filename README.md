
# Transaction Explorer

### Please read the instructions, to learn how to use the app.
## Project requirements
#### This project makes use of etherscan api and alchemy to view transactions and balance respectively
so for the app to function properly, we need to have the apikey for etherscan and projectid for alchemy

### Env file

#### This project makes use of two `env variables` 
1. NEXT_PUBLIC_API_KEY
2. NEXT_PUBLIC_PROJECT_ID

#### Rename the `example.env` file to `.env` and put the required apikey and project id

#### For the purpose of this project, you can use this test keys.

The first for the api key and the second for the project id
1. `1NG6KRSJXKTDIEQG9U6YUJM2G51B28TXY41`
2. `Mgq9vjmhi9Y09Zpr8KVXiktN9UIYzZAO`

### How to use

#### This app is relatively easy to use and straightforward, to view a transaction for Ethereum,
#### Input the address, optionally input the start and endblock


#### To View token amount other than Eth, input the contract address e.g. for Maker `0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2` and the address e.g. `0x4e83362442b8d1bec281594cea3050c8eb01311c`

#### To view exact value of ETH that was available on the given address, input the address and select the desired date.

### Side Note on the date, The Date selected should not be later than march 7, 2023. but can be earlier.

#### for some reasons date later than march 7 2023 are not working, im guessing that those date have eip-1898, alchemy does not support it


## Getting Started
there are two ways to achieve this:
1. `Run locally`

First, install the dependencies:
```bash
npm install
```

#### Then start the dev server


```bash
npm run dev 
```
## VIew the app
### view by visiting localhost:3000
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. `Run in a Docker environment`
### build the container using the following
```
docker build -t origin .
```
### Running it 

```
docker run -dp 3000:3000 origin
```

### To see the app visit ip address of the vm/server:3000

## Deploy on Vercel

### This app has already been deployed on vercel 

Open [https://origintrail.vercel.app](https://origintrail.vercel.app) with your browser to see.
