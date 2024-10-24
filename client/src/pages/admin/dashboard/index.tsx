import { useRef } from 'react';
import {
    Card,
    DeliveryRequestCard,
    GetStartedCard,
    Loader,
    MarketingStatsCard,
    NotificationsCard,
    PageHeader,
    ProjectsCard,
    TasksChartCard,
    TasksListCard,
    WeeklyActivityCard,
} from '../../../components';
import {
    Alert,
    Button,
    CardProps,
    Carousel,
    CarouselProps,
    Col,
    Flex,
    Row,
    Typography,
} from 'antd';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../../context';
import { useFetchData } from '../../../hooks';
import { Projects } from '../../../types';
import CountUp from 'react-countup';

export const Dashboard = () => {
    const stylesContext = useStylesContext();
    const {
        data: projectsData,
        error: projectsDataError,
        loading: projectsDataLoading,
    } = useFetchData('../mocks/Projects.json');
    const {
        data: trucksDeliveryRequestData,
        loading: trucksDeliveryRequestDataLoading,
        error: trucksDeliveryRequestDataError,
    } = useFetchData('../mocks/TruckDeliveryRequest.json');

    return (
        <div>
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
                                title="Recently added projects"
                                extra={<Button>View all projects</Button>}
                            >
                                {projectsDataError ? (
                                    <Alert
                                        message="Error"
                                        description={projectsDataError.toString()}
                                        type="error"
                                        showIcon
                                    />
                                ) : projectsDataLoading ? (
                                    <Loader />
                                ) : (
                                    <Carousel arrows autoplay>
                                        {projectsData.slice(0, 4).map((o: Projects) => {
                                            return (
                                                <div>
                                                    <ProjectsCard
                                                        project={o}
                                                        type="inner"
                                                        style={{ width: '100%', height: 'fit-content' }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Carousel>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} xl={12}>
                    <DeliveryRequestCard
                        data={trucksDeliveryRequestData}
                        loading={trucksDeliveryRequestDataLoading}
                        error={trucksDeliveryRequestDataError}
                    />
                </Col>
            </Row>
        </div>
    )
}
