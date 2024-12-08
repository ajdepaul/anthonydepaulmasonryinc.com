import { createGlobalStyle } from 'styled-components';

const typeScale = 1.333

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap');

  :root {
    --gold: #FFAD0B;
    --white-1: #f0f0f0;
    --white-1-transp: #f0f0f080;
    --light-gray: #C5C0BD;
    --dark-gray: #373737;
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

  h1 {
    font-size: ${`${Math.pow(typeScale, 6)}rem`};
    line-height: ${`${Math.pow(typeScale, 6) * 1.2}rem`};
    font-weight: normal;
  }

  h2 {
    font-size: ${`${Math.pow(typeScale, 5)}rem`};
    line-height: ${`${Math.pow(typeScale, 5) * 1.2}rem`};
    font-weight: normal;
  }

  h3 {
    font-size: ${`${Math.pow(typeScale, 4)}rem`};
    line-height: ${`${Math.pow(typeScale, 4) * 1.2}rem`};
    font-weight: normal;
  }

  h4 {
    font-size: ${`${Math.pow(typeScale, 3)}rem`};
    line-height: ${`${Math.pow(typeScale, 3) * 1.2}rem`};
    font-weight: normal;
  }

  h5 {
    font-size: ${`${Math.pow(typeScale, 2)}rem`};
    line-height: ${`${Math.pow(typeScale, 2) * 1.2}rem`};
    font-weight: normal;
  }

  h6 {
    font-size: ${`${Math.pow(typeScale, 1)}rem`};
    line-height: ${`${Math.pow(typeScale, 1) * 1.2}rem`};
    font-weight: normal;
  }

  h7 {
    font-size: ${`${Math.pow(typeScale, 0)}rem`};
    line-height: ${`${Math.pow(typeScale, 0) * 1.2}rem`};
    font-weight: normal;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  li {
    list-style: inside;
  }

  section {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
