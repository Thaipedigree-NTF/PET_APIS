const express = require("express");
const app = express();
const Web3 = require("web3");
const web3 = new Web3(`https://rpc-testnet.bitkubchain.io`);
const config = require("../json/NFT.json");
const NFT_Contract = new web3.eth.Contract(
    config,
    "0x47a2D860F92C297931AcB637E435709CCA092288"
);
const { Interface } = require("@ethersproject/abi");

app.get("/map", function (req, res) {
    res.sendStatus(200);
});

app.get("/map/:_address", async function (req, res) {
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

        //! Second way (Faster than)
        let readtokenIds = await NFT_Contract.methods
            ._TokenIdbyAddress(_address)
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

module.exports = app;
