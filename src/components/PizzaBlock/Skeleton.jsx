import React from "react";
import ContentLoader from "react-content-loader";
export const Skeleton = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={4}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#d9d9d9"
      foregroundColor="#ecebeb"
    >
      <circle cx="125" cy="131" r="115" />
      <rect x="22" y="279" rx="10" ry="10" width="228" height="20" />
      <rect x="20" y="318" rx="10" ry="10" width="232" height="88" />
      <rect x="15" y="424" rx="10" ry="10" width="95" height="28" />
      <rect x="113" y="417" rx="20" ry="20" width="143" height="45" />
    </ContentLoader>
  );
};
