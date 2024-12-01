import React, { useState } from 'react';
import { Button, Checkbox, Form, InputNumber, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { finishSession } from '../scripts/scripts';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;

type FieldType = {
    comments?: string;
    price?: number;
};

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    style: { maxWidth: 475 },
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

function FinishSessionModal ({ dependency, sessionId }: { dependency: any, sessionId: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [price, setPrice] = useState(1);
    const [comments, setComments] = useState("");
    const [last, setLast] = useState(false);
    const [form] = Form.useForm();
    const navigator = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangePrice = (value: number | null) => {
        if(value)
            setPrice(value);
    }

    const onChangeComments = (value: string) => {
        setComments(value);
    }

    return (
        <>
        {contextHolder}
            <Button type="primary" onClick={showModal}>
                Finish session
            </Button>
            <Modal title="Confirm the end of this session" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ minWidth: 700 }}
                    autoComplete="off"
                    layout='vertical'
                    onFinish={(values) => {
                        finishSession(navigator, messageApi, dependency, sessionId, price, comments, last);
                        setIsModalOpen(false);
                    }}
                >
                    <Form.Item<FieldType>
                        label="Session's price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your session price!' }]}
                    >
                        <InputNumber<number>
                            style={{ width: '100%' }}
                            defaultValue={0}
                            value={price}
                            onChange={onChangePrice}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\€\s?|(,*)/g, '') as unknown as number}
                        />
                    </Form.Item>
                    <Form.Item label="Comments" name="comments">
                        <TextArea rows={4} value={comments} onChange={(event) => onChangeComments(event.target.value)}/>
                    </Form.Item>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag photos to this area to upload</p>
                    </Dragger>
                    <Checkbox style={{ marginTop: '15px' }} value={last} onChange={()=>setLast(!last)}>
                        Check if this is the last session
                    </Checkbox>
                </Form>
            </Modal>
        </>
    );
};

export default FinishSessionModal;