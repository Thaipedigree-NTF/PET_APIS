import React, { useEffect, useState } from "react";
import web3 from "./Web3";
import ERC20 from "./ERC20";
import ERC721 from "./ERC721";
import "../scss/Manager.scss";

function Manager() {
    const [address, setAddress] = useState("");
    const [balancePET, setBalancePET] = useState(0);
    const PricePET = 400 * 10 ** 8;
    const AddressPay = "0x1AcEE889F30fcbF514718a252B35Ee72FC15d082";
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            fetch();
        }
    });

    window.ethereum.on("accountsChanged", function (accounts) {
        setAddress(accounts[0]);
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

        let BalancePet = await ERC20.methods.balanceOf(accounts[0]).call();
        setBalancePET(BalancePet);
    }

    async function approve_onclick(types, value) {
        if (types === "Cards") {
            if (balancePET >= PricePET) {
                console.log("Starting Payment...");
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
            } else {
                console.error(
                    `Error Balance of User Don't Enough Need ${
                        PricePET / 10 ** 8
                    }`
                );

                <h4>{`Error Balance of User Don't Enough Need ${
                    PricePET / 10 ** 8
                }`}</h4>;
            }
        } else if (types === "Characters") {
            let balanceuser = (await web3.eth.getBalance(address)) / 10 ** 18;
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

                    <h4>
                        {`Error Balance of User Don't Enough Need ${value}`}
                    </h4>;
                }
            }
        } else {
            console.error("Error Parameters");
            <h4>Error Parameters</h4>;
        }
    }

    function True_Ether() {
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
