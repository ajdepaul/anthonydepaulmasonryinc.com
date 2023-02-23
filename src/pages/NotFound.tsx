import React from 'react';
import styled from 'styled-components';
import { H1 } from '../component/Header';
import Section from '../component/Section';
const BgImg = require('./home/title-bg.png')

const StyledSection = styled(Section)`
  background-image: url(${BgImg});
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
`

export default function Contact() {
  return (
    <StyledSection>
      <H1>404 Page Not Found</H1>
    </StyledSection>
  )
}
