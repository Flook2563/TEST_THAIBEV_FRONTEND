import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Typography } from 'antd';
import { getAllUsers, deleteProfile } from '../api/userApi';
import type { UserProfileResponse } from '../types/user';

const { Title } = Typography;

export default function UserList() {
  const [users, setUsers] = useState<UserProfileResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      console.log('Fetched users:', data);
    } catch (e) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user_id: string) => {
    setLoading(true);
    try {
      await deleteProfile(user_id);
      message.success('Deleted successfully');
      fetchUsers();
    } catch (e) {
      message.error('Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'User ID', dataIndex: 'user_id', key: 'user_id' },
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Occupation', dataIndex: 'occupation', key: 'occupation' },
    { title: 'Sex', dataIndex: 'sex', key: 'sex' },
    { title: 'Birth Day', dataIndex: 'birth_day', key: 'birth_day',
      render: (date: string) => {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return date;
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: UserProfileResponse) => (
        <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.user_id)} okText="Yes" cancelText="No">
          <Button danger size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 1000 }}>
      <Title level={4} style={{ marginBottom: 24 }}>User Profiles</Title>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="user_id"
        loading={loading}
        pagination={false}
      />
    </div>
  );
}
