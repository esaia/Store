import ACTION_TYPES from "../contants/action-types";

const INITIAL_STATE = {
  products: [],
};

export const productrReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_PRODUCT:
      return { ...state, products: payload };

    default:
      return state;
  }
};

export const filtereProductReducer = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case ACTION_TYPES.SET_FILTEREDATA:
      let filteredArray = [];
      for (let i = 0; i < payload.products.length; i++) {
        filteredArray.push({ ...payload.products[i], amount: 0 });
      }
      return payload;
    case ACTION_TYPES.FILTERE_DATA:
      const x = state.products.filter((item) => item.category === payload);
      return { products: x };
    default:
      return state;
  }
};

const getFromLocalstorage = () => {
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const CART_STATE = getFromLocalstorage();

export const cartReducer = (state = CART_STATE, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.ADD_TO_CART:
      if (state.length < 1) {
        return [...state, { ...payload, amount: 1 }];
      } else {
        const idArray = [];
        state.map((item) => idArray.push(item.id));
        if (idArray.includes(payload.id)) {
          return state;
        } else {
          localStorage.setItem(
            "cart",
            JSON.stringify([...state, { ...payload, amount: 1 }])
          );
          return [...state, { ...payload, amount: 1 }];
        }
      }
    case ACTION_TYPES.ADD_CART_FROM_SINGLE:
      const thisProductInCart = state.find(
        (item) => item.id === payload.product.id
      );

      if (thisProductInCart && thisProductInCart.amount === payload.amount) {
        return state;
      } else if (
        thisProductInCart &&
        thisProductInCart.amount !== payload.amount
      ) {
        //remove this item
        const removedItemArr = state.filter(
          (item) => item.id !== payload.product.id
        );

        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...removedItemArr,
            { ...payload.product, amount: payload.amount },
          ])
        );

        // add new item with changed amount
        return [
          ...removedItemArr,
          { ...payload.product, amount: payload.amount },
        ];
      }
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...state,
          { ...payload.product, amount: payload.amount },
        ])
      );

      return [...state, { ...payload.product, amount: payload.amount }];
    case ACTION_TYPES.CHANGE_QUANTITY:
      let x = [];

      if (payload.operator === "+") {
        x = { ...payload, amount: payload.amount + 1 };
      } else {
        x = { ...payload, amount: payload.amount - 1 };
        if (payload.amount - 1 < 1) {
          // remove item
          return state.filter((item) => item.id !== payload.id);
        }
      }
      // replace +1 or -1 payloads amount in array
      const t = state.map((item) => (item.id === payload.id ? x : item));

      return t;
    default:
      return state;
  }
};

// category

const cagegories = [
  "all",
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing",
];

export const categoryNameReducer = (state = "all", { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.GET_CATEGORY_NAME:
      return cagegories[payload - 1];

    default:
      return state;
  }
};

export const singleProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.FETCH_SINGLE_PRODUCT:
      return { ...payload.data, amount: 0 };

    default:
      return state;
  }
};
