/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Input, Form } from 'antd';
import FormFieldWrapper from './FormFieldWrapper';
import dialogLogo from '../../../resources/assets/icons/dialog.png';
import mobitelLogo from '../../../resources/assets/icons/mobitel.png';
import airtelLogo from '../../../resources/assets/icons/airtel.png';
import hutchLogo from '../../../resources/assets/icons/hutch.png';
import sltLogo from '../../../resources/assets/icons/slt.png';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rules?: any[];
}

const ContactNumberField: React.FC<Props> = ({
  placeholder = 'e.g., 077-123-4567',
  required = false,
  rules = [],
  ...restProps
}) => {
  const form = Form.useFormInstance();
  const [networkProvider, setNetworkProvider] = useState<string | null>(null);
  const [locationSuffix, setLocationSuffix] = useState<string | null>(null);
  const [formattedValue, setFormattedValue] = useState<string>('');

  // Format phone number to xxx-xxx-xxxx
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;

    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    if (digits.length !== 10) return value;

    // Format as xxx-xxx-xxxx
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // Determine network provider based on prefix and check for location prefix
  const determineProviderAndLocation = (value: string) => {
    if (!value) return { provider: null, location: null };

    const digits = value.replace(/\D/g, '');
    if (digits.length < 3) return { provider: null, location: null };

    const prefix = digits.slice(0, 3);
    let provider = null;
    let location = null;

    // Check for mobile networks
    switch (prefix) {
      // Dialog
      case '077':
      case '076':
      case '074':
        provider = 'dialog';
        break;

      // Mobitel
      case '070':
      case '071':
        provider = 'mobitel';
        break;

      // Hutch
      case '072':
      case '078':
        provider = 'hutch';
        break;

      // Airtel
      case '075':
        provider = 'airtel';
        break;

      // Check for landline area codes
      case '011':
        location = 'Colombo';
        break;
      case '081':
        location = 'Kandy';
        break;
      case '091':
        location = 'Galle';
        break;
      case '041':
        location = 'Matara';
        break;
      case '037':
        location = 'Kurunegala';
        break;
      case '021':
        location = 'Jaffna';
        break;
      case '026':
        location = 'Trincomalee';
        break;
      case '031':
        location = 'Negombo';
        break;
      case '025':
        location = 'Anuradhapura';
        break;
      case '045':
        location = 'Ratnapura';
        break;
      case '055':
        location = 'Badulla';
        break;
      case '065':
        location = 'Batticaloa';
        break;

      default:
        break;
    }

    return { provider, location };
  };

  // Validate phone number format
  const validatePhoneNumber = (_: any, value: string) => {
    if (!value) return Promise.resolve();

    const digits = value.replace(/\D/g, '');

    if (digits.length !== 10) {
      return Promise.reject('Phone number must be 10 digits');
    }

    const validMobilePrefixes = [
      '070',
      '071',
      '072',
      '074',
      '075',
      '076',
      '077',
      '078',
    ];
    const validAreaCodes = [
      '011',
      '081',
      '091',
      '041',
      '037',
      '021',
      '026',
      '031',
      '025',
      '045',
      '055',
      '065',
    ];
    const prefix = digits.slice(0, 3);

    if (
      !validMobilePrefixes.includes(prefix) &&
      !validAreaCodes.includes(prefix)
    ) {
      return Promise.reject('Invalid Sri Lankan phone number prefix');
    }

    return Promise.resolve();
  };

  // Handle blur event to format the number
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) return;

    const formatted = formatPhoneNumber(value);

    if (formatted !== value) {
      form.setFieldsValue({ [restProps.name]: formatted });
      updateProviderAndLocation(formatted);
    }
  };

  // Handle change event to update provider immediately
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateProviderAndLocation(value);
  };

  // Update provider and location
  const updateProviderAndLocation = (value: string) => {
    const { provider, location } = determineProviderAndLocation(value);
    setNetworkProvider(provider);
    setLocationSuffix(location);
    setFormattedValue(value);
  };

  // On initial mount and when the field name changes
  useEffect(() => {
    // Get initial field value
    const initialValue = form.getFieldValue(restProps.name);

    if (initialValue) {
      const formatted = formatPhoneNumber(initialValue);

      // Update the form with formatted value if different
      if (formatted !== initialValue) {
        form.setFieldsValue({ [restProps.name]: formatted });
      }

      updateProviderAndLocation(formatted || initialValue);
    }

    // Create a watcher for field value changes
    const intervalId = setInterval(() => {
      const currentValue = form.getFieldValue(restProps.name);
      if (currentValue && currentValue !== formattedValue) {
        updateProviderAndLocation(currentValue);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [form, restProps.name]);

  // Get provider logo URL
  const getProviderLogoUrl = () => {
    switch (networkProvider) {
      case 'dialog':
        return dialogLogo;
      case 'mobitel':
        return mobitelLogo;
      case 'hutch':
        return hutchLogo;
      case 'airtel':
        return airtelLogo;
      default:
        return sltLogo;
    }
  };

  // Create prefix element
  const prefixElement = networkProvider ? (
    <img
      width={24}
      height={24}
      src={getProviderLogoUrl() as string}
      alt={`${networkProvider} Logo`}
      style={{ objectFit: 'contain' }}
    />
  ) : null;

  // Create suffix element
  const suffixElement = locationSuffix ? (
    <span style={{ color: '#666', fontSize: '12px' }}>{locationSuffix}</span>
  ) : null;

  return (
    <FormFieldWrapper
      {...restProps}
      rules={[
        ...(required
          ? [{ required: true, message: 'Phone number is required' }]
          : []),
        { validator: validatePhoneNumber },
        ...rules,
      ]}
    >
      <Input
        placeholder={placeholder}
        readOnly={restProps.readOnly}
        onBlur={handleBlur}
        onChange={handleChange}
        maxLength={12} // Account for format xxx-xxx-xxxx
        prefix={prefixElement}
        suffix={suffixElement}
      />
    </FormFieldWrapper>
  );
};

export default ContactNumberField;
