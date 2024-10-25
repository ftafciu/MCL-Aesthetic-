import { blue, green, red, yellow } from "@ant-design/colors";
import { numberWithCommas } from "../../../../utils";
import Progress from "antd/es/progress";
import { UserAvatar } from "../../../../components/UserAvatar/UserAvatar";
import { Link } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
import { HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../components/PageHeader/PageHeader";
import { Helmet } from "react-helmet-async";
import { Alert, Card, Table } from "antd";

function ListContent() {
    const SELLER_COLUMNS = [
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (_: any, { first_name, last_name }: any) => (
                <UserAvatar fullName={`${first_name} ${last_name}`} />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_: any) => <Link to={`mailto:${_}`}>{_}</Link>,
        },
        {
            title: 'Region',
            dataIndex: 'sales_region',
            key: 'sales_region',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Volume',
            dataIndex: 'sales_volume',
            key: 'sales_volume',
            render: (_: any) => <span>{numberWithCommas(Number(_))}</span>,
        },
        {
            title: 'Amount',
            dataIndex: 'total_sales',
            key: 'total_sales',
            render: (_: any) => <span>${numberWithCommas(Number(_))}</span>,
        },
        {
            title: 'Satisfaction rate',
            dataIndex: 'customer_satisfaction',
            key: 'customer_satisfaction',
            render: (_: any) => {
                let color;

                if (_ < 20) {
                    color = red[5];
                } else if (_ > 21 && _ < 50) {
                    color = yellow[6];
                } else if (_ > 51 && _ < 70) {
                    color = blue[5];
                } else {
                    color = green[6];
                }

                return <Progress percent={_} strokeColor={color} />;
            },
        },
    ];
    const {
        data: topSellers,
        error: topSellersError,
        loading: topSellersLoading,
    } = useFetchData('../mocks/TopSeller.json');

    return (
        <div>
            <Helmet>
                <title>Clients | Admin</title>
            </Helmet>
            <PageHeader
                title="clients hub"
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
                        title: 'clients',
                    },
                ]}
            />
            <Card title="Client list">
                {topSellersError ? (
                    <Alert
                        message="Error"
                        description={topSellersError.toString()}
                        type="error"
                        showIcon
                    />
                ) : (
                    <Table
                        columns={SELLER_COLUMNS}
                        dataSource={topSellers}
                        loading={topSellersLoading}
                        className="overflow-scroll"
                    />
                )}
            </Card>
        </div>
    );
}

export default ListContent;