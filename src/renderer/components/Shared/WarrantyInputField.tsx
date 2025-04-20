/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Input, Form } from 'antd';
import FormFieldWrapper from './FormFieldWrapper';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
}

const WarrantyField: React.FC<Props> = ({
  placeholder = 'e.g., 1 month, 6 months',
  required = false,
  rules = [],
  ...restProps
}) => {
  const form = Form.useFormInstance();

  const normalizeUnit = (value: string) => {
    const match = value.trim().match(/^(\d+)\s*(day|week|month|year)s?$/i);
    if (!match) return value;
    const num = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    return `${num} ${unit}${num > 1 ? 's' : ''}`;
  };

  const validateFormat = (_: any, value: string) => {
    if (!value) return Promise.resolve();
    const isValid =
      /^\d+\s(day|days|week|weeks|month|months|year|years)$/i.test(
        value.trim(),
      );
    return isValid
      ? Promise.resolve()
      : Promise.reject('Enter a valid format like "1 month", "2 years"');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = normalizeUnit(e.target.value);
    if (formatted !== e.target.value) {
      form.setFieldsValue({ [restProps.name]: formatted });
    }
  };

  return (
    <FormFieldWrapper
      {...restProps}
      rules={[
        ...(required
          ? [{ required: true, message: 'This field is required' }]
          : []),
        { validator: validateFormat },
        ...rules,
      ]}
    >
      <Input
        placeholder={placeholder}
        readOnly={restProps.readOnly}
        onBlur={handleBlur}
      />
    </FormFieldWrapper>
  );
};

export default WarrantyField;
