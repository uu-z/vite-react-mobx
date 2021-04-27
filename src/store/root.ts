import { BaseStore } from './base';
import { LangStore } from './lang';
import { GodStore } from './god';

export class RootStore {
  base = new BaseStore();
  lang = new LangStore();
  god = new GodStore(this);
}
