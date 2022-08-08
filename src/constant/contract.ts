import {ethers} from "ethers";

export const ContractEvent: { [key: string]: { method:string,parameter:{name:string,type:string}[] } } = {
    "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {
        "method": "Approval",
        "parameter": [{"name": "owner", "type": "address"}, {"name": "approved", "type": "address"}, {
            "name": "tokenId",
            "type": "uint256"
        }]
    },
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
        "method": "Transfer",
        "parameter": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {
            "name": "tokenId",
            "type": "uint256"
        }]
    },
    "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31": {
        "method": "ApprovalForAll",
        "parameter": [{"name": "owner", "type": "address"}, {
            "name": "operator",
            "type": "address"
        }, {"name": "approved", "type": "bool"}]
    }
}


