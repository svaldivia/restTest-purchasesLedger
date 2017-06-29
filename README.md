# restTest-purchasesLedger
A purchases ledger web app that connects to an external API. Made for Bench's coding challenge. It was built according to these [guidelines](http://resttest.bench.co/front-end).

## Contents

* [Improvements](#improvements)
* [Running Locally](#running-locally)
* [Run Tests](#run-tests)

## Improvements
- Handle large loads of pages (potentially add pagination component).
- Add tasks to build a `dist` folder for deployed version.

## Running Locally

Before you start make sure that you have the following installed:
- Node.js
- npm
- bower
- sass
- karma

### Steps

```sh
$ git clone git@github.com:svaldivia/restTest-purchasesLedger.git
$ cd restTest-purchasesLedger
$ npm install
$ bower install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Run Tests

```sh
$ npm run test
```
