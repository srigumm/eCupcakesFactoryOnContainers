import * as Actions from './types';
import axios from "axios";

export const submitUserOrderRequest = ({ Id, Flavour,Size, Quantity }) => {
  const headers = {
    'Content-Type': 'application/json'
}  
  const request = axios.post(
      "http://localhost:5000/api/v1/order",
      {
        "Order":
        {
          Id,
          Flavour,
          Size,
          Quantity
        }
      },
      {headers: headers}
    ).catch(err =>{console.log("Error occured during POST request:",err);throw err;});
  
    return {
      type: Actions.Submit_User_Order,
      payload: request
    };
  };

  export const submitBakedOrder = (payload) =>{
    const headers = {
      'Content-Type': 'application/json'
    }  
    const request = axios.post(
        "http://localhost:5000/api/v1/order/bake",
        {"Order":payload},
        {headers: headers}
      ).catch(err =>{console.log("Error occured while submitting baked order:",err);throw err;});
    
      return {
        type: Actions.Baked_Order,
        payload: request
      };
    }

    export const submitMixedOrder = (payload) =>{
      const headers = {
        'Content-Type': 'application/json'
      }  
      const request = axios.post(
          "http://localhost:5000/api/v1/order/mix",
          {"Order":payload},
          {headers: headers}
        ).catch(err =>{console.log("Error occured while submitting mixed order:",err);throw err;});
      
        return {
          type: Actions.Mixed_Order,
          payload: request
        };
      }
      export const submitDecoratedOrder = (payload) =>{
        const headers = {
          'Content-Type': 'application/json'
        }  
        const request = axios.post(
            "http://localhost:5000/api/v1/order/decorate",
            {"Order":payload},
            {headers: headers}
          ).catch(err =>{console.log("Error occured while submitting decorated order:",err);throw err;});
        
          return {
            type: Actions.Decorated_Order,
            payload: request
          };
        }
        export const submitBoxedOrder = (payload) =>{
          const headers = {
            'Content-Type': 'application/json'
          }  
          const request = axios.post(
              "http://localhost:5000/api/v1/order/box",
              {"Order":payload},
              {headers: headers}
            ).catch(err =>{console.log("Error occured while submitting boxed order:",err);throw err;});
          
            return {
              type: Actions.Boxed_Order,
              payload: request
            };
          }