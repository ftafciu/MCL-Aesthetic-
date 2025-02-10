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
    Spin
} from 'antd';
import type { FormProps } from 'antd';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { createClient, editClient, getClientData } from "../scripts/client-scripts";
import { useNavigate, useParams } from "react-router-dom";

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

function EditContent() {

    const navigator = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [client, setClient] = useState<any | null>(null);

    useEffect(() => {
        getClientData(navigator, messageApi, id).then(data => {
            if (data) {
                setClient(data);
                setLoading(false);
            } else {
                navigator("/client");
            }
        })
    }, [])

    return (
        <div>
            {contextHolder}
            <Helmet>
                <title>Edit Client | Admin</title>
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
                        title: 'edit client',
                    },
                ]}
            />
            <Card>
                <h2 style={{ marginLeft: '50px' }}>Edit your client</h2>
                {loading ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin /></div> : <Form
                    {...formItemLayout}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        name: client?.name,
                        surname: client?.surname,
                        email: client?.email,
                        phoneNumber: client?.phoneNumber,
                        birthday: dayjs(client?.birthday),
                    }}
                    onFinish={(values) => {
                        editClient(navigator, messageApi, id, { ...values });
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
                </Form>}
            </Card>
        </div>
    )
}

export default EditContent;