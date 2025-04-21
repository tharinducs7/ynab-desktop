/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Carousel, Image } from 'antd';

interface Props {
  images: { url: string; name?: string }[];
}

const ImageCarousel: React.FC<Props> = ({ images }) => {
  return (
    <Carousel autoplay>
      {images.map((img, index) => (
        <div key={index}>
          <Image
            src={img.url}
            alt={img.name || `Image-${index}`}
            width="100%"
            height={200}
            style={{ objectFit: 'contain' }}
            preview={false}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
