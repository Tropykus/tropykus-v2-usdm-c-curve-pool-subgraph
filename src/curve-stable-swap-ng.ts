import {
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  TokenExchange as TokenExchangeEvent,
  TokenExchangeUnderlying as TokenExchangeUnderlyingEvent,
  AddLiquidity as AddLiquidityEvent,
  RemoveLiquidity as RemoveLiquidityEvent,
  RemoveLiquidityOne as RemoveLiquidityOneEvent,
  RemoveLiquidityImbalance as RemoveLiquidityImbalanceEvent,
  RampA as RampAEvent,
  StopRampA as StopRampAEvent,
  ApplyNewFee as ApplyNewFeeEvent,
  CurveStableSwapNG,
} from "../generated/CurveStableSwapNG/CurveStableSwapNG";

import { ERC20 } from "../generated/CurveStableSwapNG/ERC20";

import {
  Transfer,
  Approval,
  Token,
  TokenExchange,
  TokenExchangeUnderlying,
  AddLiquidity,
  RemoveLiquidity,
  RemoveLiquidityOne,
  RemoveLiquidityImbalance,
  RampA,
  StopRampA,
  ApplyNewFee,
} from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenExchange(event: TokenExchangeEvent): void {
  let contract = CurveStableSwapNG.bind(event.address);
  let soldTokenAddress = contract.coins(event.params.sold_id);
  let boughtTokenAddress = contract.coins(event.params.bought_id);

  let soldToken = Token.load(soldTokenAddress.toHex());

  if (soldToken == null) {
    soldToken = new Token(soldTokenAddress.toHex());
    let soldTokenContract = ERC20.bind(soldTokenAddress);
    if (soldTokenContract.symbol().includes("USDC")) soldToken.symbol = "USDC";
    else if (soldTokenContract.symbol().includes("USDM"))
      soldToken.symbol = "USDM";
    else soldToken.symbol = soldTokenContract.symbol();
    soldToken.decimals = soldTokenContract.decimals();
    soldToken.save();
  }

  let boughtToken = Token.load(boughtTokenAddress.toHex());

  if (boughtToken == null) {
    boughtToken = new Token(boughtTokenAddress.toHex());
    let boughtTokenContract = ERC20.bind(boughtTokenAddress);
    if (boughtTokenContract.symbol().includes("USDC")) boughtToken.symbol = "USDC";
    else if (boughtTokenContract.symbol().includes("USDM"))
    boughtToken.symbol = "USDM";
    else boughtToken.symbol = boughtTokenContract.symbol();    
    boughtToken.symbol = boughtTokenContract.symbol();
    boughtToken.decimals = boughtTokenContract.decimals();
    boughtToken.save();
  }

  let entity = new TokenExchange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.buyer = event.params.buyer;
  entity.tokens_sold = event.params.tokens_sold;
  entity.tokens_bought = event.params.tokens_bought;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.sold_token = soldToken.id;
  entity.bought_token = boughtToken.id;

  entity.save();
}

export function handleTokenExchangeUnderlying(
  event: TokenExchangeUnderlyingEvent
): void {
  let entity = new TokenExchangeUnderlying(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.buyer = event.params.buyer;
  entity.sold_id = event.params.sold_id;
  entity.tokens_sold = event.params.tokens_sold;
  entity.bought_id = event.params.bought_id;
  entity.tokens_bought = event.params.tokens_bought;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAddLiquidity(event: AddLiquidityEvent): void {
  let entity = new AddLiquidity(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.provider = event.params.provider;
  entity.token_amounts = event.params.token_amounts;
  entity.fees = event.params.fees;
  entity.invariant = event.params.invariant;
  entity.token_supply = event.params.token_supply;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRemoveLiquidity(event: RemoveLiquidityEvent): void {
  let entity = new RemoveLiquidity(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.provider = event.params.provider;
  entity.token_amounts = event.params.token_amounts;
  entity.fees = event.params.fees;
  entity.token_supply = event.params.token_supply;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRemoveLiquidityOne(event: RemoveLiquidityOneEvent): void {
  let entity = new RemoveLiquidityOne(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.provider = event.params.provider;
  entity.token_id = event.params.token_id;
  entity.token_amount = event.params.token_amount;
  entity.coin_amount = event.params.coin_amount;
  entity.token_supply = event.params.token_supply;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRemoveLiquidityImbalance(
  event: RemoveLiquidityImbalanceEvent
): void {
  let entity = new RemoveLiquidityImbalance(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.provider = event.params.provider;
  entity.token_amounts = event.params.token_amounts;
  entity.fees = event.params.fees;
  entity.invariant = event.params.invariant;
  entity.token_supply = event.params.token_supply;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRampA(event: RampAEvent): void {
  let entity = new RampA(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.old_A = event.params.old_A;
  entity.new_A = event.params.new_A;
  entity.initial_time = event.params.initial_time;
  entity.future_time = event.params.future_time;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleStopRampA(event: StopRampAEvent): void {
  let entity = new StopRampA(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.A = event.params.A;
  entity.t = event.params.t;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApplyNewFee(event: ApplyNewFeeEvent): void {
  let entity = new ApplyNewFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.fee = event.params.fee;
  entity.offpeg_fee_multiplier = event.params.offpeg_fee_multiplier;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
