import React from "react";
import styled from "styled-components";
const Paginationdiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  div {
    width: auto;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px;
    border-radius: 5px;
  }
`;

const Pagin = styled.p`
  font-size: 15px;
  cursor: pointer;
  color: white;
  padding: 10px;
  color: black;
  border-radius: 5px;

  &:hover {
    background-color: black;
    color: white;
  }

  &:nth-child(${(props) => props.activePage}) {
    background-color: black;
    color: white;
  }
`;

const Pagination = ({ pagenumbers, activePage, setactivePage }) => {
  const arr = [];

  for (let i = 0; i < pagenumbers; i++) {
    arr.push(i);
  }

  return (
    <Paginationdiv>
      {arr.length < 2 || (
        <div>
          {arr.map((item) => {
            return (
              <Pagin
                onClick={() => {
                  setactivePage(item);
                  window.scrollTo(0, 0);
                }}
                activePage={activePage + 1}
                key={item}
              >
                {item + 1}
              </Pagin>
            );
          })}
        </div>
      )}
    </Paginationdiv>
  );
};

export default Pagination;
