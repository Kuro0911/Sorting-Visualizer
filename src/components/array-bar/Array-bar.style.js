import styled from "styled-components";

const ArrayBarWrapper = styled.div`
  h3 {
    color: white;
  }
  .array-bar {
    background-color: ${(props) => (props.act ? "blue" : "black")};
    height: ${(props) => parseInt(props.h)}vh;
    width: 15px;
    display: inline-block;
    margin: 0 1px;
  }
`;
export default ArrayBarWrapper;
