import { useEffect, useRef, useState } from 'react';
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
    DatePicker,
    Typography,
    message,
} from 'antd';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../../context';
import { useFetchData } from '../../../hooks';
import { Projects } from '../../../types';
import CountUp from 'react-countup';
import { getSessions, getSessionsByTimeRange } from './scripts/scripts';

const { RangePicker } = DatePicker;

function SessionPage() {
    const stylesContext = useStylesContext();
    const [data, setData] = useState<any>([]);
    const [dateFilter, setDateFilter] = useState<null | any>(null);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setLoading(true);
        if (dateFilter) {
            getSessionsByTimeRange(navigator, messageApi, dateFilter.startDate, dateFilter.endDate).then(data => {
                setData(data);
                setLoading(false);
            })
        } else {
            getSessions(navigator, messageApi).then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
        }
        setDataUpdated(false);
    }, [dataUpdated, dateFilter])

    return (
        <div>
            {contextHolder}
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
            <RangePicker style={{ marginBottom: '10px', width: '100%' }} onChange={(dates, dateStrings) => {
                if (dates) {
                    setDateFilter({ startDate: dates?.[0], endDate: dates?.[1] })
                } else {
                    setDateFilter(null);
                }
            }} />
            <DeliveryRequestCard
                data={data}
                dependency={setDataUpdated}
            />
        </div>
    )
}

export default SessionPage;