import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #ffffff;
`

const StyledA = styled.a`
  text-decoration: none;
  font-size: 2.369rem;

  &:hover {
    color: var(--gold);
  }

  &.active {
    color: var(--gold);
    text-decoration: underline;
  }
`

interface Props {
  activePage: 'home' | 'work' | 'contact'
}

export default function Nav(props: Props) {
  return (
    <StyledNav>
        <StyledA className={ props.activePage === 'home' ? 'active' : '' } href='/'>Home</StyledA>
        <StyledA className={ props.activePage === 'work' ? 'active' : '' } href='/work'>Work</StyledA>
        <StyledA className={ props.activePage === 'contact' ? 'active' : '' } href='/contact'>Contact</StyledA>
    </StyledNav>
  )
}
