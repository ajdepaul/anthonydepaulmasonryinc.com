import Image from "next/image";
import { twMerge } from "tailwind-merge";

/* does not handle sizing */
const ImageBox: React.FC<{
  src: string | File;
  alt: string;
  placeholder?: string;
  className: string;
}> = ({
  src,
  placeholder,
  alt,
  className
}) => {
    return (
      <div
        className={twMerge(
          'relative flex items-center justify-center bg-theme-dark-gray/25 border border-black rounded shadow-md',
          className
        )}
      >
        <Image
          src={src instanceof File ? URL.createObjectURL(src) : src}
          placeholder={placeholder ? 'blur' : undefined}
          blurDataURL={placeholder}
          alt={alt}
          priority={false}
          sizes=""
          fill
          className='object-contain'
        />
      </div>
    );
  }

export default ImageBox;
