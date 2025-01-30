import {
  Card as AntdCard,
  Button,
  CardProps,
  Descriptions,
  DescriptionsProps,
  Flex,
  message,
  Tooltip,
  Typography,
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Projects } from '../../../../types';

import './styles.css';
import { useNavigate } from 'react-router-dom';
import { changeStatus } from '../../../../pages/admin/dashboard/scripts';
import PostponeModal from './PostponeModal';

const { Text, Title } = Typography;

type Props = {
  project: any;
  size?: 'small' | 'default';
} & CardProps;

export const ProjectsCard = (props: Props) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    size,
    project: {
      _id,
      client,
      nextSessionDate,
      type,
    },
    ...others
  } = props;

  const items: DescriptionsProps['items'] = [
    {
      key: 'name',
      label: 'Name',
      children: (
        <span className="text-capitalize">{client.name}</span>
      ),
      span: 24,
    },
    {
      key: 'surname',
      label: 'Surname',
      children: client.surname,
      span: 24,
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      children: client.phoneNumber,
      span: 24,
    },
    {
      key: 'age',
      label: 'Age',
      children: <span className="text-capitalize">{client.age}</span>,
      span: 24,
    },
    {
      key: 'sessionDate',
      label: 'Session Date',
      children: <span>{nextSessionDate.slice(0, 10)}</span>,
      span: 24,
    },
    {
      key: "button",
      label: "",
      children: <Flex flex='row' justify='space-between' style={{ width: '70%'}}>
        <Button style={{ backgroundColor: "#4169E1", color: 'white' }} onClick={() => {
          navigate('/sessions/create-session', {
            state: {
                notificationClient: client,
                notificationId: _id
            },
        });
        }}>Reserve</Button>
        <Button style={{ backgroundColor: "red", color: 'white' }} onClick={() => {
          changeStatus(navigate, messageApi, _id)
        }}>Cancel</Button>
        <PostponeModal notificationId={_id}/>
      </Flex>
    }
  ];

  return size === 'small' ? (
    <AntdCard
      bordered
      hoverable={true}
      className="project-small-card"
      {...others}
    >
      {contextHolder}
      <br />
      <Flex wrap="wrap" gap="small" className="text-capitalize">
        <Text>
          Name: <b>{client.name},</b>
        </Text>
        <Text>
          Surname: <b>{client.surname},</b>
        </Text>
        <Text>
          Phone Number: <b>{client.phoneNumber},</b>
        </Text>
        <Text>
          Age: <b>{client.age},</b>
        </Text>
        <Text>
          Session Date: <b>{nextSessionDate.slice(0, 10)}</b>
        </Text>
      </Flex>
    </AntdCard>
  ) : (
    <AntdCard bordered hoverable={true} {...others}>
      <Descriptions
        items={items}
        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
      />
    </AntdCard>
  );
};
