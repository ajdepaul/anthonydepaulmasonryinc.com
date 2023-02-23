import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import GlobalStyle from './GlobalStyle';
import Copyright from './component/Copyright';
import styled from 'styled-components';

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/Work'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Wrapper />}>
          <Route path ='/' element={<Home />} />
          <Route path ='/work' element={<About />} />
          <Route path ='/contact' element={<Contact />} />
          <Route path ='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  height: 100%;

  & > *:first-child {
    flex-grow: 1;
  }
`

function Wrapper() {
  return (
    <Suspense>
      <GlobalStyle />
      <StyledDiv>
        <Outlet />
        <Copyright />
      </StyledDiv>
    </Suspense>
  )
}
