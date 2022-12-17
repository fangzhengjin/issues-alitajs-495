import { Button, Dropdown, Menu, Modal } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { DownOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons/lib';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';

const LocationList: FC = () => {
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState<boolean>(false);

  const columns: ProColumns<any>[] = [
    {
      title: '测试1',
      align: 'center',
      dataIndex: 'code',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      title: '测试2',
      align: 'center',
      dataIndex: 'name',
      fieldProps: {
        allowClear: true,
      },
    },
  ];

  return (
    <PageContainer title={false} breadcrumb={undefined}>
      <ProTable<any>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          // eslint-disable-next-line react/jsx-key
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => history.push(`/test/new`)}
          >
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={(e) => {
                    if (e.key === 'remove') {
                      Modal.confirm({
                        icon: <QuestionCircleOutlined />,
                        maskClosable: true,
                        title: '删除确认',
                        content: '确认删除所选用户信息吗?',
                        onOk: async () => {
                          setLoading(true);
                          setLoading(false);
                          action?.reload();
                        },
                      });
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        loading={loading}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        rowSelection={{
          fixed: true,
        }}
        scroll={{ x: 2000 }}
      />
    </PageContainer>
  );
};

export default LocationList;
