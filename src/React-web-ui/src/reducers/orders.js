    
import * as Constants  from "../actions/types";

const initialState={
    submittedorders:[{"Id":123},{"Id":345},{"Id":789}],
    ReadyToBakeOrders:[],
    ReadyToMixOrders:[],
    ReadyToDecorateOrders:[],
    ReadyToBoxOrders:[],
    ReadyToShipOrders:[],
    OrderFailures:[]
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.Submit_User_Order:
      return { ...state, submittedorders:[...state.submittedorders,action.payload.data] };
    case Constants.Baked_Order:
      return {...state,ReadyToDecorateOrders:[...state.ReadyToDecorateOrders,action.payload.data]};
    case Constants.Mixed_Order:
      return {...state,ReadyToBakeOrders:[...state.ReadyToBakeOrders,action.payload.data]};
    case Constants.Decorated_Order:
      return {...state,RadyToBoxOrders:[...state.RadyToBoxOrders,action.payload.data]};
    case Constants.Boxed_Order:
      return {...state,ReadyToShipOrders:[...state.ReadyToShipOrders,action.payload.data]};
    case Constants.Report_Failure:
      return {...state,OrderFailures:[...state.OrderFailures,action.payload.data]};

    default:
      return state;
  }
}

export default orderReducer;