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
    color: white;
  }
  .container {
    display: flex;
    margin-right: 1em;
  }
  .wrap {
    display: flex;
    align-items: center;
  }
  background-color: #1a103c;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
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
