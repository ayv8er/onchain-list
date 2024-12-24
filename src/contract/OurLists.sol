// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.25;

contract OurLists {
    struct List {
        bool isInitialized;
        string[] items;
        mapping(string => bool) itemExists;
    }

    string[] private listNames;
    mapping(string => List) private lists;
    mapping(address => bool) private owners;

    constructor() {
        owners[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(owners[msg.sender], "Not an owner");
        _;
    }

    modifier listExists(string memory listName) {
        require(lists[listName].isInitialized, "List does not exist");
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

    function createList(string memory listName) public onlyOwner {
        require(!lists[listName].isInitialized, "List already exists");
        lists[listName].isInitialized = true;
        listNames.push(listName);
    }

    function getList(string memory listName) public view listExists(listName) returns (string[] memory) {
        return lists[listName].items;
    }

    function getListNames() public view returns (string[] memory) {
        return listNames;
    }

    function deleteList(string memory listName) public onlyOwner listExists(listName) {
        for (uint8 i = 0; i < lists[listName].items.length; i++) {
            lists[listName].itemExists[lists[listName].items[i]] = false;
        }
        delete lists[listName];

        for (uint8 i = 0; i < listNames.length; i++) {
            if (keccak256(abi.encodePacked(listNames[i])) == keccak256(abi.encodePacked(listName))) {
                listNames[i] = listNames[listNames.length - 1];
                listNames.pop();
                break;
            }
        }
    }

    function _addItem(string memory listName, string memory _item) internal {
        require(!lists[listName].itemExists[_item], "Item already exists");
        lists[listName].items.push(_item);
        lists[listName].itemExists[_item] = true;
    }

    function addItems(string memory listName, string[] memory _items) public onlyOwner listExists(listName) {
        for (uint8 i = 0; i < _items.length; i++) {
            _addItem(listName, _items[i]);
        }
    }

    function _deleteItem(string memory listName, string memory _item) internal {
        for (uint8 i = 0; i < lists[listName].items.length; i++) {
            if (keccak256(abi.encodePacked(lists[listName].items[i])) == keccak256(abi.encodePacked(_item))) {
                lists[listName].items[i] = lists[listName].items[lists[listName].items.length - 1];
                lists[listName].items.pop();
                lists[listName].itemExists[_item] = false;
                break;
            }
        }
    }

    function deleteItems(string memory listName, string[] memory _items) public onlyOwner listExists(listName) {
        for (uint8 i = 0; i < _items.length; i++) {
            _deleteItem(listName, _items[i]);
        }
    }
}