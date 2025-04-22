/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Divider, Form, Row, Col, message } from 'antd';
import { useAppContext } from '../../../contexts/AppContext';
import {
  TextAreaField,
  NumberInputField,
  TextInputField,
  SwitchField,
  ContactNumberField,
} from '../../../components/Shared';
import { create, update } from '../../../api/suppliers';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';
import { SUPPLIER_TYPE } from '../../../types/supplier';
import RegistrationNoField from '../../../components/Shared/RegistrationNoField';
// import FormFieldWrapper from '../../../components/Shared/FormFieldWrapper';
// import { BASE_URL_ASSETS } from '../../../utils/httpClient';

const SuppliersDrawer: React.FC = ({ ...rest }) => {
  const [form] = Form.useForm<SUPPLIER_TYPE>();
  const {
    drawerVisible,
    drawerMode,
    drawerData,
    setLoadingDrawer,
    reloadTable,
  } = useAppContext();
  const [messageApi, contextHolder] = message.useMessage();
  const readOnly = drawerMode === 'view_mode';

  useEffect(() => {
    if (drawerMode === 'edit_mode' || drawerMode === 'view_mode') {
      form.setFieldsValue({
        ...drawerData,
      });
    } else {
      form.resetFields();
    }
  }, [drawerMode, drawerData, form]);

  const title = 'Supplier';
  const subtitle =
    drawerMode === 'view_mode'
      ? 'Review the details below.'
      : 'Fill out the fields and click Save.';

  const onClose = () => form.resetFields();
  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      setLoadingDrawer(true);
      await messageApi.open({
        type: 'loading',
        content: 'Saving...',
        duration: 1.5,
      });

      if (drawerMode === 'create_mode') {
        await create(values);
        message.success('Supplier created successfully!', 2);
        reloadTable?.();
      } else if (drawerMode === 'edit_mode') {
        const id = drawerData?.id;
        if (id) {
          await update(id, values);
          message.success('Supplier updated successfully!', 2);
          reloadTable?.();
        }
      }

      setLoadingDrawer(false);
    } catch (err: any) {
      setLoadingDrawer(false);

      if (err?.response?.data?.errors) {
        const serverErrors = err.response.data.errors;
        const errorMessages = Object.values(serverErrors).flat().join(' ');
        message.error(errorMessages, 3);
      } else {
        message.error('Something went wrong.', 2.5);
      }
    }
  };

  return (
    <>
      {contextHolder}

      <AppDrawer
        visible={drawerVisible}
        title={title}
        subtitle={subtitle}
        icon="customer-icon" // Add appropriate icon here
        onCancel={onClose}
        onSave={onSubmit}
        width={1800}
        {...rest}
      >
        <Form<SUPPLIER_TYPE>
          form={form}
          layout="horizontal"
          initialValues={{
            ...drawerData,
          }}
        >
          {/* 1. Basic Information */}
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{ borderColor: '#fff' }}
            dashed
          >
            Basic Information
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <TextInputField
                name="name"
                label="Name"
                required
                readOnly={readOnly}
              />
            </Col>
            <Col span={12}>
              <TextInputField
                name="city"
                label="City"
                required
                readOnly={readOnly}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextInputField name="email" label="Email" readOnly={readOnly} />
            </Col>
            <Col span={12}>
              <ContactNumberField
                name="mobile_number"
                label="Mobile Number"
                readOnly={readOnly}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <NumberInputField
                name="debit_balance"
                label="Debit Balance"
                readOnly={readOnly}
              />
            </Col>
            <Col span={12}>
              <RegistrationNoField
                name="registration_no"
                label="Registration Number"
                required
                placeholder="e.g., PV 123456"
              />
            </Col>
          </Row>
          <TextAreaField
            name="remarks"
            label="Notes"
            placeholder="Enter notes"
            readOnly={readOnly}
            rows={2}
          />

          {/* 2. Account Status */}
          <Divider orientation="left" orientationMargin="0" dashed>
            Profile Status
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <SwitchField
                name="is_active"
                label="Is Active"
                readOnly={drawerMode === 'view_mode'}
              />
            </Col>
          </Row>
        </Form>
      </AppDrawer>
    </>
  );
};

export default SuppliersDrawer;
