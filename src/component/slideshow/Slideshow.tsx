import React from 'react'
import styled from 'styled-components'

import patioImg from './img/patio.png'
import patio2Img from './img/patio2.png'
import patio3Img from './img/patio3.png'

const blankImg = require('./img/blank.png')

// function loadSlideImg(path: string, alt: string) {
  

//   const test = new Promise((resolve, reject) => {

//   })

//   return React.lazy(new Promise((resolve, reject) => {

//   }))

//   // React.lazy(() => require(path))
//   // React.lazy(() => (<SlideImg src={path} alt={alt}/>))
//   // return React.lazy(() => (<SlideImg src={path} alt={alt}/>))
// }

// const patioImg = React.lazy(() => import('./img/patio.png'))
// const patio2Img = React.lazy(() => require('./img/patio2.png'))
// const patio3Img = React.lazy(() => require('./img/patio3.png'))

// type ImgData = { src: React.LazyExoticComponent<React.ComponentType<any>>, alt: string }
type ImgData = { src: string, alt: string }
const slideshowImgs: ImgData[] = [
  { src: patioImg, alt: 'Image of a patio' },
  { src: patio2Img, alt: 'Modified image of a patio'},
  { src: patio3Img, alt: 'Modified image of a patio'}
]

const Container = styled.div`
  position: relative;
  display: flex;
  
  img {
    width: 100%;
  }
`

const SlideImg = styled.img`
  position: absolute;
`

const Buttons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  button {
    width: 1rem;
    height: 1rem;
    background-color: var(--white-1-transp);
    border-radius: 50%;
    margin: 0.75rem 0.5rem;
    border: none;

    &:hover {
      cursor: pointer;
    }

    &.active {
      background-color: var(--white-1);
    }
  }
`

export default function Slideshow() {
  const [slideIndex, setSlide] = React.useState<number>(0)
  const slide = slideshowImgs[slideIndex]

  return (
    <Container>
      <img src={blankImg} alt='Blank' />
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <SlideImg src={slide.src} alt={slide.alt} />
      </React.Suspense>
      {/* {
        slideshowImgs.map((img, i) => {
          return <React.Suspense key={'slideshow-suspense-img-' + i}>
            <SlideImg src={img.src} alt={img.alt} className={i === slideIndex ? 'slide active' : 'slide'} />
          </React.Suspense>
        })
      } */}
      <Buttons>
        {
          slideshowImgs.map((_, i) => {
            return <button id={'slideshow-btn-' + i} className={i === slideIndex ? 'active' : ''} onClick={() => { setSlide(i) }} key={'slideshow-btn-' + i} />
          })
        }
      </Buttons>
    </Container>
  )
}
