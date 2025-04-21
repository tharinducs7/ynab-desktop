/* eslint-disable react/require-default-props */
import React from 'react';
import { Tooltip } from 'antd';
import dialogLogo from '../../../resources/assets/icons/dialog.png';
import mobitelLogo from '../../../resources/assets/icons/mobitel.png';
import airtelLogo from '../../../resources/assets/icons/airtel.png';
import hutchLogo from '../../../resources/assets/icons/hutch.png';
import sltLogo from '../../../resources/assets/icons/slt.png';

interface DisplayContactNumberProps {
  contactNumber: string;
  className?: string;
  style?: React.CSSProperties;
}

const DisplayContactNumber: React.FC<DisplayContactNumberProps> = ({
  contactNumber,
  className = '',
  style = {},
}) => {
  // Format phone number to xxx-xxx-xxxx
  const formatPhoneNumber = (value: string): string => {
    if (!value) return '';

    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    if (digits.length !== 10) return value;

    // Format as xxx-xxx-xxxx
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // Determine network provider and location based on prefix
  const determineProviderAndLocation = (value: string) => {
    if (!value) return { provider: null, providerName: null, location: null };

    const digits = value.replace(/\D/g, '');
    if (digits.length < 3)
      return { provider: null, providerName: null, location: null };

    const prefix = digits.slice(0, 3);
    let provider = null;
    let providerName = null;
    let location = null;

    // Check for mobile networks
    switch (prefix) {
      // Dialog
      case '077':
      case '076':
      case '074':
        provider = 'dialog';
        providerName = 'Dialog';
        break;

      // Mobitel
      case '070':
      case '071':
        provider = 'mobitel';
        providerName = 'Mobitel';
        break;

      // Hutch
      case '072':
      case '078':
        provider = 'hutch';
        providerName = 'Hutch';
        break;

      // Airtel
      case '075':
        provider = 'airtel';
        providerName = 'Airtel';
        break;

      // Check for landline area codes
      case '011':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Colombo';
        break;
      case '081':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Kandy';
        break;
      case '091':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Galle';
        break;
      case '041':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Matara';
        break;
      case '037':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Kurunegala';
        break;
      case '021':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Jaffna';
        break;
      case '026':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Trincomalee';
        break;
      case '031':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Negombo';
        break;
      case '025':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Anuradhapura';
        break;
      case '045':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Ratnapura';
        break;
      case '055':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Badulla';
        break;
      case '065':
        provider = 'slt';
        providerName = 'Sri Lanka Telecom';
        location = 'Batticaloa';
        break;

      default:
        break;
    }

    return { provider, providerName, location };
  };

  // Get provider logo URL
  const getProviderLogoUrl = (provider: string | null) => {
    switch (provider) {
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

  const formattedNumber = formatPhoneNumber(contactNumber);
  const { provider, providerName, location } =
    determineProviderAndLocation(formattedNumber);
  const logoUrl = getProviderLogoUrl(provider);

  // Generate tooltip content
  const getTooltipContent = () => {
    if (!provider) return '';

    if (location) {
      return `${providerName} - ${location}`;
    }

    return providerName;
  };

  return (
    <Tooltip title={getTooltipContent()} placement="topLeft">
      <div className={`display-contact-number ${className}`} style={style}>
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${provider} logo`}
            className="provider-logo"
            width={20}
            height={20}
          />
        )}
        <span className="phone-number">{formattedNumber}</span>
      </div>
    </Tooltip>
  );
};

export default DisplayContactNumber;
