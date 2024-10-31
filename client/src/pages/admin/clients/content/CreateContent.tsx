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
    message
} from 'antd';
import type { FormProps } from 'antd';
import { useState } from "react";
import dayjs from "dayjs";
import { createClient } from "../scripts/client-scripts";
import { useNavigate } from "react-router-dom";

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
    const [messageApi, contextHolder] = message.useMessage();

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
                <h2 style={{ marginLeft: '50px'}}>Create a new client</h2>
                <Form
                    {...formItemLayout}
                    style={{ maxWidth: 600 }}
                    onFinish={(values)=>{
                        createClient(navigator, messageApi, values.name, values.surname, values.email, values.phoneNumber, values.birthday);
                    }}
                >

                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Surname" name="surname" rules={[{ required: true, message: 'Surname is required!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true, message: 'Phone number is required and must be unique!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Birthday"
                        name="birthday"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default CreateContent;