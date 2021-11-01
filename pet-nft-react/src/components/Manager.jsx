import React, { useEffect, useState } from "react";
import web3 from "./Web3";
import ERC20 from "./ERC20";
import ERC721 from "./ERC721";
import "../scss/Manager.scss";

function Manager() {
    const [address, setAddress] = useState("");
    const [balancePET, setBalancePET] = useState(0);
    const PricePET = 400 * 10 ** 8;
    const [chainId, setChainId] = useState(0);
    const mainchain = 96;
    const testnetchain = 25925;
    const AddressPay = "0x1AcEE889F30fcbF514718a252B35Ee72FC15d082";
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            fetch();
            checkProvider();
        }
    });

    async function checkProvider() {
        setChainId(web3.currentProvider.networkVersion);
    }

    window.ethereum.on("accountsChanged", function (accounts) {
        console.clear();
        setAddress(accounts[0]);
        setChainId(web3.currentProvider.networkVersion);
    });

    window.ethereum.on("networkChanged", function (chainId) {
        console.clear();
        setChainId(chainId);
    });

    useEffect(() => {
        if (typeof window.ethereum === "undefined") {
            console.error("Error Not Found Metamask .");
        }
    }, []);

    async function fetch() {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            return <h1>ERROR</h1>;
        }
        setAddress(accounts[0]);
        setChainId(web3.currentProvider.networkVersion);

        if (web3.currentProvider.networkVersion === 25925) {
            let BalancePet = await ERC20.methods.balanceOf(accounts[0]).call();
            setBalancePET(BalancePet);
        }
    }

    async function approve_onclick(types, value) {
        if (types === "Characters") {
            if (balancePET >= PricePET) {
                console.log("Starting Payment...");
                try {
                    ERC20.methods
                        .transfer(AddressPay, PricePET)
                        .send({
                            from: address,
                        })
                        .on("sending", () => {
                            console.log("Sending..."); // กำลังส่ง หลังจาก ส่ง แต่รอการกดทำ ธุรกรรม
                        })
                        .on("sent", () => {
                            console.log("sent"); // ส่ง
                        })
                        .on("transactionHash", (tx) => {
                            console.log("transactionHash", tx); // กดเริ่มทำธุรกรรม
                        })
                        .on("receipt", function (receipt) {
                            console.log(receipt.transactionHash); // เสร็จสิ้น
                        })
                        .on("error", (error, receipt) => {
                            console.log(`Error: ${error.message}`); // เกิด Error ตางๆ
                        });
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error(
                    `Error Balance of User Don't Enough Need ${
                        PricePET / 10 ** 8
                    }`
                );

                return (
                    <h4>{`Error Balance of User Don't Enough Need ${
                        PricePET / 10 ** 8
                    }`}</h4>
                );
            }
        } else if (types === "Cards") {
            if (chainId === 25925) {
                let balanceuser =
                    (await web3.eth.getBalance(address)) / 10 ** 18;

                if (!value) {
                    return console.error("Error Parameter Value.");
                }

                if (value) {
                    if (balanceuser >= value) {
                        await web3.eth
                            .sendTransaction({
                                to: AddressPay,
                                from: address,
                                value: web3.utils.toWei(String(value), "ether"), // ไม่รวมค่าแก๊ส
                            })
                            .on("sending", () => {
                                console.log("Sending..."); // กำลังส่ง หลังจาก ส่ง แต่รอการกดทำ ธุรกรรม
                            })
                            .on("sent", () => {
                                console.log("sent"); // ส่ง
                            })
                            .on("transactionHash", (tx) => {
                                console.log("transactionHash", tx); // กดเริ่มทำธุรกรรม
                            })
                            .on("receipt", function (receipt) {
                                console.log(receipt.transactionHash); // เสร็จสิ้น
                            })
                            .on("error", (error, receipt) => {
                                console.log(`Error: ${error.message}`); // เกิด Error ตางๆ
                            });
                    } else {
                        console.error(
                            `Error Balance of User Don't Enough Need ${value}`
                        );

                        return (
                            <h4>
                                {`Error Balance of User Don't Enough Need ${value}`}
                            </h4>
                        );
                    }
                }
            } else {
            }
        } else {
            console.error("Error Parameters");
        }
    }

    function True_Ether() {
        if (String(chainId) === String(testnetchain)) {
            if (balancePET >= PricePET) {
                return (
                    <button onClick={() => approve_onclick("Cards")}>
                        Start Random Cards
                    </button>
                );
            } else {
                return (
                    <span>{`ERROR : Your Balance of PET has ${
                        balancePET / 10 ** 8
                    } But We need ${PricePET / 10 ** 8} PET
                `}</span>
                );
            }
        } else {
            return <h3>{`Error ChainId ${chainId}`}</h3>;
        }
    }

    return (
        <div className="Manager">
            {typeof window.ethereum !== "undefined" ? (
                True_Ether()
            ) : (
                <h1>Waiting Connect...</h1>
            )}
        </div>
    );
}

export default Manager;
