export const LitListContractAddress = "0x8313257886a1d9fde79cf5e9d4ece8d1cc53180b";

export const LitListContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "encryptedListName",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "encryptedString",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ciphertext",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataToEncryptHash",
						"type": "string"
					}
				],
				"internalType": "struct LitList.EncryptedData[]",
				"name": "_items",
				"type": "tuple[]"
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
				"components": [
					{
						"internalType": "string",
						"name": "encryptedString",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ciphertext",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataToEncryptHash",
						"type": "string"
					}
				],
				"internalType": "struct LitList.EncryptedData",
				"name": "listNameData",
				"type": "tuple"
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
				"name": "encryptedListName",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "encryptedString",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ciphertext",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataToEncryptHash",
						"type": "string"
					}
				],
				"internalType": "struct LitList.EncryptedData[]",
				"name": "_items",
				"type": "tuple[]"
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
				"name": "encryptedListName",
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
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "removeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "encryptedListName",
				"type": "string"
			}
		],
		"name": "getList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "encryptedString",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ciphertext",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataToEncryptHash",
						"type": "string"
					}
				],
				"internalType": "struct LitList.EncryptedData[]",
				"name": "",
				"type": "tuple[]"
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
				"components": [
					{
						"internalType": "string",
						"name": "encryptedString",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ciphertext",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataToEncryptHash",
						"type": "string"
					}
				],
				"internalType": "struct LitList.EncryptedData[]",
				"name": "",
				"type": "tuple[]"
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
	}
];