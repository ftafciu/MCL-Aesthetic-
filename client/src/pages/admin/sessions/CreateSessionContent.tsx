import { useRef, useState } from 'react';
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
    DatePicker,
    Flex,
    Radio,
    RadioChangeEvent,
    Row,
    Select,
    Typography,
} from 'antd';
import { BackwardOutlined, CheckOutlined, HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../../context';
import { useFetchData } from '../../../hooks';
import { Projects } from '../../../types';
import CountUp from 'react-countup';
import HeadSession from './components/HeadSessionForm';
import LaserSession from './components/LaserSession';
import CalendarPlaceholder from "../../../assets/calendar.png";

const RadioOptions = [
    { label: <div><b>Body treatment</b></div>, value: 'body' },
    { label: <div><b>Face treatment</b></div>, value: 'face'},
    { label: <div><b>Laser treatment</b></div>, value: 'laser'}
]

function CreateSessionContent() {
    const [client, setClient] = useState(null);
    const [sessionType, setSessionType] = useState('body');
    return (
        <div>
            <Helmet>
                <title>Admin | Create session</title>
            </Helmet>
            <PageHeader
                title="create session"
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
                        title: 'create session'
                    }
                ]}
            />
            <Card>
                <Row>
                    <Col style={{ display: 'flex', width: '50%', flexDirection: 'column' }}>
                        <Select placeholder="Select a client" style={{ marginBottom: '15px' }}>
                            <option>test 1</option>
                            <option>test 2</option>
                            <option>test 3</option>
                        </Select>
                        <DatePicker style={{ marginBottom: '15px' }}/>
                        <p>Select the treatment type</p>
                        <Radio.Group options={RadioOptions} optionType='button' value={sessionType} onChange={(e: RadioChangeEvent) => {
                            setSessionType(e.target.value);
                        }}/>
                        { sessionType === 'face' && <HeadSession /> }
                        { sessionType === 'laser' && <LaserSession /> }
                        <Button style={{ marginTop: '15px' }} type='primary'>
                            <CheckOutlined />
                            Confirm
                        </Button>
                    </Col>
                    <Col style={{ 
                        width: '50%',
                        display:'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <img src={CalendarPlaceholder} alt='calendar placeholder' width={'50%'}></img>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default CreateSessionContent;