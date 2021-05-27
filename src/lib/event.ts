import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';

interface MessageEvents {
  'amount.refetch': () => void;
  'loading.confirm': () => void;
  'loading.cancel': () => void;
  'wallet.onAccount': () => void;
  'wallet.logout': () => void;
  'pendingPool.confirm': () => void;
  'pendingPool.cacel': () => void;
  'modal.confirm': () => void;
  'modal.cancel': () => void;
}

export const eventBus = new EventEmitter() as TypedEmitter<MessageEvents>;
