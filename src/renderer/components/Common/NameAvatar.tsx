/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import React, { useMemo } from 'react';
import { Avatar, Space, Typography } from 'antd';

const { Text } = Typography;

interface NameAvatarProps {
  /** Full name or label */
  name: string;
  /** Optional array of colors to pick from */
  colors?: string[];
  /** Avatar size */
  size?: number;
}

/**
 * NameAvatar: displays an Ant Design Avatar with the first two letters of the given name
 * and a random background color (from provided palette) next to the full name.
 */
const NameAvatar: React.FC<NameAvatarProps> = ({
  name,
  colors = [
    '#ffec3d', // Yellow
    '#f56a00', // Orange
    '#ff9c6e', // Orange-Red
    '#ff7a45', // Red-Orange
    '#ff4d4f', // Red
    '#f5222d', // Red-Pink
    '#ff91a4', // Light Pink
    '#ff85c0', // Pink
    '#b37feb', // Purple
    '#5c6bc0', // Blue-Purple
    '#1890ff', // Blue
    '#73a7ff', // Light Blue
    '#69c0ff', // Sky Blue
    '#d6e4ff', // Light Blue
    '#b0e0e6', // Light Teal
    '#95de64', // Green
    '#73d13d', // Light Green
    '#ffc069', // Light Yellow
    '#fde3cf', // Light Yellow
  ],
  size = 32,
}) => {
  // Get the first letter of the first name and the first letter of the last name
  const initials = name
    .split(' ') // Split by spaces (assuming first and last name)
    .map((part) => part.charAt(0).toUpperCase()) // Get the first character of each part
    .slice(0, 2) // Ensure only two letters
    .join(''); // Join them together

  // Compute initial and select a color once per name
  const { bgColor, textColor } = useMemo(() => {
    const idx = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[idx];

    // Determine the text color for contrast (black or white)
    const brightness =
      parseInt(selectedColor.slice(1, 3), 16) * 0.299 +
      parseInt(selectedColor.slice(3, 5), 16) * 0.587 +
      parseInt(selectedColor.slice(5, 7), 16) * 0.114;
    const textColor = brightness > 186 ? '#000' : '#fff'; // If brightness is high, use black; else white

    return {
      bgColor: selectedColor,
      textColor,
    };
  }, [colors]);

  return (
    <Space align="center">
      <Avatar
        size={size}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {initials}
      </Avatar>
      <Text>{name}</Text>
    </Space>
  );
};

export default NameAvatar;
