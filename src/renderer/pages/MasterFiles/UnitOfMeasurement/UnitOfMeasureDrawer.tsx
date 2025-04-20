/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form, message } from 'antd';
import { useAppContext } from '../../../contexts/AppContext';
import uomImage from '../../../../resources/assets/icons/ruler.png';
import { TextInputField } from '../../../components/Shared';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';
import FormFieldWrapper from '../../../components/Shared/FormFieldWrapper';
import UnitGroupSelect from '../../../components/ResubaleDataComponents/UnitGroupSelect';
import {
  createUnitOfMeasure,
  updateUnitOfMeasure,
} from '../../../api/unitOfMeasure';
import { UOM_TYPE } from '../../../types/uom';

const UnitOfMeasureDrawer: React.FC = ({ ...rest }) => {
  const [form] = Form.useForm<UOM_TYPE>();
  const [messageApi, contextHolder] = message.useMessage();
  const { drawerVisible, drawerMode, drawerData, setLoadingDrawer } =
    useAppContext();
  const readOnly = drawerMode === 'view_mode';

  React.useEffect(() => {
    if (drawerMode === 'edit_mode' || drawerMode === 'view_mode') {
      form.setFieldsValue(drawerData || {});
    } else {
      form.resetFields();
    }
  }, [drawerMode, drawerData, form]);

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
        await createUnitOfMeasure(values);
        message.success('Unit of measure created successfully!', 2);
      } else if (drawerMode === 'edit_mode') {
        const id = drawerData?.id;
        if (id) {
          await updateUnitOfMeasure(id, values);
          message.success('Unit of measure updated successfully!', 2);
        }
      }

      form.resetFields();
      setLoadingDrawer(false);
      // Optionally close drawer, trigger reload, etc.
    } catch (err) {
      message.error(`Something went wrong. ${err}`, 2.5);
    }
  };

  const onClose = () => {
    form.resetFields();
  };

  const title =
    drawerMode === 'create_mode'
      ? 'Add Unit of Measure'
      : drawerMode === 'edit_mode'
        ? 'Edit Unit of Measure'
        : 'View Unit of Measure';

  const subtitle =
    drawerMode === 'view_mode'
      ? 'Review the details below.'
      : 'Fill out the fields and click Save.';

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
        size="default"
        {...rest}
      >
        <Form<UOM_TYPE>
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          initialValues={drawerData}
        >
          <FormFieldWrapper name="category" label="Category">
            <UnitGroupSelect disabled={readOnly} />
          </FormFieldWrapper>
          <TextInputField
            name="full_name"
            label="Full Name"
            required
            readOnly={readOnly}
          />
          <TextInputField
            name="symbol"
            label="Symbol"
            required
            readOnly={readOnly}
          />
          <TextInputField
            name="icon"
            label="Icon"
            required
            readOnly={readOnly}
          />
        </Form>
      </AppDrawer>
    </>
  );
};

export default UnitOfMeasureDrawer;
