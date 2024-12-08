import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-gray);
  color: var(--dark-gray);
  font-size: 0.75rem;
  line-height: 0.75rem;
  padding: 0.5rem;
`

export default function Copyright() {
  return (
    <Section>
      Copyright © 2022 Anthony DePaul Masonry Inc.
    </Section>
  )
}
