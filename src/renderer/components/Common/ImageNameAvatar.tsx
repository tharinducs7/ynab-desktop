/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import React, { useMemo } from 'react';
import { Avatar, Space, Typography } from 'antd';
import multiavatar from '@multiavatar/multiavatar';

const { Text } = Typography;

interface ImageNameAvatarProps {
  /** Full name or label */
  name: string;
  /** Avatar size */
  size?: number;
}

/**
 * ImageNameAvatar: displays an Ant Design Avatar with a generated SVG avatar
 * from the Multiavatar library and shows the full name beside it.
 */
const ImageNameAvatar: React.FC<ImageNameAvatarProps> = ({
  name,
  size = 32,
}) => {
  // Generate SVG avatar once per name
  const avatarSvgUri = useMemo(() => {
    const svg = multiavatar(name);
    const encodedSvg = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');
    return `data:image/svg+xml,${encodedSvg}`;
  }, [name]);

  return (
    <Space align="center">
      <Avatar size={size} src={avatarSvgUri} alt={name} />
      <Text>{name}</Text>
    </Space>
  );
};

export default ImageNameAvatar;
