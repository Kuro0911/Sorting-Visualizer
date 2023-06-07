import styled from "styled-components";

const NodeWrapper = styled.div`
  .node {
    background-color: ${(props) =>
      parseInt(props.idx) == parseInt(props.st)
        ? "#ff8f00"
        : parseInt(props.idx) == parseInt(props.ed)
        ? "#7fff00"
        : "white"};
    height: 5em;
    width: 5em;
    border-radius: 1em;
    border: 1px solid black;
  }
`;
export default NodeWrapper;
