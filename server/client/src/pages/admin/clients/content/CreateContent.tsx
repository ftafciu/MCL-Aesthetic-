import { EditOutlined, HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../components/PageHeader/PageHeader";
import { Helmet } from "react-helmet-async";
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
    Segmented,
    Card,
    message,
    Flex
} from 'antd';
import type { FormProps } from 'antd';
import { useState } from "react";
import dayjs from "dayjs";
import { createClient } from "../scripts/client-scripts";
import { useNavigate } from "react-router-dom";
import LaserSession from "../../sessions/components/LaserSession";
import HeadSession from "../../sessions/components/HeadSessionForm";

const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

function CreateContent() {

    const navigator = useNavigate();
    const [faceTreatment, setFaceTreatment] = useState({
        cleaner: false,
        mesotherapy: false,
        fillers: false,
        botox: false,
        dermopen: false
    });
    const [bodyParts, setBodyParts] = useState({
        face_total: false,
        moustache: false,
        barseta: false,
        mjeker: false,
        barku: false,
        vithe: false,
        fundshpine: false,
        hands: false,
        half_arms: false,
        arms: false,
        armpits: false,
        legs: false,
        half_legs: false,
        bikini: false,
        back: false,
    })
    const [messageApi, contextHolder] = message.useMessage();

    const onChangeFaceTreatment = (fieldName: string, newValue: boolean) => {
        setFaceTreatment((prev: any) => {
            prev[fieldName] = newValue;
            return { ...prev }
        })
    };

    const onChangeBodyParts = (fieldName: string, newValue: boolean) => {
        setBodyParts((prev: any) => {
            prev[fieldName] = newValue;
            return { ...prev }
        })
    };

    return (
        <div>
            {contextHolder}
            <Helmet>
                <title>Create Client | Admin</title>
            </Helmet>
            <PageHeader
                title="clients form"
                breadcrumbs={[
                    {
                        title: (
                            <>
                                <HomeOutlined />
                                <span>home</span>
                            </>
                        ),
                        path: '/',
                    },
                    {
                        title: (
                            <>
                                <PieChartOutlined />
                                <span>dashboard</span>
                            </>
                        ),
                        path: 'dashboard'
                    },
                    {
                        title: 'create client',
                    },
                ]}
            />
            <Card>
                <Flex justify="center">
                    <div style={{ width: '45%' }}>
                        <h2 style={{ marginLeft: '50px' }}>Create a new client</h2>
                        <Form
                            {...formItemLayout}
                            style={{ maxWidth: 600 }}
                            onFinish={(values) => {
                                createClient(navigator, messageApi, values.name, values.surname, values.email, values.phoneNumber, values.birthday, bodyParts, faceTreatment);
                            }}
                        >

                            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Surname" name="surname" rules={[{ required: true, message: 'Surname is required!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Email" name="email" rules={[{ required: false, message: 'Email is required!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true, message: 'Phone number is required and must be unique!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Birthday"
                                name="birthday"
                                rules={[{ required: false, message: 'Please input!' }]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div style={{ width: '45%' }}>
                        <h2>Select the planned treatment</h2>
                        <LaserSession defaultValues={bodyParts} onChangeInfo={onChangeBodyParts} />
                        <HeadSession defaultValues={faceTreatment} onChangeInfo={onChangeFaceTreatment} />
                    </div>
                </Flex>
            </Card>
        </div>
    )
}

export default CreateContent;