import styled from "styled-components";

const ArrayBarWrapper = styled.div`
  h3 {
    color: white;
  }
  .array-bar {
    background-color: ${(props) =>
      props.mn || props.hl
        ? "red"
        : props.act
        ? "blue"
        : props.sort
        ? "green"
        : "black"};
    height: ${(props) => parseInt(props.h)}vh;
    width: ${(props) =>
      parseInt(props.tot) <= 20
        ? "20"
        : parseInt(props.tot) >= 45
        ? "10"
        : "15"}px;
    display: inline-block;
    margin: 0 1px;
  }
`;
export default ArrayBarWrapper;
