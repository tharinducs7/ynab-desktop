/* eslint-disable react/require-default-props */
import React from 'react';
import { Upload, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  name: string;
  label: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
  maxCount?: number;
}

const ImageUploaderField: React.FC<Props> = ({
  name,
  label,
  readOnly = false,
  required,
  rules,
  maxCount = 5,
}) => {
  const handleBeforeUpload = (file: File) => {
    const isAllowedType = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
    ].includes(file.type);

    if (!isAllowedType) {
      message.error('Only JPEG, PNG, JPG, and GIF files are allowed.');
    }

    // prevent upload, handled externally
    return isAllowedType ? false : Upload.LIST_IGNORE;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <Form.Item
      label={label}
      name={name}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={rules}
      required={required}
    >
      <Upload
        listType="picture-card"
        multiple
        maxCount={maxCount}
        beforeUpload={handleBeforeUpload}
        disabled={readOnly}
      >
        {!readOnly && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};

export default ImageUploaderField;
