    
import * as Constants  from "../actions/types";

const initialState={
    submittedorders:[{"Id":123},{"Id":345},{"Id":789}],
    BakedOrders:[],
    MixedOrders:[],
    DecoratedOrders:[],
    BoxedOrders:[]
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.Submit_User_Order:
      return { ...state, submittedorders:[...state.submittedorders,action.payload.data] };
    case Constants.Baked_Order:
      return {...state,BakedOrders:[...state.BakedOrders,action.payload.data]};
    case Constants.Mixed_Order:
      return {...state,MixedOrders:[...state.MixedOrders,action.payload.data]};
    case Constants.Decorated_Order:
      return {...state,DecoratedOrders:[...state.DecoratedOrders,action.payload.data]};
    case Constants.Boxed_Order:
      return {...state,BoxedOrders:[...state.BoxedOrders,action.payload.data]};

    default:
      return state;
  }
}

export default orderReducer;