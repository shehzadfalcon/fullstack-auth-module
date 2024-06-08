import React, { CSSProperties } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

/**
 * Props for the ImageShimmer component.
 * @interface ImageShimmerProps
 * @property {number} height - The height of the shimmer.
 * @property {number} width - The width of the shimmer.
 * @property {string} [borderRadius] - The border radius of the shimmer.
 * @property {boolean} [forceDimensions] - Whether to force dimensions for the shimmer.
 * @property {boolean} [show] - Whether to show the shimmer.
 * @property {string} [className] - Additional classes for styling the shimmer.
 */
interface ImageShimmerProps {
  height: number;
  width: number;
  borderRadius?: string;
  forceDimensions?: boolean;
  show?: boolean;
  className?: string;
}

/**
 * ImageShimmer component to display a loading shimmer effect.
 * @param {ImageShimmerProps} props - The props for the ImageShimmer component.
 * @returns {JSX.Element | null} - The ImageShimmer JSX element or null if show is false.
 */
const ImageShimmer: React.FC<ImageShimmerProps> = ({
  height,
  width,
  borderRadius,
  forceDimensions = false,
  show = true,
  className,
}: ImageShimmerProps): JSX.Element | null => {
  if (!show) return null;

  // Styles for the shimmer
  const shimmerStyles: CSSProperties = {
    borderRadius: borderRadius || "12px",
    height: forceDimensions ? `${height}px` : undefined,
    width: forceDimensions ? `${width}px` : undefined,
  };

  return (
    <>
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#ffffff">
        <Skeleton
          containerClassName={`flex ${className}`}
          className="!h-full !w-full rounded-2xl object-cover"
          height={height}
          width={width}
          inline={true}
          style={shimmerStyles}
        />
      </SkeletonTheme>
    </>
  );
};

export default ImageShimmer;
