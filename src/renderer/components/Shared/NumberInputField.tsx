/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { InputNumber } from 'antd';
import FormFieldWrapper from './FormFieldWrapper';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
  min?: number;
  max?: number;
  labelCol?: string;
}

const NumberInputField: React.FC<Props> = (props) => {
  return (
    <FormFieldWrapper {...props}>
      <InputNumber
        min={props?.min}
        max={props?.max}
        style={{ width: '100%' }}
        placeholder={props.placeholder}
      />
    </FormFieldWrapper>
  );
};

export default NumberInputField;
