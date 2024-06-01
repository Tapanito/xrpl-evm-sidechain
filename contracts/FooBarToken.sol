// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FooBarToken is ERC20 {
    constructor() ERC20("Foo", "FooBarToken") {}

    function buy() public payable {
        require(msg.value > 0, "You must send some XRP to get FooBar");
        _mint(msg.sender, msg.value);
    }
}
