import React from "react";
import ArrayBar from "../array-bar/array-bar";
import BubbleSortWrapper, { Container } from "./BubbleSort.style";

const BubbleSort = () => {
  const number = ["", "", ""];
  return (
    <BubbleSortWrapper>
      <h1>Bubble Sort</h1>
      <Container>
        {number.map((key) => {
          return <ArrayBar />;
        })}
      </Container>
    </BubbleSortWrapper>
  );
};

export default BubbleSort;
