import {ethers} from "ethers";

export const ContractEvent:{[key:string]:string} =  {
    //20  721
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" : "Transfer(address,address,uint256)",
    "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925" : "Approval(address,address,uint256)",
    // "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31" : "ApprovalForAll(address,address,bool)",
    // 777
    "0x2fe5be0146f74c5bce36c0b80911af6c7d86ff27e89d5cfa61fc681327954e5d" : "Minted(address,address,uint256,bytes,bytes)",
    "0xa78a9be3a7b862d26933ad85fb11d80ef66b8f972d7cbba06621d583943a4098" : "Burned(address,address,uint256,bytes,bytes)",
    "0xf4caeb2d6ca8932a215a353d0703c326ec2d81fc68170f320eb2ab49e9df61f9" : "AuthorizedOperator(address,address)",
    "0x50546e66e5f44d728365dc3908c63bc5cfeeab470722c1677e3073a6ac294aa1" : "RevokedOperator(address,address)",
    // 1155

    "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62" : "TransferSingle(address,address,address,uint256,uint256)",
    "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb" : "TransferBatch(address,address,address,uint256[],uint256[])",
    "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31" : "ApprovalForAll(address,address,bool)",
    "0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b" : "URI(string,uint256)",
}

