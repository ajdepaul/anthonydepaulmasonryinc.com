import React from 'react'
import './Slideshow.css'
// import doesn't work for some reason
const blankImg = require('./blank.png')
const patioImg = require('./patio.png')
const patio2Img = require('./patio2.png')
const patio3Img = require('./patio3.png')

type ImgData = { src: string, alt: string }
const slideshowImgs: ImgData[] = [
  { src: patioImg, alt: "Image of a patio" },
  { src: patio2Img, alt: "Modified image of a patio"},
  { src: patio3Img, alt: "Modified image of a patio"}
]

export default function Slideshow() {
  return (
    <div id="slideshow">
      <img src={blankImg} id="slideshow-blank" />
      {
        slideshowImgs.map((img, i) => {
          return <React.Suspense>
            <img src={img.src} alt={img.alt} className={i === 0 ? "slide active" : "slide"} />
          </React.Suspense>
        })
      }
      {/* <div>
        { slideshowImgs.map(() => { return <button /> }) }
      </div> */}
    </div>
  )
}
