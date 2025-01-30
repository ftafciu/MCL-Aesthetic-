import { useState } from 'react';
import { Button, message, Modal } from 'antd';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { postponeNotification } from '../../../../pages/admin/dashboard/scripts';

function PostponeModal({ notificationId }: { notificationId: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDate, setNewDate] = useState<Dayjs | null>(null);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        postponeNotification(navigate, messageApi, notificationId, newDate).then(response => {
            if (response)
                setIsModalOpen(false);
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setNewDate(date)
    };

    return (
        <>
            {contextHolder}
            <Button style={{ backgroundColor: "gainsboro", color: 'white' }} onClick={showModal}> Postpone</Button>
            <Modal title="Postpone this notification" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Select the new date for this notification</p>
                <DatePicker onChange={onChange} />
            </Modal>
        </>
    );
};

export default PostponeModal;