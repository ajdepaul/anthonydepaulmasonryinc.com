import styled from 'styled-components'
import { H1, H4 } from '../../component/Header';
import Section from '../../component/Section';
const TitleBgImg = require('./title-bg.png')

const Container = styled.div`
  position: relative;
`

const StyledSection = styled(Section)`
  height: 72vh;
  text-shadow: 0 0 1rem #000, 0 0 1rem #000000;
`

const Background = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 132%;
  background-image: url(${TitleBgImg});
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
`

const TitleText = styled(H1)`
  color: var(--gold);
`

const SubtitleText = styled(H4)`
  color: #ffffff;
`

export default function Title() {
  return (
    <Container>
      <Background />
      <StyledSection>
        <div>
          <TitleText>Anthony DePaul Masonry Inc.</TitleText>
          <SubtitleText>Cumberland County, PA</SubtitleText>
        </div>
      </StyledSection>
    </Container>
  )
}
