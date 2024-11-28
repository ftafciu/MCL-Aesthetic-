import {
  Card as AntdCard,
  Button,
  CardProps,
  Descriptions,
  DescriptionsProps,
  Flex,
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

const { Text, Title } = Typography;

type Props = {
  project: any;
  size?: 'small' | 'default';
} & CardProps;

export const ProjectsCard = (props: Props) => {
  const {
    size,
    project: {
      name, 
      surname,
      phoneNumber,
      age,
      sessionDate,
      sessionType,
      bodyParts,
    },
    ...others
  } = props;

  const items: DescriptionsProps['items'] = [
    {
      key: 'name',
      label: 'Name',
      children: (
        <span className="text-capitalize">{name}</span>
      ),
      span: 24,
    },
    {
      key: 'surname',
      label: 'Surname',
      children: surname,
      span: 24,
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      children: phoneNumber,
      span: 24,
    },
    {
      key: 'age',
      label: 'Age',
      children: <span className="text-capitalize">{age}</span>,
      span: 24,
    },
    {
      key: 'sessionDate',
      label: 'Session Date',
      children: <span>{sessionDate.toString().slice(0,10)}</span>,
      span: 24,
    },
    {
      key: 'sessionType',
      label: 'Session Type',
      children: <span className="text-capitalize">{sessionType}</span>,
    },
    {
      key: 'bodyParts',
      label: 'Body Parts',
      children: <span className="text-capitalize">{bodyParts}</span>,
    },
    {
      key: "button",
      label: "",
      children: <Button style={{backgroundColor: "#4169E1"}}>Actions</Button>
    }
  ];

  return size === 'small' ? (
    <AntdCard
      bordered
      hoverable={true}
      className="project-small-card"
      {...others}
    >
      <br />
      <Flex wrap="wrap" gap="small" className="text-capitalize">
        <Text>
          Name: <b>{name},</b>
        </Text>
        <Text>
          Surname: <b>{surname},</b>
        </Text>
        <Text>
          Phone Number: <b>{phoneNumber},</b>
        </Text>
        <Text>
          Age: <b>{age},</b>
        </Text>
        <Text>
          Session Date: <b>{sessionDate.toString().slice(0,10)}</b>
        </Text>
        <Text>
          Session Type: <b>{sessionType}</b>
        </Text>
        <Text>
          Body Parts: <b>{bodyParts}</b>
        </Text>
        <Button>Book Session</Button>
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
