import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

/**
 * Props for the TableShimmer component.
 */
interface TableShimmerProps {}

/**
 * TableShimmer component displays a shimmer effect to mimic loading data in a table.
 * @param {TableShimmerProps} props - The props for the TableShimmer component.
 * @returns {JSX.Element} - The TableShimmer JSX element.
 */
const TableShimmer: React.FC<TableShimmerProps> = () => {
  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#ffffff">
      <div className="flex items-center justify-between rounded-2xl border p-2 lg:p-3">
        <div className="flex items-center gap-6">
          <figure className="h-12 w-12 shrink-0 overflow-hidden rounded-lg lg:h-24 lg:w-24">
            <Skeleton
              containerClassName="flex w-full"
              className="h-full w-full object-cover"
              height={96}
              width={96}
              inline={true}
              borderRadius="0.5rem"
            />
          </figure>
          <div className="flex w-60 flex-col gap-2.5 truncate">
            <h3 className="fs-20 text-martinique w-full truncate font-bold leading-6">
              <Skeleton
                containerClassName="!w-full"
                className="fs-20 text-martinique w-full truncate font-bold leading-6"
                height={24}
                width={240}
                borderRadius="98px"
              />
            </h3>
            <p className="fs-16 text-dolphin w-full truncate leading-4">
              <Skeleton
                containerClassName="!w-full"
                className="fs-16 text-dolphin w-full truncate leading-4"
                height={20}
                width={240}
                borderRadius="98px"
              />
            </p>
          </div>
        </div>
        <div className="w-80">
          <p className="text-scarpaflow line-clamp-2 text-sm leading-5">
            <Skeleton
              containerClassName="!w-full"
              className="text-scarpaflow line-clamp-2 text-sm leading-5"
              height={40}
              width={240}
              borderRadius="98px"
            />
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Skeleton
            containerClassName="!w-full"
            className="text-scarpaflow line-clamp-2 text-sm leading-5"
            height={36}
            width={92}
            borderRadius="98px"
          />
          <Skeleton
            containerClassName="!w-full"
            className="text-scarpaflow line-clamp-2 text-sm leading-5"
            height={24}
            width={24}
            borderRadius="6px"
          />
        </div>
        <p className="text-dolphin text-base leading-5">
          <Skeleton
            containerClassName="!w-full"
            className="text-scarpaflow line-clamp-2 text-sm leading-5"
            height={30}
            width={120}
            borderRadius="98px"
          />
        </p>
        <p className="text-dolphin text-base leading-5">
          <Skeleton
            containerClassName="!w-full"
            className="text-scarpaflow line-clamp-2 text-sm leading-5"
            height={30}
            width={120}
            borderRadius="98px"
          />
        </p>
        <p className="text-dolphin text-base leading-5">
          <Skeleton
            containerClassName="!w-full"
            className="text-scarpaflow line-clamp-2 text-sm leading-5"
            height={30}
            width={120}
            borderRadius="98px"
          />
        </p>
        <div className="">
          <Skeleton
            containerClassName="!w-full"
            className="text-scarpaflow line-clamp-2 text-sm leading-5"
            height={32}
            width={24}
            borderRadius="4px"
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableShimmer;
