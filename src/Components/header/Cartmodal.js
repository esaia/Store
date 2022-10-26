import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CHANGE_QUANTITY } from "../../redux/action/productActions";

const Cart = styled.div`
  position: absolute;
  max-height: 500px !important;
  width: 300px !important;
  top: 60px;
  right: 0;
  background-color: #f7f9f5;
  z-index: 60;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EmptyCart = styled.h3`
  padding: 15px;
  font-size: 15px;
`;

const Productsdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
`;
const Product = styled.div`
  display: flex;
  padding: 5px;
  border-bottom: 0.4px solid gray;
  color: black;
`;

const Left = styled.div`
  flex: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Right = styled.div`
  flex: 3;
  padding: 5px;
  display: grid;
  row-gap: 7px;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header"
    "main main sidebar sidebar"
    "footer footer sidebar sidebar";

  a {
    color: black;
    grid-area: header;

    h2 {
      font-size: 16px;
    }
  }

  p {
    border-radius: 20px;
    font-size: 12px;
    color: gray;
    grid-area: main;
  }

  div {
    display: flex;

    p {
      color: green;
    }
    h3 {
      font-size: 14px;
      font-weight: 600;
      grid-area: footer;
    }
  }
`;

const Quantity = styled.div`
  grid-area: sidebar;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  align-items: center;
  div {
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 5px;
    border: 1px solid black;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-items: flex-end;

  div {
    width: 100%;

    &:nth-child(1) {
      display: flex;
      justify-content: space-between;
      h4 {
        margin: 5px;
      }
    }
    &:nth-child(2) {
      display: flex;
      button {
        background-color: #a5da71;
        border: none;
        flex: 1;
        padding: 10px;
        margin: 5px;
        color: white;
        cursor: pointer;
        &:nth-child(1) {
          background-color: black;
        }
      }
    }
  }
`;

const Cartmodal = () => {
  const [total, setTotal] = useState(0);
  const cartItems = useSelector((state) => state.cartProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    // sum total prices
    const totalPriceArray = cartItems.map((item) => item.price * item.amount);
    let sum = 0;
    totalPriceArray.forEach((item) => (sum += item));
    setTotal(sum.toFixed(2));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Cart>
      <Productsdiv>
        {cartItems.map((item) => {
          return (
            <Product key={item.id}>
              <Left>
                <img src={item.image} alt="" />
              </Left>

              <Right>
                <a
                  href={`/singleProduct/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h2>{item.title}</h2>
                </a>
                <p>{item.category}</p>
                <div>
                  {item.amount > 1 && (
                    <p>
                      {item.price}*{item.amount}=
                    </p>
                  )}

                  <h3> ${(item.price * item.amount).toFixed(2)}</h3>
                </div>
                <Quantity>
                  <div
                    onClick={() =>
                      dispatch(CHANGE_QUANTITY({ ...item, operator: "-" }))
                    }
                  >
                    -
                  </div>
                  <p>{item.amount}</p>
                  <div
                    onClick={() =>
                      dispatch(CHANGE_QUANTITY({ ...item, operator: "+" }))
                    }
                  >
                    +
                  </div>
                </Quantity>
              </Right>
            </Product>
          );
        })}
      </Productsdiv>
      {cartItems.length === 0 ? (
        <EmptyCart>Cart is Empty</EmptyCart>
      ) : (
        <Buttons>
          <div>
            <h4>{cartItems.length} items</h4>
            <h4>Total: {total}$</h4>
          </div>
          <div>
            <button>View Cart</button>
            <button>Checkout</button>
          </div>
        </Buttons>
      )}
    </Cart>
  );
};

export default Cartmodal;
