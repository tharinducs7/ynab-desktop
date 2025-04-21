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
      label={<span style={{ whiteSpace: 'normal' }}>{label}</span>}
      required={required}
      rules={rules}
      valuePropName="checked"
      getValueFromEvent={(checked: boolean) => (checked ? 1 : 0)}
      hasFeedback
      labelCol={{ flex: '160px' }} // Give label a fixed width that can wrap
      wrapperCol={{ flex: 1 }} // Remaining space for input
      labelAlign="left"
      colon={false}
      style={{ marginBottom: 16 }}
    >
      <Switch disabled={readOnly} />
    </Form.Item>
  );
};

export default SwitchField;
