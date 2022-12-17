import type {FC} from 'react';
import {useContext, useState} from 'react';

import {PageContainer, ProForm, ProFormText} from '@ant-design/pro-components';
import {Button, Form, message, Modal} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import {KeepAliveContext} from "@@/exports";

const WarehouseCreateOrUpdate: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const context = useContext(KeepAliveContext);

  const onFinish = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("保存成功,此时应自动关闭当前tab")
      context.dropByCacheKey(location.pathname)
    }, 1000)

  };

  return (
    <PageContainer
      title={false}
      footer={[
        <Button
          key="test"
          danger
          onClick={() => {
            context.dropByCacheKey(location.pathname)
          }}
          loading={loading}
        >
          关闭当前Tab
        </Button>,
        <Button
          key="reset"
          onClick={() => {
            form.resetFields();
          }}
          loading={loading}
        >
          重置
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            Modal.confirm({
              icon: <QuestionCircleOutlined/>,
              maskClosable: true,
              title: '提交',
              content: '确认提交吗?',
              onOk: async () => {
                form.submit();
              },
            });
          }}
          loading={loading}
        >
          提交
        </Button>,
      ]}
    >
      <ProForm
        form={form}
        submitter={false}
        layout="horizontal"
        onFinish={onFinish}
        grid
        rowProps={{
          gutter: [16, 0],
        }}
      >
        <ProFormText name="code" label="仓库代码" colProps={{span: 8}}/>
        <ProFormText name="name" label="仓库名称" colProps={{span: 8}}/>
        <ProFormText name="address" label="仓库地址" colProps={{span: 8}}/>
        <ProFormText name="contactor" label="联系人员" colProps={{span: 8}}/>
        <ProFormText name="telephone" label="仓库电话" colProps={{span: 8}}/>
      </ProForm>
    </PageContainer>
  );
};

export default WarehouseCreateOrUpdate;
