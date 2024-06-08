import { useState } from "react";
import Image from "next/image";
import ImageShimmer from "../shimmers/ImageShimmer";

/**
 * Props for the ShimmerImage component.
 * @interface ShimmerImageProps
 * @property {any} src - The source of the image.
 * @property {string} alt - The alternative text for the image.
 * @property {number} width - The width of the image.
 * @property {number} height - The height of the image.
 * @property {string} className - Additional classes for styling the image.
 * @property {string} [figClassName] - Additional classes for styling the figure element.
 * @property {boolean} [blurEffect] - Whether to apply a blur effect to the image.
 * @property {boolean} [priority] - Whether to prioritize loading the image.
 * @property {any} [fill] - The fill property for the image.
 * @property {string} [borderRadius] - The border radius of the image.
 */
interface ShimmerImageProps {
  src: any;
  alt: string;
  width: number;
  height: number;
  className: string;
  figClassName?: string;
  blurEffect?: boolean;
  priority?: boolean;
  fill?: any;
  borderRadius?: string;
}

/**
 * ShimmerImage component displaying an image with a shimmer effect while loading.
 * @param {ShimmerImageProps} props - The props for the ShimmerImage component.
 * @returns {JSX.Element} - The ShimmerImage JSX element.
 */
const ShimmerImage = ({ alt, ...rest }: ShimmerImageProps): JSX.Element => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <ImageShimmer
        show={!imageLoaded}
        className={rest.className}
        height={rest.height}
        borderRadius={rest.borderRadius}
        width={rest.width}
      />
      <Image
        {...rest}
        onLoadingComplete={() => setImageLoaded(true)}
        className={`overflow-hidden transition-all duration-[0.3s] ease-in-out
          ${!imageLoaded ? "blur-xl grayscale" : "blur-0 grayscale-0"} ${
          rest.className
        }`}
        style={{
          visibility: imageLoaded ? "visible" : "hidden",
          position: imageLoaded ? "relative" : "absolute",
        }}
        alt={alt}
      />
    </>
  );
};

export default ShimmerImage;
