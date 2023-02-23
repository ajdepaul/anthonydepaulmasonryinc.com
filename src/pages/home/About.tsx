import Nav from '../../component/Nav'
import Slideshow from '../../component/home/slideshow/Slideshow'
import { H4 } from '../../component/Header';
import styled from 'styled-components'
import Columns from '../../component/Columns';
import Section from '../../component/Section';
import Content from '../../component/Content';

const Container = styled.div`
  position: relative;
`

const Background = styled.div`
  position: absolute;
  z-index: -2;
  width: 100%;
  height: 100%;
  background-color: var(--light-gray);
`

const StyledSection = styled(Section)`
  color: var(--dark-gray-text);
`

const StyledH4 = styled(H4)`
  color: #000000;
  margin-bottom: 50px;
`

const StyledP = styled.p`
  margin-bottom: 50px;
`

const StyledColumns = styled(Columns)`
  margin-bottom: 50px;
`

export default function About() {
  return (
    <Container>
        <Background />
        <StyledSection>
            <Content>
              <Nav activePage='home' />
              <Slideshow />
              <StyledH4>─ About ─</StyledH4>
              <StyledP>
                With over thirty{/*TODO check*/} years of experience, Anthony J DePaul Masonry Inc. is a masonry contractor located in Glenside Pennsylvania serving the greater Cumberland County area. 
              </StyledP>
              <StyledP>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At quibusdam repudiandae fugiat officiis sit ipsum natus inventore tenetur, nam necessitatibus libero minima consequatur corrupti nobis omnis ad repellendus autem delectus blanditiis excepturi quidem sunt reiciendis! Harum perspiciatis sapiente omnis ducimus nesciunt accusantium atque iste molestias, eius architecto odio laboriosam distinctio!
              </StyledP>
              <StyledColumns variant='space-around'>
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
              </StyledColumns>
              <StyledP>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae voluptates eaque officia praesentium maiores numquam nostrum consequuntur, voluptate sint aliquid provident. Consectetur velit officia modi neque quae quibusdam adipisci, fuga repellendus iste quo atque accusantium reprehenderit architecto, eum soluta vel autem perspiciatis veritatis. Rem, quidem consectetur. Ipsam, itaque laudantium.
              </StyledP>
            </Content>
        </StyledSection>
    </Container>
  )
}
