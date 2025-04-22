/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Input, Form, Tooltip, Avatar } from 'antd';
import FormFieldWrapper from './FormFieldWrapper';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
}

const RegistrationNoField: React.FC<Props> = ({
  placeholder = 'e.g., PV 123456',
  required = false,
  rules = [],
  ...restProps
}) => {
  const form = Form.useFormInstance();
  const [companyType, setCompanyType] = useState<string | null>(null);
  const [companyPrefix, setCompanyPrefix] = useState<string | null>(null);
  const [companyYear, setCompanyYear] = useState<string | null>(null);
  const [formattedValue, setFormattedValue] = useState<string>('');

  // Format registration number
  const formatRegistrationNumber = (value: string) => {
    if (!value) return value;

    // Remove extra spaces and convert to uppercase
    let formatted = value.trim().toUpperCase();

    // Make sure PV/PB has a space after it
    formatted = formatted.replace(/^(PV|PB)(?!\s)/i, '$1 ');

    // Handle year format (if present)
    if (formatted.includes('(') && !formatted.includes(')')) {
      formatted = formatted.replace(/\((\d+)$/, '($1)');
    } else if (formatted.match(/\d+\s+\d{4}$/)) {
      // Convert "PV 123456 2022" to "PV 123456 (2022)"
      formatted = formatted.replace(/(\d+)\s+(\d{4})$/, '$1 ($2)');
    }

    return formatted;
  };

  // Determine company type and registration year
  const determineCompanyInfo = (value: string) => {
    if (!value) return { type: null, prefix: null, year: null };

    const uppercaseValue = value.toUpperCase();
    let type = null;
    let prefix = null;
    let year = null;

    // Check for company type
    if (uppercaseValue.startsWith('PV')) {
      type = 'private';
      prefix = 'PV';
    } else if (uppercaseValue.startsWith('PB')) {
      type = 'public';
      prefix = 'PB';
    }

    // Extract year if present
    const yearMatch = uppercaseValue.match(/\((\d{4})\)/);
    if (yearMatch && yearMatch[1]) {
      year = yearMatch[1];
    }

    return { type, prefix, year };
  };

  // Validate registration number format
  const validateRegistrationNumber = (_: any, value: string) => {
    if (!value) return Promise.resolve();

    const uppercaseValue = value.toUpperCase();

    // Basic format validation
    if (!uppercaseValue.match(/^(PV|PB)\s+\d+(\s+\(\d{4}\))?$/)) {
      return Promise.reject(
        'Invalid registration number format. Expected format: PV/PB XXXXXX or PV/PB XXXXXX (YYYY)',
      );
    }

    return Promise.resolve();
  };

  // Handle blur event to format the number
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) return;

    const formatted = formatRegistrationNumber(value);

    if (formatted !== value) {
      form.setFieldsValue({ [restProps.name]: formatted });
      updateTypeAndYear(formatted);
    }
  };

  // Handle change event to update type immediately
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateTypeAndYear(value);
  };

  // Update company type and year
  const updateTypeAndYear = (value: string) => {
    const { type, prefix, year } = determineCompanyInfo(value);
    setCompanyType(type);
    setCompanyPrefix(prefix);
    setCompanyYear(year);
    setFormattedValue(value);
  };

  // On initial mount and when the field name changes
  useEffect(() => {
    // Get initial field value
    const initialValue = form.getFieldValue(restProps.name);

    if (initialValue) {
      const formatted = formatRegistrationNumber(initialValue);

      // Update the form with formatted value if different
      if (formatted !== initialValue) {
        form.setFieldsValue({ [restProps.name]: formatted });
      }

      updateTypeAndYear(formatted || initialValue);
    }

    // Create a watcher for field value changes
    const intervalId = setInterval(() => {
      const currentValue = form.getFieldValue(restProps.name);
      if (currentValue && currentValue !== formattedValue) {
        updateTypeAndYear(currentValue);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [form, restProps.name]);

  // Create prefix element with avatar
  const prefixElement = companyPrefix ? (
    <Tooltip
      title={
        companyType === 'public'
          ? 'Public Limited Company'
          : 'Private Limited Company'
      }
    >
      <Avatar
        size={24}
        style={{
          backgroundColor: '#FFC107',
          color: '#000',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {companyPrefix}
      </Avatar>
    </Tooltip>
  ) : null;

  // Create suffix element
  const suffixElement = companyYear ? (
    <Tooltip title={`Registered in ${companyYear}`}>
      <span style={{ color: '#666', fontSize: '12px' }}>{companyYear}</span>
    </Tooltip>
  ) : null;

  return (
    <FormFieldWrapper
      {...restProps}
      rules={[
        ...(required
          ? [{ required: true, message: 'Registration number is required' }]
          : []),
        { validator: validateRegistrationNumber },
        ...rules,
      ]}
    >
      <Input
        placeholder={placeholder}
        readOnly={restProps.readOnly}
        onBlur={handleBlur}
        onChange={handleChange}
        maxLength={20}
        prefix={prefixElement}
        suffix={suffixElement}
      />
    </FormFieldWrapper>
  );
};

export default RegistrationNoField;
