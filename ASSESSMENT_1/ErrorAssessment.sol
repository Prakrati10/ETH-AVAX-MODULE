// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Limiter {
    uint public constant maxNumber = 25;
    uint public newNumber;

    function testAssert(uint _num) public pure {
        assert(_num < maxNumber);
        revert("Maximum of 25 expected");
    }

    function testRequire(uint _num) public {
        require(_num > 10, "Minimum of 11 expected");
        // Only get to this line if the parameter _num is greater than 10
        // Set the newNumber to the number passed in as a parameter
        newNumber = newNumber + _num;
    }
}
