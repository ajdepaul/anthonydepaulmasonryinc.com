import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap');

  :root {
    --gold: #FFAD0B;
    --light-gray: #C5C0BD;
    --dark-gray-text: #373737;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    height: 100vh;
  }

  #root {
    height: 100%;
    font-size: 1rem;
    font-weight: 300;
    overflow-x: hidden;
    font-family: 'Nanum Myeongjo', serif;
    font-size: 1.333rem;
    color: #ffffff;
    line-height: calc(1.333rem * 1.5);
  }

  /* #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    font-weight: 300;
    overflow-x: hidden;
    min-height: 100vh;
    font-family: 'Nanum Myeongjo', serif;
    font-size: 1.333rem;
    color: #ffffff;
    line-height: calc(1.333rem * 1.5);
  } */

  a {
    color: inherit;
    text-decoration: none;
  }

  li {
    list-style: inside;
  }
`
