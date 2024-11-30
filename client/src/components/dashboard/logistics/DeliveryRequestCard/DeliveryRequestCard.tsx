import { Badge, Button, CardProps, Flex, List, Space, Typography } from 'antd';
import { Card, UserAvatar } from '../../../index.ts';

import './styles.css';
import { ReactNode } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FinishSessionModal from '../../../../pages/admin/sessions/components/FinishSessionModal.tsx';

type Props = {
  data?: any[];
  loading?: boolean;
  error?: ReactNode;
  seeAll?: boolean;
} & CardProps;

const generateBodyPartsString = (bodyParts: any) => {
  let bodyPartsString = ''
  for (let key in bodyParts) {
    if (bodyParts[key] && key !== '_id')
      bodyPartsString += `${key} `;
  }
  return bodyPartsString;
}

export const DeliveryRequestCard = ({ data, seeAll, ...others }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      title="Sessions list"
      className="delivery-request-card card"
      extra={seeAll && <Button onClick={() => navigate('/sessions')}>See all</Button>}
      {...others}
    >
      <List
        size="large"
        className="delivery-request-list"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
          align: 'center',
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <Space style={{ justifyContent: 'space-between', width: '100%' }}>
              <Flex vertical gap="small">
                <Typography.Text strong style={{ textTransform: 'capitalize' }}>
                  {item?.name}
                </Typography.Text>
                <Badge
                  color="red"
                  text={
                    <Typography.Text>
                      Client status: {item.client.status}
                    </Typography.Text>
                  }
                />
                <Badge
                  color="geekblue"
                  text={
                    <Typography.Text>
                      Session type: {item.type}
                    </Typography.Text>
                  }
                />
                {
                  item.treatment &&
                  <Badge
                    color="green"
                    text={
                      <Typography.Text>
                        Treatments: {generateBodyPartsString(item.treatment)}
                      </Typography.Text>
                    }
                  />
                }
                {
                  item.bodyParts &&
                  <Badge
                    color="green"
                    text={
                      <Typography.Text>
                        Body parts: {generateBodyPartsString(item.bodyParts)}
                      </Typography.Text>
                    }
                  />
                }
              </Flex>
              <Flex vertical align="flex-end" gap="small">
                <Flex gap={4} align="center">
                  <CalendarOutlined />
                  <Typography.Text>{item.date.slice(0, 10)}</Typography.Text>
                </Flex>
                <UserAvatar
                  fullName={`${item.client.name} ${item.client.surname}`}
                  align="flex-end"
                  textWidth="auto"
                />
                <Flex gap={4}>
                  <Typography.Text>Contact:</Typography.Text>
                  <Typography.Link href={`tel:${item.client.phoneNumber}`}>
                    {item.client.phoneNumber}
                  </Typography.Link>
                </Flex>
                {!item?.price && <FinishSessionModal />}
              </Flex>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};
