import styled from "styled-components";

const ArrayBarWrapper = styled.div`
  h3 {
    color: white;
  }
  background-color: black;
  height: ${(props) => parseInt(props.h)}vh;
  min-width: 1vw;
  margin-left: 30%;
`;
export default ArrayBarWrapper;
