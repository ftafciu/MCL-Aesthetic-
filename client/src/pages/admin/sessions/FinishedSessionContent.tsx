import { useEffect, useState } from 'react';
import {
    DeliveryRequestCard,
    PageHeader,
} from '../../../components';
import {
    DatePicker,
    message,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../../context';
import { getFinishedSessions } from './scripts/scripts';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

function FinishedSessions() {
    const stylesContext = useStylesContext();
    const today = dayjs();
    const [data, setData] = useState<any>([]);
    const [dateFilter, setDateFilter] = useState<null | any>({ startDate: today.toDate(), endDate: today.toDate() });
    const [dataUpdated, setDataUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setLoading(true);
        if(dateFilter) {
            getFinishedSessions(navigator, messageApi, dateFilter.startDate, dateFilter.endDate).then(data=>{
                setLoading(false);
                if(data)
                    setData(data);
            })
        } else {
            setData([]);
        }
        setDataUpdated(false);
    }, [dataUpdated, dateFilter])

    return (
        <div>
            {contextHolder}
            <Helmet>
                <title>Admin | Finished sessions</title>
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
                        title: 'finished sessions'
                    }
                ]}
            />
            <RangePicker style={{ marginBottom: '10px', width: '100%' }} onChange={(dates, dateStrings) => {
                if (dates) {
                    setDateFilter({ startDate: dates?.[0], endDate: dates?.[1] })
                } else {
                    setDateFilter({ startDate: today.toDate(), endDate: today.toDate() });
                }
            }} />
            <DeliveryRequestCard
                data={data}
            />
        </div>
    )
}

export default FinishedSessions;