/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Divider, Form, Row, Col } from 'antd';
import { useAppContext } from '../../../contexts/AppContext';
import uomImage from '../../../../resources/assets/icons/ruler.png';
import {
  TextAreaField,
  NumberInputField,
  TextInputField,
  DatePickerField,
} from '../../../components/Shared';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';
import { ITEM } from '../../../types/item';
import FormFieldWrapper from '../../../components/Shared/FormFieldWrapper';
import CategorySelect from '../../../components/ResubaleDataComponents/CategorySelect';
import UnitOfMeasureSelect from '../../../components/ResubaleDataComponents/UnitOfMeasureSelect';

const ItemsDrawer: React.FC = ({ ...rest }) => {
  const [form] = Form.useForm<ITEM>();
  const { drawerVisible, drawerMode, drawerData } = useAppContext() as {
    drawerVisible: boolean;
    drawerMode: 'create_mode' | 'edit_mode' | 'view_mode';
    drawerData: Partial<ITEM>;
  };
  const readOnly = drawerMode === 'view_mode';

  React.useEffect(() => {
    if (drawerMode === 'edit_mode' || drawerMode === 'view_mode') {
      form.setFieldsValue(drawerData || {});
    } else {
      form.resetFields();
    }
  }, [drawerMode, drawerData, form]);

  const handleFinish = (vals: ITEM) => {
    console.log(vals, 'vals');
    form.resetFields();
  };

  const titleMap = {
    create_mode: 'Add Items',
    edit_mode: 'Edit Items',
    view_mode: 'View Items',
  };

  const title = titleMap[drawerMode] || 'Items';
  const subtitle =
    drawerMode === 'view_mode'
      ? 'Review the details below.'
      : 'Fill out the fields and click Save.';

  const onClose = () => form.resetFields();
  const onSubmit = () => form.submit();

  return (
    <AppDrawer
      visible={drawerVisible}
      title={title}
      subtitle={subtitle}
      icon={uomImage}
      onCancel={onClose}
      onSave={onSubmit}
      width={1800}
      {...rest}
    >
      <Form<ITEM>
        form={form}
        layout="horizontal"
        onFinish={handleFinish}
        initialValues={{
          name: '',
          description: '',
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
              name="item_code"
              label="Item Code"
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <TextInputField
              name="name"
              label="Name"
              required
              readOnly={readOnly}
            />
          </Col>
        </Row>
        <TextAreaField
          name="description"
          label="Description"
          placeholder="Enter description"
          readOnly={readOnly}
        />

        {/* 2. Categories and Units */}
        <Divider orientation="left" orientationMargin="0" dashed>
          Categories and Units
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <FormFieldWrapper name="category_id" label="Category">
              <CategorySelect disabled={readOnly} />
            </FormFieldWrapper>
          </Col>
          <Col span={12}>
            <FormFieldWrapper name="unit_of_measure_id" label="Unit of Measure">
              <UnitOfMeasureSelect disabled={readOnly} />
            </FormFieldWrapper>
          </Col>
        </Row>

        {/* 3. Quantity Information */}
        <Divider orientation="left" orientationMargin="0" dashed>
          Quantity Information
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <NumberInputField
              name="quantity"
              label="Quantity"
              min={0}
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <NumberInputField
              name="damage_quantity"
              label="Damaged Quantity"
              min={0}
              readOnly={readOnly}
            />
          </Col>
        </Row>

        {/* 4. Pricing Information */}
        <Divider orientation="left" orientationMargin="0" dashed>
          Pricing Information
        </Divider>
        <Row gutter={24}>
          <Col span={8}>
            <NumberInputField
              name="batch_cost_price"
              label="Cost Price"
              min={0}
              readOnly={readOnly}
            />
          </Col>
          <Col span={8}>
            <NumberInputField
              name="batch_selling_price"
              label="Selling Price"
              min={0}
              readOnly={readOnly}
            />
          </Col>
          <Col span={8}>
            <NumberInputField
              name="discount_amount"
              label="Discount Amount"
              min={0}
              readOnly={readOnly}
            />
          </Col>
        </Row>

        {/* 5. Additional Information */}
        <Divider orientation="left" orientationMargin="0" dashed>
          Additional Information
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <TextInputField
              name="warranty"
              label="Warranty"
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <DatePickerField
              name="expiry_date"
              label="Expiry Date"
              readOnly={readOnly}
            />
          </Col>
        </Row>
      </Form>
    </AppDrawer>
  );
};

export default ItemsDrawer;
