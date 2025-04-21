/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Divider, Form, Row, Col, message } from 'antd';
import dayjs from 'dayjs';
import { useAppContext } from '../../../contexts/AppContext';
import uomImage from '../../../../resources/assets/icons/ruler.png';
import {
  TextAreaField,
  NumberInputField,
  TextInputField,
  DatePickerField,
  WarrantyField,
} from '../../../components/Shared';
import { create, update } from '../../../api/items';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';
import { ITEM_TYPE } from '../../../types/item';
import FormFieldWrapper from '../../../components/Shared/FormFieldWrapper';
import CategorySelect from '../../../components/ResubaleDataComponents/CategorySelect';
import UnitOfMeasureSelect from '../../../components/ResubaleDataComponents/UnitOfMeasureSelect';
import SwitchField from '../../../components/Shared/SwitchField';
import ImageUploaderField from '../../../components/Shared/ImageUploaderField';
import { BASE_URL_ASSETS } from '../../../utils/httpClient';

const ItemsDrawer: React.FC = ({ ...rest }) => {
  const [form] = Form.useForm<ITEM_TYPE>();
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
        expiry_date: drawerData?.expiry_date
          ? dayjs(drawerData.expiry_date)
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [drawerMode, drawerData, form]);

  const title = 'Items';
  const subtitle =
    drawerMode === 'view_mode'
      ? 'Review the details below.'
      : 'Fill out the fields and click Save.';

  const onClose = () => form.resetFields();
  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Extract File[] from UploadFile[]
      const images = (values.images || [])
        .map((file: any) => file.originFileObj)
        .filter((file: File | undefined): file is File => !!file);

      const finalValues = {
        ...values,
        images,
      };

      setLoadingDrawer(true);
      await messageApi.open({
        type: 'loading',
        content: 'Saving...',
        duration: 1.5,
      });

      if (drawerMode === 'create_mode') {
        await create(finalValues);
        message.success('Item created successfully!', 2);
        reloadTable?.();
      } else if (drawerMode === 'edit_mode') {
        const id = drawerData?.id;
        if (id) {
          await update(id, finalValues);
          message.success('Item updated successfully!', 2);
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

  const imageList = (drawerData?.images || []).map((img: any, idx: number) => {
    const fileName = img.image_path.split('/').pop();
    const encodedFileName = encodeURIComponent(fileName);
    const basePath = img.image_path.replace(fileName, '');

    const fullUrl = `${BASE_URL_ASSETS}${basePath}${encodedFileName}`;

    return {
      uid: `-${idx}`,
      name: fileName,
      status: 'done',
      url: fullUrl,
      thumbUrl: fullUrl, // ✅ same as url, no %2F
    };
  });

  console.log(drawerData, 'drawerData', imageList);

  return (
    <>
      {contextHolder}

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
        <Form<ITEM_TYPE>
          form={form}
          layout="horizontal"
          initialValues={{
            ...drawerData,
            expiry_date: drawerData?.expiry_date
              ? dayjs(drawerData?.expiry_date)
              : null,
            images: imageList,
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
            rows={2}
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
              <FormFieldWrapper
                name="unit_of_measure_id"
                label="Unit of Measure"
              >
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
            <Col span={8}>
              <WarrantyField name="warranty" label="Warranty Period" />
            </Col>
            <Col span={8}>
              <DatePickerField
                name="expiry_date"
                label="Expiry Date"
                readOnly={readOnly}
              />
            </Col>
            <Col span={8}>
              <SwitchField
                name="is_active"
                label="Active Status"
                readOnly={drawerMode === 'view_mode'}
              />
            </Col>
          </Row>
          <Divider orientation="left" orientationMargin="0" dashed>
            Images
          </Divider>
          <Row gutter={16}>
            <Col span={24}>
              <ImageUploaderField
                name="images"
                label="Images"
                imageList={imageList}
                readOnly={readOnly}
              />
            </Col>
          </Row>
        </Form>
      </AppDrawer>
    </>
  );
};

export default ItemsDrawer;
