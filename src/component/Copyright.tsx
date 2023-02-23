import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import Section from './Section';

const StyledSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-gray);
  color: var(--dark-gray-text);
  font-size: 0.75rem;
  line-height: 0.75rem;
  padding: 0.5rem;
`

export default function Copyright() {
  return (
    <StyledSection>
      Copyright © 2022 Anthony DePaul Masonry Inc.
    </StyledSection>
  )
}
