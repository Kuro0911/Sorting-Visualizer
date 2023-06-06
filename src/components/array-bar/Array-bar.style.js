import styled from "styled-components";

const ArrayBarWrapper = styled.div`
  .array-bar {
    background-color: white;
    box-shadow: 0 0 10px white;
    height: ${(props) => parseInt(props.h)}vh;
    width: ${(props) =>
      parseInt(props.tot) <= 20
        ? "20"
        : parseInt(props.tot) >= 45
        ? "5"
        : "15"}px;
    display: inline-block;
    border-radius: 1em;
    margin: ${(props) => (parseInt(props.tot) >= 65 ? "0 4px" : "0 6px")};
  }
`;
export default ArrayBarWrapper;
