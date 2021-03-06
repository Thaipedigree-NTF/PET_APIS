import web3 from "./Web3";

const address = "0x4e8Fb4c2b4f7653831902fC19574AfaF8175757b";
const abi = [
    {
        type: "constructor",
        stateMutability: "nonpayable",
        payable: false,
        inputs: [
            { type: "string", name: "name", internalType: "string" },
            { type: "string", name: "symbols", internalType: "string" },
            { type: "string", name: "baseURI_", internalType: "string" },
            { type: "address", name: "_AdminRouter", internalType: "address" },
        ],
    },
    {
        type: "event",
        name: "Approval",
        inputs: [
            {
                type: "address",
                name: "owner",
                internalType: "address",
                indexed: true,
            },
            {
                type: "address",
                name: "approved",
                internalType: "address",
                indexed: true,
            },
            {
                type: "uint256",
                name: "tokenId",
                internalType: "uint256",
                indexed: true,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "ApprovalForAll",
        inputs: [
            {
                type: "address",
                name: "owner",
                internalType: "address",
                indexed: true,
            },
            {
                type: "address",
                name: "operator",
                internalType: "address",
                indexed: true,
            },
            {
                type: "bool",
                name: "approved",
                internalType: "bool",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "BlacklistAddress",
        inputs: [
            {
                type: "string",
                name: "types",
                internalType: "string",
                indexed: false,
            },
            {
                type: "address",
                name: "account",
                internalType: "address",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "BlacklistTokenId",
        inputs: [
            {
                type: "string",
                name: "types",
                internalType: "string",
                indexed: false,
            },
            {
                type: "uint256",
                name: "tokenId",
                internalType: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "ChangeBaseURI",
        inputs: [
            {
                type: "string",
                name: "baseURI",
                internalType: "string",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "ChangeOwner",
        inputs: [
            {
                type: "address",
                name: "account",
                internalType: "address",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "MintCards",
        inputs: [
            {
                type: "string",
                name: "namecard",
                internalType: "string",
                indexed: false,
            },
            {
                type: "address",
                name: "account",
                internalType: "address",
                indexed: false,
            },
            {
                type: "uint256",
                name: "level",
                internalType: "uint256",
                indexed: false,
            },
            {
                type: "string",
                name: "types",
                internalType: "string",
                indexed: false,
            },
            {
                type: "string",
                name: "URI",
                internalType: "string",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "SetAdminRouter",
        inputs: [
            {
                type: "address",
                name: "_adminrouter",
                internalType: "address",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "SetRarity",
        inputs: [
            {
                type: "string",
                name: "level1",
                internalType: "string",
                indexed: false,
            },
            {
                type: "string",
                name: "level2",
                internalType: "string",
                indexed: false,
            },
            {
                type: "string",
                name: "level3",
                internalType: "string",
                indexed: false,
            },
            {
                type: "string",
                name: "level4",
                internalType: "string",
                indexed: false,
            },
            {
                type: "string",
                name: "level5",
                internalType: "string",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Transfer",
        inputs: [
            {
                type: "address",
                name: "from",
                internalType: "address",
                indexed: true,
            },
            {
                type: "address",
                name: "to",
                internalType: "address",
                indexed: true,
            },
            {
                type: "uint256",
                name: "tokenId",
                internalType: "uint256",
                indexed: true,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "TransferCards",
        inputs: [
            {
                type: "address",
                name: "from",
                internalType: "address",
                indexed: false,
            },
            {
                type: "address",
                name: "to",
                internalType: "address",
                indexed: false,
            },
            {
                type: "uint256",
                name: "tokenId",
                internalType: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "TransferCharacters",
        inputs: [
            {
                type: "address",
                name: "from",
                internalType: "address",
                indexed: false,
            },
            {
                type: "address",
                name: "to",
                internalType: "address",
                indexed: false,
            },
            {
                type: "uint256",
                name: "tokenId",
                internalType: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "TransferTokenId",
        inputs: [
            {
                type: "address",
                name: "from",
                internalType: "address",
                indexed: false,
            },
            {
                type: "address",
                name: "to",
                internalType: "address",
                indexed: false,
            },
            {
                type: "uint256",
                name: "tokenId",
                internalType: "uint256",
                indexed: false,
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Uri",
        inputs: [
            {
                type: "uint256",
                name: "id",
                internalType: "uint256",
                indexed: true,
            },
        ],
        anonymous: false,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
            {
                type: "address",
                name: "",
                internalType: "contract PetAdminRouter",
            },
        ],
        name: "AdminRouter",
        inputs: [],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "bool", name: "", internalType: "bool" }],
        name: "Blacklist_Address",
        inputs: [{ type: "address", name: "", internalType: "address" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "bool", name: "", internalType: "bool" }],
        name: "Blacklist_tokenIds",
        inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [
            { type: "string", name: "name", internalType: "string" },
            { type: "string", name: "rarity", internalType: "string" },
            { type: "string", name: "types", internalType: "string" },
        ],
        name: "Cards",
        inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "uint256[]", name: "", internalType: "uint256[]" }],
        name: "CardsbyAddress",
        inputs: [{ type: "address", name: "account", internalType: "address" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "uint256[]", name: "", internalType: "uint256[]" }],
        name: "CharactersbyAddress",
        inputs: [{ type: "address", name: "account", internalType: "address" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "uint256[]", name: "", internalType: "uint256[]" }],
        name: "TokenIdbyAddress",
        inputs: [{ type: "address", name: "account", internalType: "address" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "TransferOwner",
        inputs: [
            { type: "address", name: "_address", internalType: "address" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "addBlacklist_Address",
        inputs: [
            { type: "address", name: "_address", internalType: "address" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "addBlacklist_TokenId",
        inputs: [{ type: "uint256", name: "tokenid", internalType: "uint256" }],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "approve",
        inputs: [
            { type: "address", name: "to", internalType: "address" },
            { type: "uint256", name: "tokenId", internalType: "uint256" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
        name: "balanceOf",
        inputs: [{ type: "address", name: "owner", internalType: "address" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "string", name: "", internalType: "string" }],
        name: "baseURI",
        inputs: [],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "burn",
        inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "bool", name: "", internalType: "bool" }],
        name: "exists",
        inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "address", name: "", internalType: "address" }],
        name: "getApproved",
        inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "bool", name: "", internalType: "bool" }],
        name: "isApprovedForAll",
        inputs: [
            { type: "address", name: "owner", internalType: "address" },
            { type: "address", name: "operator", internalType: "address" },
        ],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "mint",
        inputs: [
            { type: "string", name: "namecard", internalType: "string" },
            { type: "address", name: "account", internalType: "address" },
            { type: "uint256", name: "level", internalType: "uint256" },
            { type: "string", name: "types", internalType: "string" },
            { type: "string", name: "URI", internalType: "string" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "string", name: "", internalType: "string" }],
        name: "name",
        inputs: [],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "address", name: "", internalType: "address" }],
        name: "owner",
        inputs: [],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "address", name: "", internalType: "address" }],
        name: "ownerOf",
        inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "revokeBlacklist_Address",
        inputs: [
            { type: "address", name: "_address", internalType: "address" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "revokeBlacklist_TokenId",
        inputs: [{ type: "uint256", name: "tokenid", internalType: "uint256" }],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "safeTransferFrom",
        inputs: [
            { type: "address", name: "from", internalType: "address" },
            { type: "address", name: "to", internalType: "address" },
            { type: "uint256", name: "tokenId", internalType: "uint256" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "safeTransferFrom",
        inputs: [
            { type: "address", name: "from", internalType: "address" },
            { type: "address", name: "to", internalType: "address" },
            { type: "uint256", name: "tokenId", internalType: "uint256" },
            { type: "bytes", name: "_data", internalType: "bytes" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "setAdminRouter",
        inputs: [
            { type: "address", name: "_AdminRouter", internalType: "address" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "setApprovalForAll",
        inputs: [
            { type: "address", name: "to", internalType: "address" },
            { type: "bool", name: "approved", internalType: "bool" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "setBaseURI",
        inputs: [{ type: "string", name: "baseURI_", internalType: "string" }],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "setRarity",
        inputs: [
            { type: "string", name: "level1", internalType: "string" },
            { type: "string", name: "level2", internalType: "string" },
            { type: "string", name: "level3", internalType: "string" },
            { type: "string", name: "level4", internalType: "string" },
            { type: "string", name: "level5", internalType: "string" },
        ],
        constant: false,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "bool", name: "", internalType: "bool" }],
        name: "supportsInterface",
        inputs: [
            { type: "bytes4", name: "interfaceId", internalType: "bytes4" },
        ],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "string", name: "", internalType: "string" }],
        name: "symbol",
        inputs: [],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "string", name: "", internalType: "string" }],
        name: "tokenURI",
        inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "view",
        payable: false,
        outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
        name: "totalSupply",
        inputs: [],
        constant: true,
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        payable: false,
        outputs: [],
        name: "transferFrom",
        inputs: [
            { type: "address", name: "from", internalType: "address" },
            { type: "address", name: "to", internalType: "address" },
            { type: "uint256", name: "tokenId", internalType: "uint256" },
        ],
        constant: false,
    },
];

export default new web3.eth.Contract(abi, address);
