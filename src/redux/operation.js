import * as User from './user/operation';
import * as Product from './product/operation';
import * as Weather from './weather-report/operation';
import * as Store from './gromor-store/operation';
import * as Farmer from './farmer/operation';
import * as Master from './master-api/operation';
import * as Payment from './payment/operation';
import * as Advisory from './advisory/operation';
import * as Order from './order/operation';
import * as Chat from './chat/operation';
import * as Community from './community/operation';

const operation = {
  user: {...User},
  product: {...Product},
  weather: {...Weather},
  store: {...Store},
  farmer: {...Farmer},
  master: {...Master},
  payment: {...Payment},
  advisory: {...Advisory},
  order: {...Order},
  chat: {...Chat},
  community: {...Community},
};

export function useOperation() {
  return operation;
}
