/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form } from 'antd';
import { useAppContext } from '../../../contexts/AppContext';
import uomImage from '../../../../resources/assets/icons/ruler.png';
import TextInputField from '../../../components/Shared/TextInputField';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';

export interface BanksValues {
  name: string;
  description: string;
}

const BanksDrawer: React.FC = ({ ...rest }) => {
  const [form] = Form.useForm<BanksValues>();

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

  const handleFinish = (vals: BanksValues) => {
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
      {...rest}
    >
      <Form<BanksValues>
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
      </Form>
    </AppDrawer>
  );
};

export default BanksDrawer;
