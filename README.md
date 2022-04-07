## Tokenomics

- Land, renting
- Player - has ipfs picture + playables, + name + items, its free
- Clans - has ipfs picture, has players, can delegate your erc20 votes there
- Playables - more you have, less coin you need in game to build army


# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```



```
 yarn hardhat --network "rinkeby" playables:token:add --id 1 --name "Knight" --description "Warrior" --playables "0xC91a8C5C72d0255576a9C59fd2bc897D403D8eaF" --royalty "0xC91a8C5C72d0255576a9C59fd2bc897D403D8eaF" --price 0.01 --supply 800
```
