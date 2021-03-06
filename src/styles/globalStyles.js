import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #333333;
    font-family: 'Lato', sans-serif;
  }

  * {
      word-wrap: break-word;
      scrollbar-width: none;
      ::-webkit-scrollbar {
        display: none;
      }
  }
`

export default GlobalStyle;
