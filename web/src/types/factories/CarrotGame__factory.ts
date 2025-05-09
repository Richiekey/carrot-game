/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { CarrotGame, CarrotGameInterface } from "../CarrotGame";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "plotId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "carrots",
        type: "uint256",
      },
    ],
    name: "Harvested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "plotId",
        type: "uint256",
      },
    ],
    name: "Planted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "plotId",
        type: "uint256",
      },
    ],
    name: "Watered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "carrotBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "getCarrotCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "plotId",
        type: "uint256",
      },
    ],
    name: "harvestCarrot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "plotId",
        type: "uint256",
      },
    ],
    name: "plantCarrot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "plotId",
        type: "uint256",
      },
    ],
    name: "waterCarrot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b506104e08061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063014e33d51461005c5780631227ebc91461008c578063535d73c8146100bc5780639e0eb499146100d8578063edfbcc6e146100f4575b600080fd5b6100766004803603810190610071919061031f565b610110565b6040516100839190610365565b60405180910390f35b6100a660048036038101906100a1919061031f565b610128565b6040516100b39190610365565b60405180910390f35b6100d660048036038101906100d191906103ac565b610170565b005b6100f260048036038101906100ed91906103ac565b61021a565b005b61010e600480360381019061010991906103ac565b61026b565b005b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546101bf9190610408565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f81ca9b2c230070eaa84787556b1aaf18bf1e2f07ea5d3dae4819db77a1a5b22482600160405161020f929190610481565b60405180910390a250565b3373ffffffffffffffffffffffffffffffffffffffff167f9bfe07e939b4fe99d01b233e70f04a5b54704da5d9a2346520880f563b5e6f7a826040516102609190610365565b60405180910390a250565b3373ffffffffffffffffffffffffffffffffffffffff167f32f5e0acabbf1e98c0b1c2f1918ca1e55ea0aaa97566732eadda454420449dcc826040516102b19190610365565b60405180910390a250565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102ec826102c1565b9050919050565b6102fc816102e1565b811461030757600080fd5b50565b600081359050610319816102f3565b92915050565b600060208284031215610335576103346102bc565b5b60006103438482850161030a565b91505092915050565b6000819050919050565b61035f8161034c565b82525050565b600060208201905061037a6000830184610356565b92915050565b6103898161034c565b811461039457600080fd5b50565b6000813590506103a681610380565b92915050565b6000602082840312156103c2576103c16102bc565b5b60006103d084828501610397565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006104138261034c565b915061041e8361034c565b9250828201905080821115610436576104356103d9565b5b92915050565b6000819050919050565b6000819050919050565b600061046b6104666104618461043c565b610446565b61034c565b9050919050565b61047b81610450565b82525050565b60006040820190506104966000830185610356565b6104a36020830184610472565b939250505056fea2646970667358221220fcdb5abcbc5c9042d0ec2ea9fdbfe768f7f347a15031210e6fc58635f8539a3c64736f6c634300081c0033";

type CarrotGameConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CarrotGameConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CarrotGame__factory extends ContractFactory {
  constructor(...args: CarrotGameConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      CarrotGame & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CarrotGame__factory {
    return super.connect(runner) as CarrotGame__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CarrotGameInterface {
    return new Interface(_abi) as CarrotGameInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): CarrotGame {
    return new Contract(address, _abi, runner) as unknown as CarrotGame;
  }
}
