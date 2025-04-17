/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Input } from 'antd';
import FormFieldWrapper from './FormFieldWrapper';

const { TextArea } = Input;

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
  rows?: number;
}

const TextAreaField: React.FC<Props> = ({ placeholder, rows, ...rest }) => {
  return (
    <FormFieldWrapper {...rest}>
      <TextArea placeholder={placeholder} rows={rows || 4} />
    </FormFieldWrapper>
  );
};

export default TextAreaField;
