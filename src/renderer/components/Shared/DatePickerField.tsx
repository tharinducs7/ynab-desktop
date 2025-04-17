/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DatePicker } from 'antd';
import FormFieldWrapper from './FormFieldWrapper';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
}

const DatePickerField: React.FC<Props> = (props) => {
  return (
    <FormFieldWrapper {...props}>
      <DatePicker
        style={{ width: '100%' }}
        placeholder={props.placeholder}
        disabled={props.readOnly}
      />
    </FormFieldWrapper>
  );
};

export default DatePickerField;
