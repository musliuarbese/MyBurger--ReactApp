import * as actionTypes from '../actions/actionTypes';


const intialState = {
   orders: [],
   loading: false,
}

const reducer = (state = intialState, actions) =>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_STAR:
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHSE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading: false,
                order: state.orders.concat(newOrder)
                //order osht old orders ku me concat e kthejm nje new array and therefore we add this immutably 
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading: false
            };
            default:
                return state;
    }
}

export default reducer;