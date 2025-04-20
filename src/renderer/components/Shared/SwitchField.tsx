/* eslint-disable react/require-default-props */
import React from 'react';
import { Form, Switch } from 'antd';

interface Props {
  name: string;
  label: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
}

const SwitchField: React.FC<Props> = ({
  name,
  label,
  readOnly,
  required,
  rules,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      rules={rules}
      valuePropName="checked"
      getValueFromEvent={(checked: boolean) => checked}
      normalize={(value: any) => value === 1 || value === true}
    >
      <Switch disabled={readOnly} />
    </Form.Item>
  );
};

export default SwitchField;
