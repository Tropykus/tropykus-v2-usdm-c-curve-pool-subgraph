# Project Title: Tropykus V2 USDM C-Curve Pool

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)

## Description <a name="description"></a>

This project is a subgraph designed to query the USDC/USDM Liquidity pool using Curve Finance on Polygon. It is built using The Graph protocol, a decentralized protocol for indexing and querying data from blockchains. This is deployed in **Polygon Mainnet**

## Installation <a name="installation"></a>

To install and set up the project, follow the steps below:

1. Clone the repository:
    ```bash
    git clone https://github.com/Tropykus/tropykus-v2-usdm-c-curve-pool
    cd tropykus-v2-usdm-c-curve-pool
    ```

2. Install the dependencies:
    ```bash
    yarn install 
    ```

3. Authenticate with The Graph Studio:
    ```bash
    graph auth --studio <your-auth-key>
    ```

4. Generate the code and build the project:
    ```bash
    graph codegen && graph build
    ```

5. Deploy the project:
    ```bash
    graph deploy --studio tropykus-v2-usdm-c-curve-pool
    ```

## Usage <a name="usage"></a>

Once the project is installed and deployed, you can run queries like the one below:

```graphql
query SwapsByUser($user: String) {
    tokenExchanges(where: { buyer: $user }) {
        tokens_sold
        tokens_bought
        transactionHash
        blockTimestamp
        buyer
        sold_token{
          id
          symbol
          decimals
        }
       bought_token{
        id
        decimals
        symbol
      }
    transactionHash
    blockTimestamp
    }
}
```

To get the bruteDeposits of a user you can use:

```graphql
query UserActivity($user: String)  {
  userActivities(where: {id: $user}) {
    id
    bruteDeposits
    cleanDepositsTimestamp
    depositsAfterCleanTimestamp
    withdrawsAfterCleanTimestamp
  }
}
```

The variables should be like this:

```json
{
  "user": "0x1234..."
}
```

## Updating liquidity pools

In order to update the liquidity pools go check the parameters of networks.staging.json (or production.staging.json)

```json
{
  "network": "matic",
  "address": "0xcD4e41382940F46c2ba7291364b43FdA0F5C2B02",
  "startBlock": 52486279
}
```
Then run the command `npm run build:staging`

It should update the subgraph.yaml file automatically

```yaml
# ...
dataSources:
  - kind: ethereum
    name: CurveStableSwapNG
    network: matic
    source:
      address: "0xcD4e41382940F46c2ba7291364b43FdA0F5C2B02"
      abi: CurveStableSwapNG
      startBlock: 52486279
```      

Authenticate with The Graph Studio:
    `graph auth --studio <your-auth-key>`

Generate the code and build the project:
    `npm run build:staging`

Deploy the project:
    `npm run deploy:staging`

## Deployed pools

### Production

The currently deployed pool is: 0xd8001cE95A13168AA4F7D70b5298962b7cADf6Dd

startBlock: 50625140

It can be queried from here: https://api.studio.thegraph.com/query/46125/tropykus-v2-usdm-c-curve-pool/version/latest

### Staging

The currently deployed pool is: 0xcD4e41382940F46c2ba7291364b43FdA0F5C2B02

startBlock: 52486279

It can be queried from here: https://api.studio.thegraph.com/query/46125/tropykus-v2-usdm-c-st-pool/version/latest