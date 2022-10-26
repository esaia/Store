import { configureStore } from "@reduxjs/toolkit";
import {
  productrReducer,
  filtereProductReducer,
  cartReducer,
  categoryNameReducer,
  singleProductReducer,
} from "./reducers/ProductReducer";

const store = configureStore({
  reducer: {
    Allproduct: productrReducer,
    filtereData: filtereProductReducer,
    cartProducts: cartReducer,
    categoryName: categoryNameReducer,
    singleProduct: singleProductReducer,
  },
});

export default store;
