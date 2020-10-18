import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const intialState = {
   orders: [],
   loading: false,
   purchased: false
}

const reducer = (state = intialState, action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGER_STAR:
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderId});
            return updateObject(state, { loading: false,
                purchased: true,
                order: state.orders.concat(newOrder)}
               //order osht old orders ku me concat e kthejm nje new array and therefore we add this immutably 
             ) 
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false});

            case actionTypes.FETCH_ORDERS_START:
                return updateObject(state, {loading: true});
                case actionTypes.FETCH_ORDERS_SUCCESS:
                    return updateObject(state, {orders:action.orders, loading: false});
                    case actionTypes.FETCH_ORDERS_FAIL:
                    return updateObject(state, {loading: false});
            default:
                return state;
    }
}

export default reducer;