import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  .up {
    height: 13vh;
    display: flex;
    width: 85%;
    .left {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .square {
        height: 4em;
        width: 4em;
        margin: 1em;
      }
      .green {
        background-color: #7fff00;
      }
      .yellow {
        background-color: #f3cc30;
      }
      .blue {
        background-color: #58c7f3;
      }
      .orange {
        background-color: #ff8f00;
      }
    }
    .right {
      display: flex;
      width: 60%;
      flex-direction: coloumn;
      align-items: center;
      justify-content: flex-start;
      .icon {
        transform: scale(2);
        margin-left: 1.5em;
        margin-right: 1.5em;
      }
    }
  }
  .down {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 75vh;
    width: 85%;
    border: solid 1px #f3cc30;
    border-radius: 20px;
  }
`;
export const AboutWrapper = styled.div`
  text-align: left;
  margin-top: 5vh;
  margin-bottom: 10em;
  color: white;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .textCont {
    p {
      font-size: large;
      span {
        color: #58c7f3;
        font-weight: bold;
      }
      .head {
        color: #f3cc30;
      }
    }
  }
  .about-container {
    display: flex;
    justify-content: flex-start;
    width: 80%;
    .right {
      width: 50%;
    }
  }
`;
