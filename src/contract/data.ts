export const ourListsContractAddress = "0x3b4fb56d2388e32d31229c77bb3184710d06bc7a";

export const ourListsContractABI = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "listName",
              "type": "string"
          },
          {
              "internalType": "string[]",
              "name": "_items",
              "type": "string[]"
          }
      ],
      "name": "addItems",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_newOwner",
              "type": "address"
          }
      ],
      "name": "addOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "listName",
              "type": "string"
          }
      ],
      "name": "createList",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "listName",
              "type": "string"
          },
          {
              "internalType": "string[]",
              "name": "_items",
              "type": "string[]"
          }
      ],
      "name": "deleteItems",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "listName",
              "type": "string"
          }
      ],
      "name": "deleteList",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "listName",
              "type": "string"
          }
      ],
      "name": "getList",
      "outputs": [
          {
              "internalType": "string[]",
              "name": "",
              "type": "string[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getListNames",
      "outputs": [
          {
              "internalType": "string[]",
              "name": "",
              "type": "string[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_address",
              "type": "address"
          }
      ],
      "name": "isOwner",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
          }
      ],
      "name": "removeOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
];