/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Upload, Form, message } from 'antd';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload';

interface Props {
  name: string;
  label: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
  maxCount?: number;
  imageList?: UploadFile[]; // passed as initial image(s)
}

const ImageUploaderField: React.FC<Props> = ({
  name,
  label,
  readOnly = false,
  required,
  rules,
  maxCount = 1,
  imageList = [],
}) => {
  const [existingImage, setExistingImage] = useState<UploadFile | null>(null);
  const [newImage, setNewImage] = useState<UploadFile | null>(null);

  useEffect(() => {
    if (imageList.length > 0 && imageList[0].url) {
      setExistingImage(imageList[0]);
    }
  }, [imageList]);

  const normFile = (e: any) => {
    const fileList = Array.isArray(e) ? e : e?.fileList || [];
    return fileList;
  };

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
    if (isAllowedType) {
      const previewUrl = URL.createObjectURL(file);
      setNewImage({
        uid: `${file.name}-${Date.now()}`,
        name: file.name,
        status: 'done',
        url: previewUrl,
        originFileObj: file as RcFile,
      });
      setExistingImage(null); // remove old image
    }
    return false; // prevent upload
  };

  const handleRemove = () => {
    setExistingImage(null);
    setNewImage(null);
  };

  const imageToShow = newImage || existingImage;

  return (
    <Form.Item
      label={label}
      name={name}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={rules}
      required={required}
      hasFeedback
      labelCol={{ flex: '160px' }} // Give label a fixed width that can wrap
      wrapperCol={{ flex: 1 }} // Remaining space for input
      labelAlign="left"
      colon={false}
      style={{ marginBottom: 16 }}
    >
      {imageToShow ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={imageToShow.url}
            alt={imageToShow.name}
            style={{
              width: 120,
              height: 120,
              borderRadius: 6,
              objectFit: 'cover',
            }}
          />
          {!readOnly && (
            <CloseCircleFilled
              onClick={handleRemove}
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                fontSize: 18,
                color: '#f5222d',
                background: '#fff',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
          )}
        </div>
      ) : (
        !readOnly && (
          <Upload
            listType="picture-card"
            multiple={false}
            maxCount={maxCount}
            beforeUpload={handleBeforeUpload}
            showUploadList={false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        )
      )}
    </Form.Item>
  );
};

export default ImageUploaderField;
