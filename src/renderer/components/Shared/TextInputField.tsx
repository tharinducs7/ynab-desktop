/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Input } from 'antd';
import FormFieldWrapper from './FormFieldWrapper';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
}

const TextInputField: React.FC<Props> = ({ placeholder, ...restProps }) => {
  return (
    <FormFieldWrapper {...restProps}>
      <Input placeholder={placeholder} />
    </FormFieldWrapper>
  );
};

export default TextInputField;
