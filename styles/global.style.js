import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;
export const SlideWrap = styled.div`
  margin-left: 1em;
  margin-top: 2em;
`;
export const TopWrap = styled.div`
  h1 {
    margin-left: 1em;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    color: #00adff;
  }
  .container {
    display: flex;
    margin-right: 1em;
  }
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

export const AboutWrapper = styled.div`
  margin-left: 2em;
  text-align: left;
  h1 {
    color: #00adff;
  }
  .textCont {
    p {
      font-size: x-large;
    }
  }
`;
