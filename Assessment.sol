// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public contract_owner;
    uint256 public contract_balance;

    event Deposit(uint256 deposit_amount);
    event Withdraw(uint256 withdraw_amount);

    constructor(uint init_balance) payable {
        contract_owner = payable(msg.sender);
        contract_balance = init_balance;
    }

    function get_balance() public view returns(uint256){
        return contract_balance;
    }

    function deposit(uint256 deposit_amount) public payable {
        uint previous_balance = contract_balance;

        require(msg.sender == contract_owner, "You are not the owner of this account");

        contract_balance += deposit_amount;

        assert(contract_balance == previous_balance + deposit_amount);

        emit Deposit(deposit_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdraw_amount);

    function withdraw(uint256 withdraw_amount) public {
        require(msg.sender == contract_owner, "You are not the owner of this account");
        uint previous_balance = contract_balance;
        if (contract_balance < withdraw_amount) {
            revert InsufficientBalance({
                balance: contract_balance,
                withdraw_amount: withdraw_amount
            });
        }
        contract_balance -= withdraw_amount;

        assert(contract_balance == (previous_balance - withdraw_amount));
    
        emit Withdraw(withdraw_amount);
    }
}
