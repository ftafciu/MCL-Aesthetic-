import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from 'antd';
import { useMediaQuery } from 'react-responsive';
import { PATH_DASHBOARD } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sticker from "../../assets/login-img.jpg";

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
};

export const PasswordResetPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setLoading(true);

    message.open({
      type: 'success',
      content: 'Password reset link sent successfully',
    });

    setTimeout(() => {
      navigate(PATH_DASHBOARD.default);
    }, 5000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ minHeight: isMobile ? 'auto' : '97vh', overflow: 'scroll', maxHeight:'100vh' }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ height: '100%' }}
        >
          <img src={Sticker} alt='login-sticker' width={'100%'} height={'100%'}></img>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', width: '100%', padding: '2rem' }}
        >
          <Title className="m-0">Forgot password</Title>
          <Text>Enter your email to rest your password.</Text>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            style={{ width: '100%' }}
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Flex align="center" gap="small">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Submit
                </Button>
                <Button type="text" size="middle" loading={loading}>
                  Cancel
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};
