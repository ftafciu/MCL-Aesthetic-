import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { CheckCircleOutlined, DeleteOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Row, Table } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import { createExpense, deleteExpense, getExpenses } from "./scripts/scripts";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/ConfirmModal";

const { RangePicker } = DatePicker;

const cardStyles: CSSProperties = {
    height: '100%',
};

type FieldType = {
    name?: string;
    price?: number;
    date?: Date;
};

function ExpensePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [expensesUpdated, setExpensesUpdated] = useState(false);
    const [form] = Form.useForm();
    const CATEGORIES_COLUMNS = [
        {
            title: 'Name of expense',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any) => <span>€ {_.$numberDecimal}</span>,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_: any) => <span>{_.slice(0, 10)}</span>
        },
        {
            title: '',
            dataIndex: '_id',
            key: 'delete',
            render: (_: any) => <ConfirmModal okOption={()=>{
                deleteExpense(navigator, message, _, setExpensesUpdated);
            }} confirmMessage="Are you sure you want to delete this expense?"/>
        }
    ];

    useEffect(() => {
        getExpenses(navigator, messageApi).then(data => {
            setData(data);
            setLoading(false);
        })
        setExpensesUpdated(false);
    }, [expensesUpdated])

    return (
        <div>
            {contextHolder}
            <Helmet>
                <title>Admin | Expenses</title>
            </Helmet>
            <PageHeader
                title="expenses"
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
                        title: 'expenses'
                    }
                ]}
            />
            <Row>
                <Col span={11} style={{ marginRight: '30px' }}>
                    <RangePicker style={{ width: '100%', marginBottom: '10px' }} />
                    <Card title="Expenses list" style={cardStyles}>
                        <Table
                            columns={CATEGORIES_COLUMNS}
                            dataSource={data}
                            loading={loading}
                            className="overflow-scroll"
                        />
                    </Card>
                </Col>
                <Col span={11}>
                    <Card title="Create expenses" style={cardStyles}>
                        <Form
                            name="basic"
                            form={form}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            autoComplete="off"
                            onFinish={(values) => {
                                createExpense(navigator, messageApi, values.name, values.price, values.date, setExpensesUpdated);
                                form.resetFields();
                            }}
                        >
                            <Form.Item<FieldType>
                                label="Expense name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your expense name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Expense price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your expense price!' }]}
                            >
                                <InputNumber<number>
                                    defaultValue={0}
                                    formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\€\s?|(,*)/g, '') as unknown as number}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Expense date"
                                name="date"
                                rules={[{ required: true, message: 'Please input your expense date!' }]}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 2, span: 36 }}>
                                <Button type="primary" htmlType="submit">
                                    <CheckCircleOutlined />
                                    Create
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ExpensePage;