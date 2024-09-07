import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const ConfirmModal = ({ title, onOk, onCancel, content }) => {
    const showConfirm = () => {
        Modal.confirm({
            title: title || 'Do you want to delete these items?',
            icon: <QuestionCircleOutlined />,
            content: content || 'Some descriptions',
            onOk: onOk || (() => {}),
            onCancel: onCancel || (() => {}),
        });
    };

    const success = () =>{
      Modal.success({
        title: title,
        content: content,
        onOk : onOk
      });
    }

    const error = () => {
      Modal.error({
        title: title,
        content: content,
      });
    };

    return { showConfirm, success, error };
};

export default ConfirmModal;
