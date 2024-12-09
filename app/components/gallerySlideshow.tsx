'use client';

import ImageBox from "@/app/components/imageBox";
import Slideshow from "@/app/components/slideshow";
import { ImageData } from "@/app/util/data";
import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";

type ImageSelectListener = (ImageIndex: number) => void;

type GalleryContextType = {
  currentImage: number;
  setCurrentImage: (imageIndex: number) => void;
  addImageSelectListener: (listener: ImageSelectListener) => void;
};

const GalleryContext = createContext<GalleryContextType | null>(null);

const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageSelectListeners, setImageSelectListeners] = useState<ImageSelectListener[]>([]);

  const addImageSelectListener = (listener: ImageSelectListener) => {
    setImageSelectListeners([...imageSelectListeners, listener]);
  }

  const setCurrentImageWithListeners = useCallback((imageIndex: number) => {
    for (const listener of imageSelectListeners) { listener(imageIndex); }
    setCurrentImage(imageIndex);
  }, [imageSelectListeners]);


  return (
    <GalleryContext.Provider
      value={{
        currentImage,
        setCurrentImage: setCurrentImageWithListeners,
        addImageSelectListener
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

const useGallery: () => GalleryContextType | null = () => useContext(GalleryContext);

const GallerySlideshow: React.FC<{ images: ImageData[] }> = ({ images }) => (
  <GalleryProvider><GalleryContent images={images} /></GalleryProvider>
);

const GalleryContent: React.FC<{ images: ImageData[] }> = ({ images }) => {
  const { currentImage, setCurrentImage } = useGallery() as GalleryContextType;
  return (
    <>
      <Slideshow images={images} />
      <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {
          images.map((image, index) => {
            const mainAltText = `Slideshow image ${index}`;
            const nameAltText = image.name ? `; Image name: ${image.name}` : ''
            const descriptionAltText = image.description ? `; Image description: ${image.description}` : '';
            return (
              <button key={index} onClick={() => { setCurrentImage(index); }}>
                <ImageBox
                  src={`/images/${image.filename}`}
                  alt={`${mainAltText}${nameAltText}${descriptionAltText}`}
                  placeholder={image.placeholder}
                  className={`h-36 ${currentImage !== index ? 'opacity-50' : ''}`}
                />
              </button>
            );
          })
        }
      </div>
    </>
  );
}

export default GallerySlideshow;
export { GalleryProvider, useGallery };

