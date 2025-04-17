/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Drawer, Form } from 'antd';
import { useAppContext } from '../../../contexts/AppContext';
import DrawerHeader from '../../../components/AppDrawer/DrawerHeader';
import DrawerFooter from '../../../components/AppDrawer/DrawerFooter';
import uomImage from '../../../../resources/assets/icons/ruler.png';
import TextInputField from '../../../components/Shared/TextInputField';
import TextAreaField from '../../../components/Shared/TextAreaField';
import NumberInputField from '../../../components/Shared/NumberInputField';
import DatePickerField from '../../../components/Shared/DatePickerField';

export interface UOMValues {
  name: string;
  description: string;
}

const UnitOfMeasureDrawer: React.FC = ({ ...rest }) => {
  const [form] = Form.useForm<UOMValues>();

  const { drawerVisible, closeDrawer, drawerMode, drawerData } =
    useAppContext();
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
    <Drawer
      title={
        <DrawerHeader
          subtitle={subtitle}
          title={title}
          url={uomImage}
          onCancel={onClose}
        />
      }
      width={600}
      visible={drawerVisible}
      closable={false}
      onClose={closeDrawer}
      bodyStyle={{
        paddingBottom: 80,
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}
      footer={<DrawerFooter onCancel={onClose} onSave={onSubmit} />}
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
    </Drawer>
  );
};

export default UnitOfMeasureDrawer;
