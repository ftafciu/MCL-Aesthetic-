
import { UserAvatar } from "../../../../components/UserAvatar/UserAvatar";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../components/PageHeader/PageHeader";
import { Helmet } from "react-helmet-async";
import { Button, Card, message, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteClient, getClients } from "../scripts/client-scripts";
import ConfirmModal from "../../../../components/ConfirmModal";
import TotalCard from "../../../../components/Card/TotalCard/TotalCard.tsx"

function ListContent() {
    const SELLER_COLUMNS = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, { name, surname }: any) => (
                <UserAvatar fullName={`${name} ${surname}`} />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_: any) => <Link to={`mailto:${_}`}>{_}</Link>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (phoneNumber: any) => <span>{phoneNumber}</span>,
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            key: 'actions',
            render: (_id: string) => {
                return (
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Button style={{ marginRight: '5px' }} onClick={() => navigate(`/client/edit/${_id}`)}>
                            <EditOutlined />
                        </Button>
                        <ConfirmModal okOption={() => { deleteClient(navigate, messageApi, _id, setClientsUpdated) }} confirmMessage="Are you sure you want to delete this client?" />
                    </div>
                )
            }
        }
    ];
    const [clients, setClients] = useState([]);
    const [clientsUpdated, setClientsUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        getClients(navigate, messageApi).then(data => {
            if (data) {
                setClients(data);
                setLoading(false);
            }
        });
        setClientsUpdated(false);
    }, [clientsUpdated])

    return (
        <div>
            {contextHolder}
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
            <Card title="Client list" extra={
                <div style={{ display: 'flex', alignItems: 'center', height: '120px'}}>
                    <TotalCard total={clients?.length} title={'Total clients'}/>
                </div>}>
                <Table
                    columns={SELLER_COLUMNS}
                    dataSource={clients}
                    loading={loading}
                    className="overflow-scroll"
                />
            </Card>
        </div>
    );
}

export default ListContent;