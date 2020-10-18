import * as actionTypes from '../actions/actionTypes';


const intialState = {
   orders: [],
   loading: false,
   purchased: false
}

const reducer = (state = intialState, action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_STAR:
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading: false,
                purchased: true,
                order: state.orders.concat(newOrder)
                //order osht old orders ku me concat e kthejm nje new array and therefore we add this immutably 
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading: false
            };

            case actionTypes.FETCH_ORDERS_START:
                return{
                    ...state,
                    loading: true
                }
                case actionTypes.FETCH_ORDERS_SUCCESS:
                    return{
                        ...state,
                        orders:action.orders
                    }
                    case actionTypes.FETCH_ORDERS_FAIL:
                    return{
                        ...state,
                        loading: false
                    }
            default:
                return state;
    }
}

export default reducer;