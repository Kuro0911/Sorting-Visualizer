import styled from "styled-components";

export const NavbarWrap = styled.div`
  .menu-wrap {
    display: flex;
    flex-direction: column;
  }
`;
export const TopWrap = styled.div`
  h1 {
    margin-left: 1em;
    color: white;
  }
  .container {
    display: flex;
    margin-right: 1em;
    .icon {
      cursor: pointer;
      color: #e779c1;
      transform: scale(2);
      margin-right: 2em;
    }
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
export const SlideWrap = styled.div`
  margin-left: 1em;
  margin-top: 2em;
`;
