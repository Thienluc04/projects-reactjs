import React from "react";
import styled, { css } from "styled-components";

const StyledCard = styled.div`
  position: relative;
  .card-image {
    height: 400px;
    width: 100%;
    border-radius: 8px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }
  .card-content {
    position: absolute;
    left: 50%;
    width: calc(100% - 36px);
    transform: translate(-50%, 50%);
    background-color: #fff;
    z-index: 10;
    border-radius: 20px;
    padding: 20px;
    bottom: 0;
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .card-user {
    display: flex;
    align-items: center;
    column-gap: 12px;
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 100rem;
      object-fit: cover;
      flex-shrink: 0;
    }
    .user-name {
      font-weight: 300;
      font-size: 16px;
      color: #333;
    }
  }
  .card-meta {
    display: flex;
    gap: 12px;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-title {
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.blue};
  }
  .card-amount {
    font-size: 18px;
    font-weight: bold;
    ${(props) =>
      props.secondary
        ? css`
            background: linear-gradient(86.88deg, #20e3b2, #2cccff);
          `
        : css`
            background: linear-gradient(
              86.88deg,
              #7d6aff 1.38%,
              #ffb86c 64.35%,
              #fc2872 119.91%
            );
          `}
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

const Card2 = (props) => {
  return (
    <StyledCard secondary={props.secondary}>
      <div className="card-image">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
      <div className="card-content">
        <div className="card-top">
          <div className="card-user">
            <img
              className="user-avatar"
              src="https://images.unsplash.com/photo-1644417076004-591270852df9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt=""
            />
            <span className="user-name">@zndrson</span>
          </div>
          <div className="card-meta">
            <img src="/icon-heart.svg" alt="" />
            <span>256</span>
          </div>
        </div>
        <div className="card-footer">
          <h3 className="card-title">Cosmic Perspective</h3>
          <span className="card-amount">12,000 PSL</span>
        </div>
      </div>
    </StyledCard>
  );
};

export default Card2;
