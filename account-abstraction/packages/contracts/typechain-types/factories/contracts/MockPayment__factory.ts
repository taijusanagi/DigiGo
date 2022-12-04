/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  MockPayment,
  MockPaymentInterface,
} from "../../contracts/MockPayment";

const _abi = [
  {
    inputs: [],
    name: "pay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608080604052346100155760bf908161001b8239f35b600080fdfe6004361015600c57600080fd5b6000803560e01c631b9265b814602157600080fd5b807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126086578054348101809111605957815580f35b6024827f4e487b710000000000000000000000000000000000000000000000000000000081526011600452fd5b80fdfea2646970667358221220a0c64d0193a08bddbd7265e13c1bc620e1423ae6183b7cb9413217d935cf97c464736f6c63430008110033";

type MockPaymentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockPaymentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockPayment__factory extends ContractFactory {
  constructor(...args: MockPaymentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockPayment> {
    return super.deploy(overrides || {}) as Promise<MockPayment>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockPayment {
    return super.attach(address) as MockPayment;
  }
  override connect(signer: Signer): MockPayment__factory {
    return super.connect(signer) as MockPayment__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockPaymentInterface {
    return new utils.Interface(_abi) as MockPaymentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockPayment {
    return new Contract(address, _abi, signerOrProvider) as MockPayment;
  }
}