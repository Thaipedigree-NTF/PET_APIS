const express = require("express");
const app = express();
const Web3 = require("web3");
require("dotenv").config();
const walletpass = process.env.Wallet;
const config = require("../json/NFT.json");
var HDWalletProvider = require("truffle-hdwallet-provider");
var provider_testnet = new HDWalletProvider(
    walletpass,
    "https://rpc-testnet.bitkubchain.io"
);
var provider_mainnet = new HDWalletProvider(
    walletpass,
    "https://rpc.bitkubchain.io"
);

const web3_testnet = new Web3(provider_testnet);
const web3_mainnet = new Web3(provider_mainnet);

const NFT_Contract_testnet = new web3_testnet.eth.Contract(
    config,
    "0xFb06732565FFbA5Fdb2E82F2B5ba83A473aFde8C"
);

app.get("/api/map", function (req, res) {
    res.sendStatus(200);
});

app.get("/api/map/testnet/:_address", async function (req, res) {
    try {
        const _address = req.params._address;

        //! The First way (Very Slow)
        // console.log(_address);
        // var nextId = await NFT_Contract.methods.nextId().call();
        // console.log(nextId);
        // if (nextId > 0) {
        //     let tokenscount = await NFT_Contract.methods
        //         .balanceOf(_address)
        //         .call();

        //     let tokens = [];
        //     let count_stop = 0;

        //     for (let index = 0; index < nextId; index++) {
        //         let ownerof = await NFT_Contract.methods.ownerOf(index).call();

        //         if (ownerof === _address) {
        //             count_stop++;
        //             tokens.push(index);

        //             if (count_stop == tokenscount) {
        //                 break;
        //             }
        //         }
        //     }
        //     res.status(200).send(tokens);
        //  } else {
        //     res.status(200).send("None Length of Data");
        // }
        //!

        // //! Second way (Faster than)
        let readtokenIds = await NFT_Contract_testnet.methods
            .TokenIdbyAddress(_address)
            .call();
        res.status(200).send(readtokenIds);
        //!
    } catch (e) {
        console.log(e);
        res.status(400).send({
            status: 400,
            message: "Error Invaild Address",
        });
    }
});

app.post("/api/testnet/mintcard", async function (req, res) {
    if (
        req.body.namecard &&
        req.body.account &&
        req.body.level &&
        req.body.types &&
        req.body.URI
    ) {
        var namecard = req.body.namecard;
        var account = req.body.account;
        var types = req.body.types;
        var level = req.body.level;
        var URI = req.body.URI;
        let replyer = "";
        await NFT_Contract_testnet.methods
            .mintCard(
                String(namecard),
                String(account),
                String(level),
                String(types),
                String(URI)
            )
            .send({
                from: "0x0eD23a597f67716916b259D65D13e156a6BF3CC4", //? address you need to use for mint need have permission SuperAdmins and need to use private key for auth //
                chainId: 25925,
            })
            .then(console.log)
            .catch((e) => {
                return res.status(500).send(e.message);
            });

        res.status(200).send("Success");
    } else {
        res.status(404).send("Error Parameters .");
    }
});

module.exports = app;
