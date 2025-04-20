/* eslint-disable react/require-default-props */
import React from 'react';
import { Form } from 'antd';
import type { Rule } from 'antd/es/form';

interface Props {
  name: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  rules?: Rule[];
  readOnly?: boolean;
  disabled?: boolean;
}

const FormFieldWrapper: React.FC<Props> = ({
  name,
  label,
  children,
  required = true,
  rules = [],
  readOnly = false,
  disabled = false,
}) => {
  const baseRules: Rule[] = required
    ? [{ required: true, message: `Please enter ${label.toLowerCase()}` }]
    : [];

  const clonedChild = React.isValidElement(children)
    ? React.cloneElement(children, {
        ...(readOnly ? { readOnly: true } : {}),
        ...(disabled ? { disabled: true } : {}),
      })
    : children;

  return (
    <Form.Item
      name={name}
      label={<span style={{ whiteSpace: 'normal' }}>{label}</span>}
      rules={[...baseRules, ...rules]}
      hasFeedback
      labelCol={{ flex: '160px' }} // Give label a fixed width that can wrap
      wrapperCol={{ flex: 1 }} // Remaining space for input
      labelAlign="left"
      colon={false}
      style={{ marginBottom: 16 }}
    >
      {clonedChild}
    </Form.Item>
  );
};

export default FormFieldWrapper;
