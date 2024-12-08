import React from 'react';
import styled from 'styled-components';
const BgImg = require('./home/title-bg.png')

const Section = styled.section`
  background-image: url(${BgImg});
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  text-align: center;

  div {
    background-color: #0000009a;
    padding: 50px;
    max-width: 90%;
    max-height: 90%;

    h1 {
      color: var(--gold);
    }
  }
`

export default function Contact() {
  return (
    <Section>
      <div>
        <h1>- 404 -</h1>
        <h2>Page Not Found</h2>
      </div>
    </Section>
  )
}
