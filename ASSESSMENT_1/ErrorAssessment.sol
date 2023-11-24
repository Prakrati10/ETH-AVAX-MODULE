// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Limiter {
    uint public constant maxNumber = 25;
    uint public newNumber;

    function testAssert(uint _num) public pure {
        if (_num > maxNumber) {
            revert("Maximum of 25 expected");
        }
    }

    function testRequire(uint _num) public {
        require(_num >= 10, "Minimum of 10 expected");
        newNumber = newNumber + _num;
        // This function will fail the second time it is ran, because the assert will fail the second time
        assert(newNumber == _num);
    }
}
