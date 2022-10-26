import ACTION_TYPES from "../contants/action-types";

// Product Reducer
export const setProducts = (products) => {
  return {
    type: ACTION_TYPES.SET_PRODUCT,
    payload: products,
  };
};

// Filtered Product Reducer

export const set_filteredData = (products) => {
  return {
    type: ACTION_TYPES.SET_FILTEREDATA,
    payload: products,
  };
};

export const filtere_data = (products) => {
  return {
    type: ACTION_TYPES.FILTERE_DATA,
    payload: products,
  };
};

// cart Reducer

export const add_to_cart = (products) => {
  return {
    type: ACTION_TYPES.ADD_TO_CART,
    payload: products,
  };
};

export const add_to_cart_from_single = (products) => {
  return {
    type: ACTION_TYPES.ADD_CART_FROM_SINGLE,
    payload: products,
  };
};

export const CHANGE_QUANTITY = (products) => {
  return {
    type: ACTION_TYPES.CHANGE_QUANTITY,
    payload: products,
  };
};

// category name
export const set_category_name = (products) => {
  return {
    type: ACTION_TYPES.GET_CATEGORY_NAME,
    payload: products,
  };
};

// single product reducer

export const set_single_product = (products) => {
  return {
    type: ACTION_TYPES.FETCH_SINGLE_PRODUCT,
    payload: products,
  };
};
