import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: auto;
  background: #3f5864;
  border: 0px solid transparent;
  border-radius: 2px;
  margin-bottom: 3px;
  padding: 5px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  cursor: grab;
  p {
    font-weight: 500;
    line-height: 12px;
    font-size: 10px;
    color: #ffffff;
    margin: 0px;
    font-family: montserrat-bold, sans-serif;
  }
  span {
    display: none;
    position: absolute;
    top: 3px;
    right: 3px;
    border: 2px solid #3f5864;
    a,button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12px !important;
      height: 12px !important;
      min-width: 12px !important;
      min-height: 12px !important;
      margin-left:3px;
      border: none;
      background-color: rgba(0, 0, 0, 0.2);
      outline: none;
      svg {
        font-size: 10px;
        color: white;
      }
    }
  }
  :hover span {
    display: flex;
  }
  ${(props) =>
    props.isDragging &&
    css`
      border: 2px dashed rgba(0, 0, 0, 0.2);
      padding: 3px;
      border-radius: 0;
      background: white;
      box-shadow: none;
      cursor: grabbing;
      p,
      img,
      span,
      span a,
      span button,
      header {
        opacity: 0;
      }
    `}
`;
