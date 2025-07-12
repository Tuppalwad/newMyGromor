import { PaymentType } from './type';

const initialState = {
    transaction: [],
    hash: [],
    update: []
};

const paymentReducer = (state = initialState, action) => {

    switch (action.type) {
        case PaymentType.transaction + '_SUCCESS':
            return { ...state, transaction: action.payload };
        case PaymentType.hash + '_SUCCESS':
            return { ...state, hash: action.payload };
        case PaymentType.paymentSuccess + '_SUCCESS':
            return { ...state, hash: action.payload };
        case PaymentType.paymentUpdate + '_SUCCESS':
            return { ...state, update: action.payload };
        default:
            return { ...state };
    }

};

export default paymentReducer;
