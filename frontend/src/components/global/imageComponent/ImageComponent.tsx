import Image, { ImageProps } from "next/image";

/**
 * Props for the ImageComponent.
 * @interface ImageComponentProps
 * @property {any} src - The source of the image.
 * @property {number} [width] - The width of the image.
 * @property {number} [height] - The height of the image.
 * @property {string} [className] - Additional classes for styling the image.
 * @property {string} [figClassName] - Additional classes for styling the figure element.
 * @property {string} [alt] - The alt text for the image.
 * @property {boolean} [blurEffect] - Whether to apply a blur effect to the image.
 * @property {boolean} [priority] - Whether to prioritize loading the image.
 * @property {any} [fill] - The fill property for the image.
 */
interface ImageComponentProps {
  src: any;
  width?: number;
  height?: number;
  className?: string;
  figClassName?: string;
  alt?: string;
  blurEffect?: boolean;
  priority?: boolean;
  fill?: any;
}

/**
 * Image component using Next.js Image component.
 * @param {ImageComponentProps} props - The props for the ImageComponent.
 * @returns {JSX.Element} - The ImageComponent JSX element.
 */
const ImageComponent = ({
  src,
  width,
  height,
  className,
  figClassName,
  alt,
  blurEffect,
  priority,
  fill,
  ...rest
}: ImageComponentProps): JSX.Element => {
  return (
    <figure
      className={`leading-0 relative ${figClassName ? figClassName : ""}`}
    >
      <Image
        src={src}
        fill={fill}
        width={width}
        height={height}
        className={className}
        placeholder={!blurEffect ? "empty" : "blur"}
        blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
        alt={alt || "Image"} // Provide a default value for alt to handle the possible undefined case
        priority={priority}
        {...rest}
      />
    </figure>
  );
};

export default ImageComponent;
