import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 30px 30px 30px;
  height: 100%;
  z-index: 0;
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
  table {
    background-color: white;
    padding: 0px;
    margin: 0px;
  }
  table th {
    position: relative;
    min-width: 200px;
    max-width: 200px;
    min-height: 100px;
    background: #f4f4f4;
    padding: 35px 15px 15px 15px;
    border: 2px solid rgba(192, 208, 230, 0.8);
  }
  table th,
  table td {
    header {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      height: 20px;
      display: flex;
      padding: 1px 1px 1px 15px;
      align-items: center;
      justify-content: space-between;
      background-color: rgba(230, 236, 245, 0.4);
      label {
        margin: 0px;
        font-size: 11px;
        font-family: montserrat-bold;
        color: #ABB3CC;
      }
      a,
      button {
        display: none;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        max-width: 16px;
        max-height: 16px;
        border-width: 0;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        svg {
          font-size: 12px;
        }
      }
    }
    :hover header button {
      display: flex;
      svg {
        color:#de2b52;
      }
    }
    :hover header a{
      display:flex;
      svg {
        color:#7159c1;
      }
    }
  }
`;

export const GridScope = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  width: auto;
`;

export const GridContent = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
`;

export const GridRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: auto;
  padding: 20px 20px 110px 20px;
`;

export const GridBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
  width: auto;
  padding: 20px 20px 20px 170px;
`;

export const InputHeader = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  background-color: white;
  font-size: 12px;
  font-family: montserrat-bold, sans-serif;
`;
