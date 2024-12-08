'use client';

import ImageBox from "@/app/components/imageBox";
import { ImageData } from "@/app/util/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { IoArrowBack, IoArrowForward, IoCog } from "react-icons/io5";

const SlideshowEditor: React.FC<{
  type: 'featured' | 'published';
  idList: string[];
  images: { [id: string]: ImageData };
}> = ({
  type,
  idList,
  images
}) => {

    const router = useRouter();
    const [loadingImages, setLoadingImages] = useState<number[]>([]);

    const arrowClick = useCallback((direction: 'right' | 'left', index: number) => {
      const formData = new FormData();
      formData.append('index1', `${index}`)
      const index2 = direction === 'right' ? index + 1 : index - 1;
      formData.append('index2', `${index2}`);

      const response = fetch(`/api/admin/edit/${type}`, { method: 'PUT', body: formData });
      setLoadingImages([index, index2]);
      response.then(async (response) => {
        if (response.ok) {
          await new Promise((r) => { setTimeout(r, 500) });
          router.refresh();
        }
        setLoadingImages([]);
      });
    }, [router, type]);

    return (
      <div
        className="h-48 overflow-x-scroll flex border-x-4 border-theme-dark-gray self-stretch"
      >
        {idList.length === 0 && (<div className="w-full flex items-center justify-center">[ No Images ]</div>)}
        <div className="flex p-2 gap-x-2">
          {
            idList.map((id, index) => {
              const image = images[id];
              if (!image) { return; }
              return (
                <div key={id} className="flex flex-col items-stretch w-64">
                  <Link href={`/admin/image/${id}`} className="relative grow">
                    <ImageBox
                      src={`/images/${image.filename}`}
                      placeholder={image.placeholder}
                      alt="Featured image preview"
                      className="w-full h-full hover:bg-theme-gold/50"
                    />
                    {
                      loadingImages.includes(index) && (
                        <div className="absolute bg-theme-dark-gray/50 inset-0 rounded flex items-center justify-center">
                          <IoCog className="text-white text-6xl animate-spin" />
                        </div>
                      )
                    }
                  </Link>
                  <div className="flex justify-center px-2 gap-x-2">
                    {idList[0] !== id && (
                      <button
                        onClick={() => { if (!loadingImages.includes(index)) { arrowClick('left', index); } }}
                        className={loadingImages.includes(index) ? 'cursor-wait' : ''}
                      >
                        <IoArrowBack />
                      </button>
                    )}
                    <span className={`grow text-center truncate ${!image.name ? 'invisible' : ''}`}>{image.name ?? "-"}</span>
                    {idList[idList.length - 1] !== id && (
                      <button
                        onClick={() => { if (!loadingImages.includes(index)) { arrowClick('right', index); } }}
                        className={loadingImages.includes(index) ? 'cursor-wait' : ''}
                      >
                        <IoArrowForward />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          }
        </div>
      </div >
    );
  };

export default SlideshowEditor;
