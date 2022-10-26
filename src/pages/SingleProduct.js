import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  add_to_cart_from_single,
  set_single_product,
} from "../redux/action/productActions";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Mainwrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  justify-content: center;

  div {
    width: 100%;
    max-width: 1600px;
    display: flex;

    @media only screen and (max-width: 910px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;
const Leftsection = styled.div`
  padding: 20px;

  @media only screen and (max-width: 910px) {
    padding: 0px !important;
    div {
      align-items: center !important;
      margin-bottom: 50px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const Mainimg = styled.img`
  width: 400px;
  height: 400px;

  object-fit: cover;

  @media only screen and (max-width: 910px) {
    width: 300px;
    height: 200px;
  }
`;

const Rightsection = styled.div`
  padding: 20px;
  @media only screen and (max-width: 910px) {
    padding: 0px !important;

    div {
      max-width: 0%;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 400px;
  }

  button {
    width: 300px;
    border: none;
    background-color: #7bbb5d;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 800;
    border-radius: 3px;
    @media only screen and (max-width: 910px) {
      font-size: 12px;
      padding: 10px !important;
    }
  }

  hr {
    width: 100%;
    color: gray;
  }
`;

const Line = styled.div`
  width: 100%;
  background-color: #dad8d8;
  height: 0.8px;
`;

const Desctionation = styled.div`
  display: flex;
  flex-direction: row !important;
  gap: 0px !important;

  h3 {
    &:nth-child(1) {
      color: gray;
      margin-right: 4px;
    }
  }
`;

const Detailtop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  gap: 10px !important;

  P {
    color: #454545;
    font-size: 13px;
  }
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  line-height: 33px;
`;

const Description = styled.p`
  color: #838080;
  font-size: 15px;
  line-height: 20px;
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: flex-start;
  gap: 5px !important;
`;
const Pricediv = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 910px) {
    gap: 2px !important;
  }
`;

const Price = styled.h3`
  font-size: 25px;
  font-weight: 900 !important;
  font-family: "Russo One", sans-serif;
`;

const Quantity = styled.div`
  div {
    width: 150px;
    display: flex;
    flex-direction: row !important;
    justify-content: center;
    align-items: center;
    border: 1px solid #dad8d8;

    gap: 0px !important;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 4;
    }
    h5 {
      cursor: pointer;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;

      &:nth-child(1) {
        border-right: 1px solid #dad8d8;
      }
      &:nth-child(3) {
        border-left: 1px solid #dad8d8;
      }
    }
  }
`;

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct);
  const cartProducts = useSelector((state) => state.cartProducts);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [quantity, setquantity] = useState(
    cartProducts.find((item) => item.id === parseInt(id))
      ? cartProducts.find((item) => item.id === parseInt(id))?.amount
      : 1
  );

  const getData = () => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) =>
        dispatch(set_single_product({ cartProducts, id, data: response.data }))
      );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Mainwrap>
      <div>
        <Leftsection>
          <div>
            <Mainimg src={product.image} alt="" />
          </div>
        </Leftsection>
        <Rightsection>
          <div>
            <Desctionation>
              <h3>Home ➡️ Products ➡️</h3>
              <h3> Detail</h3>
            </Desctionation>
            <Detailtop>
              <Title>{product.title}</Title>
              <p>CATEGORY: {product.category}</p>
            </Detailtop>

            <Reviews>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </Reviews>

            <Description>{product.description}</Description>

            <Price>${product.price}</Price>

            <Line />

            <Pricediv>
              <Quantity>
                <div>
                  <h5 onClick={() => setquantity(quantity - 1)}>-</h5>
                  <p>{quantity}</p>
                  <h5 onClick={() => setquantity(quantity + 1)}>+</h5>
                </div>
              </Quantity>
              <button
                onClick={() =>
                  dispatch(
                    add_to_cart_from_single({ product, amount: quantity })
                  )
                }
              >
                Add To Cart
              </button>
            </Pricediv>
          </div>
        </Rightsection>
      </div>
    </Mainwrap>
  );
};

export default SingleProduct;
