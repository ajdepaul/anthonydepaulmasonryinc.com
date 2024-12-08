'use client';

import { useGallery } from "@/app/components/gallerySlideshow";
import { H } from "@/app/components/ui/header";
import { ImageData } from "@/app/util/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AutoplayMethods, Swiper as SwiperType } from "swiper/types";

const Slideshow: React.FC<{ images: ImageData[] }> = ({ images }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [autoplay, setAutoplay] = useState<AutoplayMethods | null>(null);
  const [paused, setPaused] = useState<boolean>(false);

  const galleryContext = useGallery();
  const type = galleryContext ? 'gallery' : 'featured';

  useEffect(() => {
    if (swiper && galleryContext) {
      swiper.on('slideChange', (s) => {
        galleryContext.setCurrentImage(s.activeIndex);
      });
    }
  }, [galleryContext, swiper]);

  useEffect(() => {
    if (swiper && galleryContext) {
      swiper.slideTo(galleryContext.currentImage);

    }
  }, [galleryContext, galleryContext?.currentImage, swiper]);

  const imageName = images[galleryContext?.currentImage ?? 0]?.name;
  const imageDescription = images[galleryContext?.currentImage ?? 0]?.description;

  return (
    <div
      onMouseEnter={() => { setPaused(true); autoplay?.stop(); }}
      onMouseLeave={() => { setPaused(false); autoplay?.start(); }}
      className="relative w-full border-8 border-white bg-theme-dark-gray shadow-xl"
    >
      <Swiper
        spaceBetween={16}
        loop={type === 'featured'}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={type === 'featured' && { clickable: true }}
        autoplay={type === 'featured' ? { delay: 5 * 1000 } : undefined}
        onSwiper={(s) => {
          setSwiper(s);
          if (autoplay) { setAutoplay(s.autoplay); }
        }}
      >
        {
          images.map((image, index) => {
            const mainAltText = `Slideshow image ${index}`;
            const nameAltText = image.name ? `; Image name: ${image.name}` : ''
            const descriptionAltText = image.description ? `; Image description: ${image.description}` : '';
            return (
              <SwiperSlide key={image.filename} className="flex items-center justify-center">
                <div className="h-[25rem] bg-theme-dark-gray text-white">
                  <Image
                    src={`/images/${image.filename}`}
                    placeholder={'blur'}
                    blurDataURL={image.placeholder}
                    alt={`${mainAltText}${nameAltText}${descriptionAltText}`}
                    priority={false}
                    sizes=""
                    fill
                    className='object-contain'
                  />
                </div>
              </SwiperSlide>
            );
          })
        }
      </Swiper>
      {
        type === 'featured' && (
          <div className="absolute bottom-0 right-0 text-xl text-white z-40 m-2 bg-black/50 px-2 py-1 rounded">
            {paused ? (<IoPause />) : (<IoPlay />)}
          </div>
        )
      }
      {
        type === 'gallery' && (
          <div className={`flex flex-col items-stretch bg-white gap-y-4 ${(imageName || imageDescription) ? 'pt-4' : ''}`}>
            {imageName && (
              <H level="3" className="text-center text-3xl">
                {imageName}
              </H>
            )}
            {imageDescription && (
              <p className="p-2 h-28 overflow-y-scroll border-y border-theme-dark-gray/50">
                {imageDescription}
              </p>
            )}
          </div>
        )
      }
    </div >
  );
};

export default Slideshow;
