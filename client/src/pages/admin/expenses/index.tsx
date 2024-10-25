import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Form, Input, Row, Table } from "antd";
import useFetchData from "../../../hooks/useFetchData";
import { CSSProperties } from "react";
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';

const { RangePicker } = DatePicker;

const cardStyles: CSSProperties = {
    height: '100%',
};

type FieldType = {
    name?: string;
    price?: number;
    date?: Date;
};

const CATEGORIES_COLUMNS = [
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (_: any) => <span>$ {_}</span>,
    },
];

function ExpensePage() {
    const {
        data: topCategories,
        error: topCategoriesError,
        loading: topCategoriesLoading,
    } = useFetchData('../mocks/TopCategories.json');
    return (
        <div>
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
                        {topCategoriesError ? (
                            <Alert
                                message="Error"
                                description={topCategoriesError.toString()}
                                type="error"
                                showIcon
                            />
                        ) : (
                            <Table
                                columns={CATEGORIES_COLUMNS}
                                dataSource={topCategories}
                                loading={topCategoriesLoading}
                                className="overflow-scroll"
                            />
                        )}
                    </Card>
                </Col>
                <Col span={11}>
                    <Card title="Create expenses" style={cardStyles}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            autoComplete="off"
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
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
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