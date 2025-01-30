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
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Sticker from "../../assets/login-img.png";
import { requestPassowrdChange, resetPassword } from './scripts/auth-scripts';

const { Title, Text } = Typography;

type FieldType = {
    newPassword: string;
    newPasswordRepeat: string
};

export const NewPassword = () => {
    const {
        token: { colorPrimary },
    } = theme.useToken();
    const isMobile = useMediaQuery({ maxWidth: 769 });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id, token } = useParams();

    const onFinish = (values: any) => {
        setLoading(true);
        if (values.newPassword === values.newPasswordRepeat) {
            message.open({
                type: 'error',
                content: "Repeated password does not match the new password"
            })
        } else {
            resetPassword(id, token, values.newPassword).then(response => {
                if (response) {
                    message.open({
                        type: 'success',
                        content: 'Password reset successfully!'
                    });
                    navigate("/auth/signin");
                }
            })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row style={{ minHeight: isMobile ? 'auto' : '97vh', overflow: 'scroll', maxHeight: '100vh' }}>
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
                    <Title className="m-0">Reset password</Title>
                    <Text>Enter your new password and repeat it</Text>
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
                            label="New password"
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input your new password' }]}
                        >
                            <Input type='password' />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Repeat new password"
                            name="newPasswordRepeat"
                            rules={[{ required: true, message: 'Please repeat your new password' }]}
                        >
                            <Input type='password' />
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
                            </Flex>
                        </Form.Item>
                    </Form>
                </Flex>
            </Col>
        </Row>
    );
};
