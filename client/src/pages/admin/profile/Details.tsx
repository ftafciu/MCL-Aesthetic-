import { Button, Col, Form, Input, message, Row, Spin } from 'antd';
import { Card } from '../../../components';
import { SaveOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getMyData } from '../../../layouts/userAccount/scripts';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  name?: string;
  surname?: string;
  gmail?: string;
};

export const DetailsPage = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState<any>({
    name: '',
    surname: '',
    gmail: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyData(navigate, messageApi).then(data => {
      setUser(data);
      setLoading(false);
    })
  }, [])

  return (
    <Card>
      {contextHolder}
      {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin /></div> : <Form
        name="user-profile-details-form"
        layout="vertical"
        initialValues={{
          name: user.name,
          surname: user.surname,
          gmail: user.gmail,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        requiredMark={false}
      >
        <Row gutter={[16, 0]}>
          <Col sm={24} lg={8}>
            <Form.Item<FieldType>
              label="First name"
              name="name"
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={8}>
            <Form.Item<FieldType>
              label="Last name"
              name="surname"
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={8}>
            <Form.Item<FieldType>
              label="Email"
              name="gmail"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Save changes
          </Button>
        </Form.Item>
      </Form>}
    </Card>
  );
};
