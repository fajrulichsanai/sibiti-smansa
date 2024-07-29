import React, { useState, useEffect, Fragment } from "react";
import { Table, Select, Input, Button, Space, Modal, Form } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CmsTemplate from '../../components/template/CmsTemplate'
import Loading from "../../components/template/Loading"
import ModalPopup from "../../components/ConfirmModal";
import kelasHooks from "./hooks/kelasHooks";
import { render } from "react-dom";

const { Option } = Select;
const { Search } = Input;

const Kelas = () => {
    //form data
    const [form] = Form.useForm();
    const [kelasData, setKelasData] = useState([]);

    //hooks
    const { handleEdit, showModal, closeModal, fetchData, deleteData,
        searchKelas, handleSubmit,
        loading, isModalVisible } = kelasHooks(form, setKelasData)

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);


    const columns = [
        {
            title: "No",
            dataIndex: "id",
            key: "id",
            width: "3%",
            align : "center",
            render: (text, record, index) => index + 1 + (currentPage - 1) * pageSize,
        },
        {
            title: "Nama",
            dataIndex: "nama",
            key: "nama",
            width: "30%",
        },
        {
            title: "Kelas",
            dataIndex: "kelas",
            key: "kelas",
            width: "10%",
            align: 'center',
            render : (kelas) => `Kelas ${kelas}`
        },
        {
            title: "Jumlah Siswa",
            dataIndex: "jumlah_siswa",
            key: "jumlah_siswa",
            width: "10%",
            align: 'center',
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "10%",
            align: 'center',
            render: (status) => (
                <p style={{ color: status === 1 ? 'green' : 'red' }}>
                    {status === 1 ? "Aktif" : "Tidak Aktif"}
                </p>
            )
        },
        {
            title: "Action",
            align: "center",
            key: "id",
            render: (text, record) => (
                <Space size="small">
                    <Button
                        // key={record.id}
                        key={`delete-${record.id}`}
                        onClick={() => ModalPopup({
                            title: "Apakah anda ingin hapus kelas ini?",
                            onOk: () => {
                                deleteData(record.id);
                            },
                            content: "Klik Ok untuk hapus data",
                        }).showConfirm()
                        }
                        icon={<DeleteOutlined />}
                        danger
                    >
                    </Button>
                    <Button
                        key={`edit-${record.id}`}
                        onClick={() => handleEdit(record.id)}
                        icon={<EditOutlined />}
                    >
                    </Button>
                </Space>
            ),
            width: "10%",
        },
    ];

    return (
        <Fragment>
            <CmsTemplate>

                <div>
                    <h1 className="text-2xl font-semibold">Kelas</h1>
                    <div className="flex w-full justify-between mt-6 mb-4">
                        <Select
                            defaultValue="10"
                            style={{ width: 80 }}
                            onChange={(value) => setPageSize(value)}
                        >
                            <Option value="10">10</Option>
                            <Option value="25">25</Option>
                            <Option value="50">50</Option>
                        </Select>

                        <div className="space-x-2">
                            <Button type="primary" onClick={showModal}>Tambah</Button>
                            <Search
                                placeholder="Cari kelas"
                                allowClear
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        fetchData(); // Fetch all data when search input is cleared
                                    }
                                }}
                                onSearch={(value) => searchKelas(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={kelasData}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            onChange: (page, pageSize) => {
                                setCurrentPage(page);
                                setPageSize(pageSize);
                            },
                            showSizeChanger: false, position: ["bottomCenter"]
                        }}
                        size="small"
                    />

                    <Modal
                        title="Tambah Kelas"
                        visible={isModalVisible}
                        onOk={handleSubmit} // Mengubah handleOk menjadi handleSubmit
                        onCancel={closeModal}
                        okText="Simpan"
                        cancelText="Batal"
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="id"
                                label="id"
                                hidden={true}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="nama"
                                label="Nama"
                                rules={[{ required: true, message: 'Masukkan nama kelas' }]}
                            >
                                <Input disabled={form.getFieldValue('id') ? true : false} />
                            </Form.Item>
                            <Form.Item
                                name="kelas"
                                label="Kelas"
                                rules={[{ required: true, message: 'Pilih kelas' }]}
                            >
                                <Select optionLabelProp="label">
                                    <Option value="Kelas 10">Kelas 10</Option>
                                    <Option value="Kelas 11">Kelas 11</Option>
                                    <Option value="Kelas 12">Kelas 12</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: 'Pilih status kelas' }]}
                            >
                                <Select>
                                    <Option value="Aktif">Aktif</Option>
                                    <Option value="Tidak Aktif">Tidak Aktif</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>

                </div>
            </CmsTemplate>

            {loading && <Loading />}
        </Fragment>
    );
};

export default Kelas;
