/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form, message, Switch } from 'antd';
import { useAppContext } from '../../../contexts/AppContext';
// import categoryIcon from '../../../../resources/assets/icons/category.png';
import { TextInputField, TextAreaField } from '../../../components/Shared';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';
import FormFieldWrapper from '../../../components/Shared/FormFieldWrapper';
import ParentCategorySelect from '../../../components/ResubaleDataComponents/ParentCategorySelect';
import { createCategory, updateCategory } from '../../../api/categories';
import { CATEGORY_TYPE } from '../../../types/categories';

const CategoriesDrawer: React.FC = ({ ...rest }) => {
  const [form] = Form.useForm<CATEGORY_TYPE>();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    drawerVisible,
    drawerMode,
    drawerData,
    setLoadingDrawer,
    reloadTable,
    closeDrawer,
  } = useAppContext();
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
        await createCategory(values);
        reloadTable?.();
        message.success('Category created successfully!', 2);
        closeDrawer();
      } else if (drawerMode === 'edit_mode') {
        const id = drawerData?.id;
        if (id) {
          await updateCategory(id, values);
          reloadTable?.();
          message.success('Category updated successfully!', 2);
          closeDrawer();
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
      ? 'Add Category'
      : drawerMode === 'edit_mode'
        ? 'Edit Category'
        : 'View Category';

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
        // icon={categoryIcon}
        onCancel={onClose}
        onSave={onSubmit}
        size="default"
        {...rest}
      >
        <Form<CATEGORY_TYPE>
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          initialValues={drawerData}
        >
          <TextInputField
            name="name"
            label="Name"
            required
            readOnly={readOnly}
          />
          <TextAreaField
            name="description"
            label="Description"
            readOnly={readOnly}
          />
          <FormFieldWrapper name="parent_id" label="Parent Category">
            <ParentCategorySelect disabled={readOnly} />
          </FormFieldWrapper>
          <FormFieldWrapper name="is_active" label="Active">
            <Switch disabled={readOnly} />
          </FormFieldWrapper>
        </Form>
      </AppDrawer>
    </>
  );
};

export default CategoriesDrawer;
