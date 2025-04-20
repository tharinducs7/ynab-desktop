/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form } from 'antd';
import { useAppContext } from '../../../contexts/AppContext';
import uomImage from '../../../../resources/assets/icons/ruler.png';
import {
  TextAreaField,
  NumberInputField,
  TextInputField,
  DatePickerField,
} from '../../../components/Shared';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';

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
        <TextInputField name="name" label="Name" required readOnly={readOnly} />

        <TextAreaField
          name="description"
          label="Description"
          placeholder="Enter description"
          readOnly={readOnly}
        />

        <NumberInputField name="precision" label="Precision" min={0} max={10} />
        <DatePickerField name="createdAt" label="Created At" />
      </Form>
    </AppDrawer>
  );
};

export default UnitOfMeasureDrawer;
