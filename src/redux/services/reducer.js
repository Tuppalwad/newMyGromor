import { servicetype } from './type.js';

const initialState = {
    applyedservices: null,
    productFromInvoicedata: null,
    sprayServiceCondition: null,
    sprayItemData: null,
    doorDeliveryProduct: null
};

const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case servicetype.setServiceslist + '_SUCCESS':
            return { ...state, applyedservices: action.payload };
        case servicetype.productFromInvoice + '_SUCCESS':
            return { ...state, productFromInvoicedata: action.payload }
        case servicetype.SprayCondation:
            return { ...state, sprayServiceCondition: action.payload }
        case servicetype.spreayItemDataset:
            return { ...state, sprayItemData: action.payload }
        case servicetype.doorDeliveryProduct + '_SUCCESS':
            return { ...state, doorDeliveryProduct: action.payload }


        default:
            return { ...state };
    }
};
export default servicesReducer;
