// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.26;

contract LitList {
    struct List {
        EncryptedData data;
        bool isInitialized;
        EncryptedData[] items;
        mapping(string => uint) itemIndex;
    }

    struct EncryptedData {
        string encryptedString;
        string ciphertext;
        string dataToEncryptHash;
    }

    EncryptedData[] private listNames;
    mapping(string => uint) private listNameIndex;
    mapping(string => List) private lists;
    mapping(address => bool) private owners;

    constructor() {
        owners[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(owners[msg.sender], "Not an owner");
        _;
    }

    modifier listExists(string calldata encryptedListName) {
        require(bytes(encryptedListName).length > 0, "List name cannot be empty");
        require(lists[encryptedListName].isInitialized, "List does not exist");
        _;
    }

    modifier nonEmptyArray(EncryptedData[] calldata items) {
        require(items.length > 0, "Array cannot be empty");
        _;
    }

    function addOwner(address _newOwner) public onlyOwner {
        owners[_newOwner] = true;
    }

    function removeOwner(address _owner) public onlyOwner {
        owners[_owner] = false;
    }

    function isOwner(address _address) public view returns (bool) {
        return owners[_address];
    }

    function createList(EncryptedData calldata listNameData) 
        public 
        onlyOwner 
    {
        require(bytes(listNameData.encryptedString).length > 0, "List name cannot be empty");
        require(!lists[listNameData.encryptedString].isInitialized, "List already exists");
        string memory encryptedString = listNameData.encryptedString;
        lists[encryptedString].data = listNameData;
        lists[encryptedString].isInitialized = true;
        listNames.push(listNameData);
        listNameIndex[encryptedString] = listNames.length - 1;
    }

    function getListNames() public view returns (EncryptedData[] memory) {
        return listNames;
    }

    function getList(string calldata encryptedListName) 
        public 
        view 
        listExists(encryptedListName) 
        returns (EncryptedData[] memory)
    {
        return lists[encryptedListName].items;
    }

    function deleteList(string calldata encryptedListName) 
        public 
        onlyOwner 
        listExists(encryptedListName) 
    {
        uint listLength = listNames.length;
        uint index = listNameIndex[encryptedListName];
        require(index < listLength, "Invalid index or no lists to delete");
        listNames[index] = listNames[listLength - 1];
        listNameIndex[listNames[index].encryptedString] = index;
        listNames.pop();
        delete listNameIndex[encryptedListName];
        delete lists[encryptedListName];
    }

    function _addItem(string calldata encryptedListName, EncryptedData calldata _item) internal {
        require(bytes(_item.encryptedString).length > 0, "Item data cannot be empty");
        List storage list = lists[encryptedListName];
        list.itemIndex[_item.encryptedString] = list.items.length;
        list.items.push(_item);
    }

    function addItems(string calldata encryptedListName, EncryptedData[] calldata _items) 
        public 
        onlyOwner 
        nonEmptyArray(_items) 
        listExists(encryptedListName) 
    {
        for (uint256 i = 0; i < _items.length; i++) {
            _addItem(encryptedListName, _items[i]);
        }
    }

    function _deleteItem(string calldata encryptedListName, EncryptedData calldata _item) internal {
        List storage list = lists[encryptedListName];
        uint index = list.itemIndex[_item.encryptedString];
        uint lastIndex = list.items.length - 1;

        if (index != lastIndex) {
            list.items[index] = list.items[lastIndex];
            list.itemIndex[list.items[index].encryptedString] = index;
        }

        list.items.pop();
        delete list.itemIndex[_item.encryptedString];
    }

    function deleteItems(string calldata encryptedListName, EncryptedData[] calldata _items) 
        public 
        onlyOwner
        nonEmptyArray(_items)
        listExists(encryptedListName) 
    {
        for (uint256 i = 0; i < _items.length; i++) {
            _deleteItem(encryptedListName, _items[i]);
        }
    }
}