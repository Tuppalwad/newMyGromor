import {loadingReducer} from './loading-reducer';
import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import productReducer from './product/reducer';
import weatherReducer from './weather-report/reducer';
import storeReducer from './gromor-store/reducer';
import farmerReducer from './farmer/reducer';
import masterReducer from './master-api/reducer';
import advisoryReducer from './advisory/reducer';
import orderReducer from './order/reducer';
import chatReducer from './chat/reducer';
import paymentReducer from './payment/reducer';
import communityReducer from './community/reducer';
import servicesReducer from './services/reducer.js'
export default combineReducers({
  loadingReducer,
  user: userReducer,
  product: productReducer,
  weather: weatherReducer,
  store: storeReducer,
  farmer: farmerReducer,
  master: masterReducer,
  advisory: advisoryReducer,
  order: orderReducer,
  chat: chatReducer,
  payment: paymentReducer,
  community: communityReducer,
  services:servicesReducer,
});
