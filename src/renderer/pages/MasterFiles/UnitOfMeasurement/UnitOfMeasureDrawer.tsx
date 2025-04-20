/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form } from 'antd';
import { useAppContext } from '../../../contexts/AppContext';
import uomImage from '../../../../resources/assets/icons/ruler.png';
import { TextInputField } from '../../../components/Shared';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';
import FormFieldWrapper from '../../../components/Shared/FormFieldWrapper';
import UnitGroupSelect from '../../../components/ResubaleDataComponents/UnitGroupSelect';

export interface UOMValues {
  name: string;
  description: string;
}

const UnitOfMeasureDrawer: React.FC = ({ ...rest }) => {
  const [form] = Form.useForm<UOMValues>();

  const { drawerVisible, drawerMode, drawerData } = useAppContext();
  const readOnly = drawerMode === 'view_mode';

  React.useEffect(() => {
    if (drawerMode === 'edit_mode' || drawerMode === 'view_mode') {
      form.setFieldsValue(drawerData || {});
    } else if (drawerMode === 'create_mode') {
      form.resetFields();
    } else {
      form.resetFields();
    }
  }, [drawerMode, drawerData, form]);

  const handleFinish = (vals: UOMValues) => {
    console.log(vals, 'vals');

    form.resetFields();
  };

  let title = '';
  if (drawerMode === 'create_mode') {
    title = 'Add Unit of Measure';
  } else if (drawerMode === 'edit_mode') {
    title = 'Edit Unit of Measure';
  } else {
    title = 'View Unit of Measure';
  }

  const subtitle =
    drawerMode === 'view_mode'
      ? 'Review the details below.'
      : 'Fill out the fields and click Save.';

  const onClose = () => {
    form.resetFields();
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
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
      <Form<UOMValues>
        form={form}
        layout="horizontal"
        onFinish={handleFinish}
        labelCol={{ span: 4 }}
        initialValues={{
          name: '',
          description: '',
          ...drawerData,
        }}
      >
        <FormFieldWrapper name="category" label="Category">
          <UnitGroupSelect />
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
        <TextInputField name="icon" label="Icon" required readOnly={readOnly} />
      </Form>
    </AppDrawer>
  );
};

export default UnitOfMeasureDrawer;
