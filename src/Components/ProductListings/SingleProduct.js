import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";

import styled from "styled-components";
import { add_to_cart } from "../../redux/action/productActions";
const Product = styled.div`
  overflow: hidden;
  border: 1px solid #e6ece1;
  background-color: aliceblue;
  border-radius: 5px;
`;

const TopSection = styled.div`
  position: relative;
  height: 200px;
  cursor: pointer;
  z-index: 22;
  border-bottom: 1px solid #bfc2bd;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: 15;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  gap: 10px;
  color: white;
  top: 290px;
  transition: all 0.2s ease-in-out;
  position: absolute;
  z-index: 20;
  transform: translateY(-50%);

  h3 {
    font-size: 15px;
    text-align: start;
  }

  button {
    cursor: pointer;
    width: 100%;
    border: none;
    padding: 5px 0px;
    background-color: #7bbb5d;
    color: white;
  }
`;
const Details = styled.div`
  z-index: 50 !important;
  position: relative;
  background-color: white;
  color: black;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  div {
    display: flex;
    align-items: center;
    align-items: center;
    padding-bottom: 10px;
  }
  h1 {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    padding: 5px 20px;
  }
  div {
    display: flex;

    h5 {
      font-size: 15px;
      font-weight: bold;
      &:first-child {
        color: gray;
      }
    }
  }
`;

const Pricediv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  flex: 1;
  padding: 5px 20px;
  @media only screen and (max-width: 910px) {
    padding: 1px 10px !important;
  }
`;
const Ratediv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex: 1;
  padding: 5px 20px;
  @media only screen and (max-width: 910px) {
    padding: 1px 10px !important;
  }
`;

const SingleProduct = ({ item }) => {
  const overlayref = useRef();
  const dispatch = useDispatch();

  const productonhover = () => {
    overlayref.current.style.display = "flex";
    overlayref.current.style.top = "50%";
    overlayref.current.style.transition = "top 0.1s ease-in";
  };
  const productonleave = () => {
    overlayref.current.style.top = "290px";
    overlayref.current.style.transition = "top 0.1s ease-in";
  };

  return (
    <div>
      <Product onMouseEnter={productonhover} onMouseLeave={productonleave}>
        <TopSection>
          <Overlay ref={overlayref}>
            <h3>rate: {item?.rating?.rate}</h3>
            <h3>Category: {item?.category}</h3>
            <button onClick={() => dispatch(add_to_cart(item))}>
              Add to cart
            </button>
          </Overlay>
          <a
            href={`/singleProduct/${item.id}`}
            style={{ textDecoration: "none" }}
          >
            <img src={item?.image} alt="" />
          </a>
        </TopSection>
        <a
          href={`/singleProduct/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <Details>
            <h1>{item?.title}</h1>

            <div>
              <Pricediv>
                <h5>price:</h5>
                <h5>{item?.price}$</h5>
              </Pricediv>

              <Ratediv>
                <FaStar />
                <h5>{item.rating.rate}</h5>
              </Ratediv>
            </div>
          </Details>
        </a>
      </Product>
    </div>
  );
};

export default SingleProduct;
