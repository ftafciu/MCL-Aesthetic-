import {
  Button,
  Checkbox,
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
import { PATH_AUTH, PATH_DASHBOARD } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from "./scripts/login-scripts.ts";
import './style.css';

const { Title, Link } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export const SignInPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    login(navigate, message, values.email, values.password);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.open({
      type: 'error',
      content: 'Login failed!'
    })
  };

  return (
    <Row style={{ minHeight: isMobile ? 'auto' : '100vh' }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="flex-start"
          justify="flex-start"
          className="text-center"
          style={{ height: '100%' }}
        >
          <div className='login-div'></div>
          {/* <img src={Sticker} alt='login-sticker' width={'100%'} height={'70%'}></img> */}
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', background: "#f5f3ef", paddingLeft: "70px"}}
        >
          <Title className="m-0" style={{color:"#d5a4a5", paddingLeft:"200px", paddingBottom:"40px"}} >Login</Title>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              email: '',
              password: '',
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            style={{ marginLeft: '15px', color:'#d5a4a5 !important' }}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Continue
                </Button>
                <Link href={PATH_AUTH.passwordReset}>Forgot password?</Link>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};
