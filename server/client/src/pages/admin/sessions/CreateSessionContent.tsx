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
    DatePicker,
    Flex,
    message,
    Radio,
    RadioChangeEvent,
    Row,
    Select,
    Typography,
} from 'antd';
import { BackwardOutlined, CheckOutlined, HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../../context';
import { useFetchData } from '../../../hooks';
import { Projects } from '../../../types';
import CountUp from 'react-countup';
import HeadSession from './components/HeadSessionForm';
import LaserSession from './components/LaserSession';
import CalendarPlaceholder from "../../../assets/calendar.png";
import { getClients } from '../clients/scripts/client-scripts';
import { createSession, createSessionFromNotification } from './scripts/scripts';

const RadioOptions = [
    { label: <div><b>Body treatment</b></div>, value: 'body' },
    { label: <div><b>Face treatment</b></div>, value: 'face' },
    { label: <div><b>Laser treatment</b></div>, value: 'laser' }
]

const initialBodyParts = {
    face: false,
    arms: false,
    armpits: false,
    legs: false,
    bikini: false,
    back: false,
    abs: false
};

const initialFaceTreatments = {
    cleaner: false,
    mesotherapy: false,
    fillers: false,
    botox: false,
    dermopen: false
};

const generateBodySession = (client: string, date: Date) => {
    return {
        client,
        date,
        type: "Body treatment"
    };
};

const generateFaceSession = (client: string, date: Date, treatment: any) => {
    return {
        client,
        date,
        treatment,
        type: "Face session"
    }
};

const generateLaserSession = (client: string, date: Date, bodyParts: any) => {
    return {
        client,
        date,
        bodyParts,
        type: "Laser session"
    }
};

function CreateSessionContent() {
    const location = useLocation();
    const { notificationClient, notificationId } = location.state || {};
    const [client, setClient] = useState<string | null>(notificationClient?._id || null);
    const [possibleClients, setPossibleClients] = useState([]);
    const [faceTreatment, setFaceTreatment] = useState(initialFaceTreatments);
    const [bodyParts, setBodyParts] = useState(initialBodyParts)
    const [sessionType, setSessionType] = useState('body');
    const [sessionDate, setSessionDate] = useState<any>();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onChangeFaceTreatment = (fieldName: string, newValue: boolean) => {
        setFaceTreatment((prev: any) => {
            prev[fieldName] = newValue;
            return { ...prev }
        })
    };

    const onChangeBodyParts = (fieldName: string, newValue: boolean) => {
        setBodyParts((prev: any) => {
            prev[fieldName] = newValue;
            return { ...prev }
        })
    };

    useEffect(() => {
        getClients(navigate, messageApi).then((data: any) => {
            if (data) {
                setPossibleClients(data);
            }
        })
    }, []);

    useEffect(() => {
        if (client) {
            let selectedClient: any = notificationClient;
            if (possibleClients.length) {
                selectedClient = possibleClients.filter((c: any) => c._id === client)[0];
            }
            setBodyParts(selectedClient?.plannedTreatment?.plannedBodyParts);
            setFaceTreatment(selectedClient?.plannedTreatment?.plannedFaceTreatment);
        } else {
            setBodyParts(initialBodyParts);
            setFaceTreatment(initialFaceTreatments);
        }
    }, [client])

    return (
        <div>
            {contextHolder}
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
                        <Select placeholder="Select a client" value={client} defaultValue={notificationClient?._id || null} onChange={(value) => {
                            setClient(notificationClient?._id || value);
                        }} style={{ marginBottom: '15px' }}>
                            <Select.Option value={null}>{``}</Select.Option>
                            {
                                possibleClients.map((possibleClient: any) => {
                                    return <Select.Option value={possibleClient._id}>{`${possibleClient.name} ${possibleClient.surname}`}</Select.Option>
                                })
                            }
                        </Select>
                        <DatePicker style={{ marginBottom: '15px' }} onChange={(value) => setSessionDate(value)} />
                        {client && <><p>Select the treatment type</p>
                            <Radio.Group options={RadioOptions} optionType='button' value={sessionType} onChange={(e: RadioChangeEvent) => {
                                setSessionType(e.target.value);
                            }} /></>}
                        {sessionType === 'face' && <HeadSession defaultValues={faceTreatment} onChangeInfo={onChangeFaceTreatment} />}
                        {sessionType === 'laser' && <LaserSession defaultValues={bodyParts} onChangeInfo={onChangeBodyParts} />}
                        <Button style={{ marginTop: '15px' }} type='primary' onClick={() => {
                            if (client && sessionType && sessionDate) {
                                let sessionInfo = {}
                                if (sessionType === 'face') {
                                    sessionInfo = generateFaceSession(client, sessionDate, faceTreatment);
                                } else if (sessionType === 'body') {
                                    sessionInfo = generateBodySession(client, sessionDate);
                                } else {
                                    sessionInfo = generateLaserSession(client, sessionDate, bodyParts)
                                }
                                if(notificationClient)
                                    createSessionFromNotification(navigate, messageApi, sessionType, sessionInfo, notificationId);
                                else
                                    createSession(navigate, messageApi, sessionType, sessionInfo)
                            } else {
                                messageApi.open({
                                    type: 'error',
                                    content: 'Data is missing!'
                                })
                            }
                        }}>
                            <CheckOutlined />
                            Confirm
                        </Button>
                    </Col>
                    <Col style={{
                        width: '50%',
                        display: 'flex',
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