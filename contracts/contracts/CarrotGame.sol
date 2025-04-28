// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CarrotGame {
    event Planted(address indexed player, uint256 plotId);
    event Watered(address indexed player, uint256 plotId);
    event Harvested(address indexed player, uint256 plotId, uint256 carrots);

    mapping(address => uint256) public carrotBalance;

    function plantCarrot(uint256 plotId) external {
        // your planting logic…
        emit Planted(msg.sender, plotId);
    }

    function waterCarrot(uint256 plotId) external {
        // your watering logic…
        emit Watered(msg.sender, plotId);
    }

    function harvestCarrot(uint256 plotId) external {
        // simple example: give 1 carrot per harvest
        carrotBalance[msg.sender] += 1;
        emit Harvested(msg.sender, plotId, 1);
    }

    function getCarrotCount(address player) external view returns (uint256) {
        return carrotBalance[player];
    }
}