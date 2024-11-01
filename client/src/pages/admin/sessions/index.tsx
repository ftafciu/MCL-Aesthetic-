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

function SessionPage() {
    const stylesContext = useStylesContext();
    const {
        data: trucksDeliveryRequestData,
        loading: trucksDeliveryRequestDataLoading,
        error: trucksDeliveryRequestDataError,
    } = useFetchData('../mocks/TruckDeliveryRequest.json');

    return (
        <div>
            <Helmet>
                <title>Admin | Sessions</title>
            </Helmet>
            <PageHeader
                title="session management"
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
                        title: 'sessions'
                    }
                ]}
            />
            <DeliveryRequestCard
                data={trucksDeliveryRequestData}
                loading={trucksDeliveryRequestDataLoading}
                error={trucksDeliveryRequestDataError}
            />
        </div>
    )
}

export default SessionPage;