import React from 'react';
import styled from 'styled-components'
import Content from '../component/Content';
import Nav from '../component/Nav';
import Columns from '../component/Columns';
import Slideshow from '../component/slideshow/Slideshow';

const TitleBgImg = require('./home/title-bg.png')

const TitleContainer = styled.div`
  position: relative;

  section {
    height: 72vh;
    text-shadow: 0 0 1rem #000, 0 0 1rem #000000;

    h1 {
      color: var(--gold);
    }

    h4 {
      color: #ffffff;
    }
  }
`

const TitleBackground = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 132%;
  background-image: url(${TitleBgImg});
  background-color: var(--dark-gray);
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
`

function Title() {
  return (
    <TitleContainer>
      <TitleBackground />
      <section>
        <div>
          <h1>Anthony DePaul Masonry Inc.</h1>
          <h4>Montgomery County, PA</h4>
        </div>
      </section>
    </TitleContainer>
  )
}

const AboutContainer = styled.div`
  position: relative;

  section {
    color: var(--dark-gray);

    h4 {
      color: #000000;
      margin-bottom: 50px;
    }

    p {
      margin-bottom: 50px;
    }
  }
`

const AboutBackground = styled.div`
  position: absolute;
  z-index: -2;
  width: 100%;
  height: 100%;
  background-color: var(--light-gray);
`

const AboutSlideShowContainer = styled.div`
  margin: 50px 0;
  box-shadow: 0 0 2rem #00000085;
  border: 10px solid var(--white-1);
`

const AboutColumns = styled(Columns)`
  margin-bottom: 50px;
`

function About() {
  return (
    <AboutContainer>
        <AboutBackground />
        <section>
            <Content>
              <Nav activePage='home' />
              <AboutSlideShowContainer><Slideshow /></AboutSlideShowContainer>
              <h4>- About -</h4>
              <p>
                With over thirty-five years of experience, Anthony J DePaul Masonry Inc. is a masonry contractor located in Glenside, Pennsylvania serving the greater Montgomery County area. 
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At quibusdam repudiandae fugiat officiis sit ipsum natus inventore tenetur, nam necessitatibus libero minima consequatur corrupti nobis omnis ad repellendus autem delectus blanditiis excepturi quidem sunt reiciendis! Harum perspiciatis sapiente omnis ducimus nesciunt accusantium atque iste molestias, eius architecto odio laboriosam distinctio!
              </p>
              <AboutColumns variant='space-around'>
                <ul>
                  <li>Stone</li>
                  <li>Concrete</li>
                  <li>Brick</li>
                  <li>Stucco</li>
                  <li>Foundations</li>
                </ul>
                <ul>
                  <li>Block</li>
                  <li>Pointing</li>
                  <li>Fireplaces</li>
                  <li>Flagstone</li>
                  <li>Waterproofing</li>
                </ul>
              </AboutColumns>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae voluptates eaque officia praesentium maiores numquam nostrum consequuntur, voluptate sint aliquid provident. Consectetur velit officia modi neque quae quibusdam adipisci, fuga repellendus iste quo atque accusantium reprehenderit architecto, eum soluta vel autem perspiciatis veritatis. Rem, quidem consectetur. Ipsam, itaque laudantium.
              </p>
            </Content>
        </section>
    </AboutContainer>
  )
}

const ExploreBgImg = require('./home/explore-bg.png')

const ExploreSection = styled.section`
  background-image: url(${ExploreBgImg});
  background-color: var(--dark-gray);
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  color: #ffffff;

  h4 {
    margin-bottom: 25px;
  }

  p {
    margin-bottom: 50px;
  }

  a {
    background-color: var(--gold);
    margin-top: auto;
    padding: 5px 25px;
    text-decoration: none;
    color: #000000;
    font-size: 1.777rem;
  }
`

const ExploreContent = styled(Content)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  padding: 150px 0;
`

const ExploreBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-color: #0000009a;
  padding: 25px;
  width: 35%;
`

function Explore() {
  return (
    <ExploreSection>
      <ExploreContent>
        <ExploreBox>
          <h4>─ Work ─</h4>
          <p>Checkout our previous work. Filler filler filler filler filler. Filler filler filler filler filler. Filler filler filler filler filler. Filler filler filler filler filler.</p>
          <a href="/work">Work</a>
        </ExploreBox>
        <ExploreBox>
        <h4>─ Contact ─</h4>
        <p>For a free quote, visit our contact page. Yada yada yada yada yada yada yada. Yada yada yada yada yada yada yada. Yada yada yada yada yada yada yada.</p>
        <a href="/contact">Contact</a>
        </ExploreBox>
      </ExploreContent>
    </ExploreSection>
  )
}

export default function Home() {
  return (
    <>
      <Title />
      <About />
      <Explore />
    </>
  )
}
