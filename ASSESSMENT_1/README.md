# ETH-AVAX MODULE FIRST ASSESSMENT

This is a Limiter contract that implements the three error methods, the `revert()`, `require()` and `assert()` statements. It is an assessment meant to demonstrate completing metacrafter's ETH-AVAX assessment.

## Description

This contract contains two functions that makes use of the `assert()`, `require()` and `revert()` statements. The first function named `testRevert()` checks that a number passed as a parameter cannot be less than the maxNumber set in the contract. maxNumber is 25.
The second function `testRequireAndAssert()` checks that a number passed as a parameter is set to a newNumber state variable only if the number is greater than or equal to 10. An assert check is then done on the newNumber global variable.

## Functions

- testRevert(uint _num)
- testRequireAndAssert(uint _num)
