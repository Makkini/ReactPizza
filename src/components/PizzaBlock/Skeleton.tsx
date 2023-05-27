import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props:any) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="138" r="120" />
    <rect x="0" y="296" rx="9" ry="9" width="280" height="26" />
    <rect x="0" y="345" rx="9" ry="9" width="280" height="88" />
    <rect x="0" y="448" rx="10" ry="10" width="95" height="30" />
    <rect x="123" y="441" rx="21" ry="21" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
