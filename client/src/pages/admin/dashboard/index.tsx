import { useEffect, useState } from 'react';
import {
    Card,
    DeliveryRequestCard,
    MarketingStatsCard,
    PageHeader,
    ProjectsCard,
} from '../../../components';
import {
    Carousel,
    Col,
    Empty,
    message,
    Row,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../../context';
import { getDailySessions } from '../sessions/scripts/scripts';
import { getNotifications } from './scripts';

export const Dashboard = () => {
    const stylesContext = useStylesContext();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [sessionData, setSessionData] = useState([]);
    const [sessionDataUpdated, setSessionDataUpdated] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getDailySessions(navigate, messageApi).then(data => {
            if (data) {
                setSessionData(data);
            }
        });
        getNotifications(navigate, messageApi).then(data => {
            if (data) {
                setNotifications(data);
            }
        })
        setSessionDataUpdated(false);
    }, [sessionDataUpdated])

    return (
        <div>
            {contextHolder}
            <Helmet>
                <title>Admin | Dashboard</title>
            </Helmet>
            <PageHeader
                title="dashboard"
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
                ]}
            />
            <Row>
                <Col span={11} offset={0.5} style={{ marginRight: '30px' }}>
                    <Row {...stylesContext?.rowProps} style={{ marginBottom: '10px' }}>
                        <Col span={12}>
                            <MarketingStatsCard
                                data={[497, 81, 274, 337]}
                                title="revenue"
                                diff={34.6}
                                value={9321.92}
                                asCurrency
                                style={{ height: '100%' }}
                            />
                        </Col>
                        <Col span={12}>
                            <MarketingStatsCard
                                data={[337, 274, 497, 81]}
                                title="cost"
                                diff={6.3}
                                value={5550.0}
                                asCurrency
                                style={{ height: '100%' }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card
                                title="Upcoming Sessions"
                                style={{ width: '465px' }}
                            >
                                <Carousel arrows autoplay>
                                    {notifications.length ? notifications.map((o: any) => {
                                        return (
                                            <div>
                                                <ProjectsCard
                                                    project={o}
                                                    type="inner"
                                                    style={{ width: '100%', height: 'fit-content' }}
                                                />
                                            </div>
                                        );
                                    }) : <div><Empty /></div>}
                                </Carousel>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} xl={12}>
                    <DeliveryRequestCard
                        data={sessionData}
                        seeAll={true}
                        dependency={setSessionDataUpdated}
                    />
                </Col>
            </Row>
        </div>
    )
}
