import { useState, useEffect } from 'react';
import axios from 'axios';
import initialState from '../initialState';

const API = 'http://localhost:3006/products';
const API2 = 'https://us-central1-gndx-fake-api.cloudfunctions.net/api';

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadContent() {
      const response = await axios(API);
      setProducts(response.data);
    }

    loadContent();
  }, []);

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
    products,
    state,
  };
};

export default useInitialState;
