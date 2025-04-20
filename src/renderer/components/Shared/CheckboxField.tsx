/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Checkbox } from 'antd';
import FormFieldWrapper from './FormFieldWrapper';

interface Props {
  name: string;
  label: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
}

const CheckboxField: React.FC<Props> = ({ label, readOnly, ...rest }) => {
  return (
    <FormFieldWrapper label={label} {...rest}>
      <Checkbox disabled={readOnly} />
    </FormFieldWrapper>
  );
};

export default CheckboxField;
