import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";

function ConfirmModal({ okOption, confirmMessage }: { okOption: any, confirmMessage: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}><DeleteOutlined /></Button>
      <Modal title="Please confirm" open={isModalOpen} onOk={() => {
        okOption();
        handleCancel();
      }} onCancel={handleCancel}>
        <p>{confirmMessage}</p>
      </Modal>
    </>
  )
}

export default ConfirmModal;