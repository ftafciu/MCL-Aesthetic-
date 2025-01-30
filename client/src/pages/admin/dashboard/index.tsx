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
    DatePicker
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../../context';
import { getDailySessions } from '../sessions/scripts/scripts';
import { filterExpenses, filterProfits, getNotifications, retrieveStats } from './scripts';

const { RangePicker } = DatePicker;

const findExpensesNumbers = (expenses: any) => {
    const currentMonth = expenses.currentMonth;
    const previousMonth = expenses.previousMonth;
    const currentMonthTotal = currentMonth.reduce((acc: any, expense: any) => {
        return acc + expense.quantity.$numberDecimal;
    }, 0);
    const previousMonthTotal = previousMonth.reduce((acc: any, expense: any) => {
        return acc + expense.quantity.$numberDecimal;
    }, 0);
    let diff = ((parseFloat(currentMonthTotal) - parseFloat(previousMonthTotal)) / parseFloat(previousMonthTotal)) * 100
    if (!previousMonthTotal) {
        diff = 100;
    }
    return { total: currentMonthTotal, diff }
}

const findSessionNumbers = (sessions: any) => {
    const currentMonth = sessions.currentMonth;
    const previousMonth = sessions.previousMonth;
    const currentMonthTotal = currentMonth.reduce((acc: any, session: any) => {
        return acc + session.price;
    }, 0);
    const previousMonthTotal = previousMonth.reduce((acc: any, session: any) => {
        return acc + session.price;
    }, 0);
    let diff = ((parseFloat(currentMonthTotal) - parseFloat(previousMonthTotal)) / parseFloat(previousMonthTotal)) * 100
    if (!previousMonthTotal) {
        diff = 100;
    }
    return { total: currentMonthTotal, diff }
}

export const Dashboard = () => {
    const [profitData, setProfitData] = useState<any>({});
    const [expenseData, setExpenseData] = useState<any>({});
    const [dateFilter, setDateFilter] = useState<null | any>(null);
    const stylesContext = useStylesContext();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [sessionData, setSessionData] = useState([]);
    const [sessionDataUpdated, setSessionDataUpdated] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [expenses, setExpenses] = useState({
        currentMonth: [],
        previousMonth: []
    });
    const [sessions, setSessions] = useState({
        currentMonth: [],
        previousMonth: []
    });

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
        });
        if (dateFilter) {
            filterProfits(navigate, messageApi, dateFilter.startDate, dateFilter.endDate).then(data => {
                if (data)
                    setProfitData(data);
            });
            filterExpenses(navigate, messageApi, dateFilter.startDate, dateFilter.endDate).then(data => {
                if (data)
                    setExpenseData(data);
            });
        } else {
            retrieveStats(navigate, messageApi, "expenses").then(data => {
                if (data)
                    setExpenses(data);
            });
            retrieveStats(navigate, messageApi, "sessions").then(data => {
                if (data)
                    setSessions(data);
            });
        }
        setSessionDataUpdated(false);
    }, [sessionDataUpdated, dateFilter])

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
                    <Card
                        title="Statistics"
                        style={{ marginBottom: '10px' }}
                    >
                        <RangePicker style={{ marginBottom: '10px', width: '100%' }} onChange={(dates, dateStrings) => {
                            if (dates) {
                                setDateFilter({ startDate: dates?.[0], endDate: dates?.[1] })
                            } else {
                                setDateFilter(null);
                            }
                        }} />
                        <Row {...stylesContext?.rowProps} style={{ marginBottom: '10px' }}>
                            <Col span={12}>
                                <MarketingStatsCard
                                    data={[497, 81, 274, 337]}
                                    title="revenue"
                                    value={profitData?.value || findSessionNumbers(sessions).total}
                                    asCurrency
                                    style={{ height: '100%' }}
                                />
                            </Col>
                            <Col span={12}>
                                <MarketingStatsCard
                                    data={[337, 274, 497, 81]}
                                    title="cost"
                                    value={expenseData?.value || findExpensesNumbers(expenses).total}
                                    asCurrency
                                    style={{ height: '100%' }}
                                />
                            </Col>
                        </Row>
                    </Card>
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
