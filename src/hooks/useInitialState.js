import { useState } from 'react';
import initialState from '../initialState';

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = (payload) => {
    const itemInCart = state.cart.find((item) => item.id === payload.id);

    setState({
      ...state,
      cart: itemInCart
        ? state.cart.map((item) =>
            item.id === payload.id
              ? { ...item, quantify: item.quantify + 1 }
              : item
          )
        : [...state.cart, { ...payload, quantify: 1 }],
    });
  };

  const removeFromCart = (payload) => {
    const itemToDelete = state.cart.find((item) => item.id === payload.id);

    setState({
      ...state,
      cart:
        itemToDelete.quantify > 1
          ? state.cart.map((item) =>
              item.id === payload.id
                ? { ...item, quantify: item.quantify - 1 }
                : item
            )
          : state.cart.filter((item) => item.id !== payload.id),
    });
  };

  const addToBuyer = (payload) => {
    setState({
      ...state,
      buyer: [...state.buyer, payload],
    });
  };

  const addNewOrder = (payload) => {
    setState({
      ...state,
      orders: [...state.orders, payload],
    });
  };

  const removeAllFromCart = () => {
    setState({
      ...state,
      cart: [],
    });
  };

  return {
    addToCart,
    removeFromCart,
    removeAllFromCart,
    addToBuyer,
    addNewOrder,
    state,
  };
};

export default useInitialState;
