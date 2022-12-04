/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  DefaultCallbackHandler,
  DefaultCallbackHandlerInterface,
} from "../../../../../@gnosis.pm/safe-contracts/contracts/handler/DefaultCallbackHandler";

const _abi = [
  {
    inputs: [],
    name: "NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "tokensReceived",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608080604052346100165761066a908161001c8239f35b600080fdfe60806040908082526004918236101561001757600080fd5b600091823560e01c90816223de291461048057816301ffc9a71461038e57508063150b7a0214610300578063a3f4df7e1461027b578063bc197c81146101ba578063f23a6e61146101295763ffa1ad741461007157600080fd5b3461012557817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610125578051918183019083821067ffffffffffffffff8311176100f957506100f593508152600582527f312e302e300000000000000000000000000000000000000000000000000000006020830152519182918261059d565b0390f35b806041867f4e487b71000000000000000000000000000000000000000000000000000000006024945252fd5b5080fd5b5090346101b75760a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b757610162610524565b5061016b61054c565b506084359067ffffffffffffffff82116101b7575060209261018f9136910161056f565b5050517ff23a6e61000000000000000000000000000000000000000000000000000000008152f35b80fd5b5090346101b75760a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b7576101f3610524565b506101fc61054c565b5067ffffffffffffffff906044358281116101255761021e9036908601610603565b5050606435828111610125576102379036908601610603565b50506084359182116101b757506020926102539136910161056f565b5050517fbc197c81000000000000000000000000000000000000000000000000000000008152f35b503461012557817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610125578051918183019083821067ffffffffffffffff8311176100f957506100f593508152601882527f44656661756c742043616c6c6261636b2048616e646c657200000000000000006020830152519182918261059d565b5090346101b75760807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b757610339610524565b5061034261054c565b506064359067ffffffffffffffff82116101b757506020926103669136910161056f565b5050517f150b7a02000000000000000000000000000000000000000000000000000000008152f35b8390853461047c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261047c57357fffffffff00000000000000000000000000000000000000000000000000000000811680910361047c57602092507f4e2312e0000000000000000000000000000000000000000000000000000000008114908115610452575b8115610428575b5015158152f35b7f01ffc9a70000000000000000000000000000000000000000000000000000000091501483610421565b7f150b7a02000000000000000000000000000000000000000000000000000000008114915061041a565b8280fd5b8385346101255760c07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610125576104b9610524565b506104c261054c565b5060443573ffffffffffffffffffffffffffffffffffffffff8116036101255767ffffffffffffffff9060843582811161052057610503903690830161056f565b505060a43591821161047c5761051b9136910161056f565b505080f35b8380fd5b6004359073ffffffffffffffffffffffffffffffffffffffff8216820361054757565b600080fd5b6024359073ffffffffffffffffffffffffffffffffffffffff8216820361054757565b9181601f840112156105475782359167ffffffffffffffff8311610547576020838186019501011161054757565b60208082528251818301819052939260005b8581106105ef575050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006040809697860101520116010190565b8181018301518482016040015282016105af565b9181601f840112156105475782359167ffffffffffffffff8311610547576020808501948460051b0101116105475756fea264697066735822122085525338a600824fefe1c8fd8dc3e5d2457cf880695bbeaa0bb2cf8973712fba64736f6c63430008110033";

type DefaultCallbackHandlerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DefaultCallbackHandlerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DefaultCallbackHandler__factory extends ContractFactory {
  constructor(...args: DefaultCallbackHandlerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DefaultCallbackHandler> {
    return super.deploy(overrides || {}) as Promise<DefaultCallbackHandler>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DefaultCallbackHandler {
    return super.attach(address) as DefaultCallbackHandler;
  }
  override connect(signer: Signer): DefaultCallbackHandler__factory {
    return super.connect(signer) as DefaultCallbackHandler__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DefaultCallbackHandlerInterface {
    return new utils.Interface(_abi) as DefaultCallbackHandlerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DefaultCallbackHandler {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DefaultCallbackHandler;
  }
}