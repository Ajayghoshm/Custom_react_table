import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      background: white;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const BlockStyles = styled.div`
  padding: 1rem;
  overflow:auto;
  border: 1px solid black;

  .table {
    display: inline-block;
    border-spacing: 0;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: auto;
      display:flex;
      justify-content:space-between;
      padding: 0.5rem;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

export { Styles, BlockStyles };
