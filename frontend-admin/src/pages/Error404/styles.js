import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  h1 {
    font-size: 82px;
  }

  span {
    font-size: 16px;
    color: #666;
    display: block;
    margin: 10px 0 50px;
  }

  a {
    width: 100%;
    font-size: 16px;
    padding: 12px 0;
    border-radius: 4px;
    display: block;
    background: #ffc72c;
    color: #fff;
    font-weight: bold;

    &:hover {
      background: ${darken(0.03, "#ffc72c")};
    }
  }
`;
