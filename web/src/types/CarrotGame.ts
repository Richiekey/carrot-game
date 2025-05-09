/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface CarrotGameInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "carrotBalance"
      | "getCarrotCount"
      | "harvestCarrot"
      | "plantCarrot"
      | "waterCarrot"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "Harvested" | "Planted" | "Watered"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "carrotBalance",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getCarrotCount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "harvestCarrot",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "plantCarrot",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "waterCarrot",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "carrotBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCarrotCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "harvestCarrot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "plantCarrot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "waterCarrot",
    data: BytesLike
  ): Result;
}

export namespace HarvestedEvent {
  export type InputTuple = [
    player: AddressLike,
    plotId: BigNumberish,
    carrots: BigNumberish
  ];
  export type OutputTuple = [player: string, plotId: bigint, carrots: bigint];
  export interface OutputObject {
    player: string;
    plotId: bigint;
    carrots: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PlantedEvent {
  export type InputTuple = [player: AddressLike, plotId: BigNumberish];
  export type OutputTuple = [player: string, plotId: bigint];
  export interface OutputObject {
    player: string;
    plotId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WateredEvent {
  export type InputTuple = [player: AddressLike, plotId: BigNumberish];
  export type OutputTuple = [player: string, plotId: bigint];
  export interface OutputObject {
    player: string;
    plotId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CarrotGame extends BaseContract {
  connect(runner?: ContractRunner | null): CarrotGame;
  waitForDeployment(): Promise<this>;

  interface: CarrotGameInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  carrotBalance: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  getCarrotCount: TypedContractMethod<[player: AddressLike], [bigint], "view">;

  harvestCarrot: TypedContractMethod<
    [plotId: BigNumberish],
    [void],
    "nonpayable"
  >;

  plantCarrot: TypedContractMethod<
    [plotId: BigNumberish],
    [void],
    "nonpayable"
  >;

  waterCarrot: TypedContractMethod<
    [plotId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "carrotBalance"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCarrotCount"
  ): TypedContractMethod<[player: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "harvestCarrot"
  ): TypedContractMethod<[plotId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "plantCarrot"
  ): TypedContractMethod<[plotId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "waterCarrot"
  ): TypedContractMethod<[plotId: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "Harvested"
  ): TypedContractEvent<
    HarvestedEvent.InputTuple,
    HarvestedEvent.OutputTuple,
    HarvestedEvent.OutputObject
  >;
  getEvent(
    key: "Planted"
  ): TypedContractEvent<
    PlantedEvent.InputTuple,
    PlantedEvent.OutputTuple,
    PlantedEvent.OutputObject
  >;
  getEvent(
    key: "Watered"
  ): TypedContractEvent<
    WateredEvent.InputTuple,
    WateredEvent.OutputTuple,
    WateredEvent.OutputObject
  >;

  filters: {
    "Harvested(address,uint256,uint256)": TypedContractEvent<
      HarvestedEvent.InputTuple,
      HarvestedEvent.OutputTuple,
      HarvestedEvent.OutputObject
    >;
    Harvested: TypedContractEvent<
      HarvestedEvent.InputTuple,
      HarvestedEvent.OutputTuple,
      HarvestedEvent.OutputObject
    >;

    "Planted(address,uint256)": TypedContractEvent<
      PlantedEvent.InputTuple,
      PlantedEvent.OutputTuple,
      PlantedEvent.OutputObject
    >;
    Planted: TypedContractEvent<
      PlantedEvent.InputTuple,
      PlantedEvent.OutputTuple,
      PlantedEvent.OutputObject
    >;

    "Watered(address,uint256)": TypedContractEvent<
      WateredEvent.InputTuple,
      WateredEvent.OutputTuple,
      WateredEvent.OutputObject
    >;
    Watered: TypedContractEvent<
      WateredEvent.InputTuple,
      WateredEvent.OutputTuple,
      WateredEvent.OutputObject
    >;
  };
}
