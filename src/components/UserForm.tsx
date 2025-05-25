import { useState } from 'react';
import { Button, Form, Input, DatePicker, Radio, Row, Col, Typography, Space } from 'antd';
import dayjs from 'dayjs';
import { createUser, checkEmailExists } from '../api/userApi';
import type { UserProfileForm } from '../types/user';
import OccupationSelect from './OccupationSelect';
import ProfileUploader from './ProfileUploader';
import SuccessMessage from './SuccessMessage';

const { Title } = Typography;

const INIT_FORM: UserProfileForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  profile: '',
  occupation: '',
  birth_day: '',
  sex: 'Male',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^0[0-9]{9}$/;

export default function UserForm() {
  const [form] = Form.useForm<UserProfileForm>();
  const [saving, setSaving] = useState(false);
  const [successId, setSuccessId] = useState<string | undefined>();
  const [showSuccess, setShowSuccess] = useState(false);

  const onFinish = async (values: UserProfileForm) => {
    setSaving(true);
    try {
      const birthDay = dayjs(values.birth_day).format('YYYY-MM-DD');
      const payload: UserProfileForm = { ...values, birth_day: birthDay };

      const exists = await checkEmailExists(values.email);
      if (exists) {
        form.setFields([
          { name: 'email', errors: ['Email already exists'] }
        ]);
        setSaving(false);
        return;
      }

      const res = await createUser(payload);
      setSuccessId(res.user_id);
      setShowSuccess(true);
      form.resetFields();
    } catch (e: any) {
    } finally {
      setSaving(false);
      setTimeout(() => setShowSuccess(false), 2500);
    }
  };

  const onClear = () => {
    form.resetFields();
    setSuccessId(undefined);
    setShowSuccess(false);
  };

  return (
      <>
        <Title 
          level={4} 
          style={{ 
            background: '#19b867', 
            color: '#fff', 
            textAlign: 'center', 
            padding: '8px 0', 
            marginBottom: 0 ,
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
          }}
        >
        IT 04-1
        </Title>
        <SuccessMessage visible={showSuccess} userId={successId} />
        <div
        style={{
          border: '2px solid #222',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px', 
          padding: 24, 
          position: 'relative', 
          background: '#fff', 
          minWidth: 600 
        }}
        >
          <Form
        form={form}
        layout="vertical"
        initialValues={INIT_FORM}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: "Please input First Name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: "Please input Last Name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input Email" },
                { pattern: EMAIL_REGEX, message: "Please provide a valid Email" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input Phone" },
                { pattern: PHONE_REGEX, message: "Please provide a valid Phone" }
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Profile"
              name="profile"
              rules={[
                { required: true, message: "Please select any profile" },
              ]}
              valuePropName="value"
            >
              <ProfileUploader />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Birth Day"
              name="birth_day"
              rules={[
                { required: true, message: "Please provide a valid Birth Day" },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
                placeholder="วัน/เดือน/ปี"
                allowClear={false}
                inputReadOnly
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Occupation"
          name="occupation"
          rules={[
            { required: true, message: "Please select any Occupation" },
          ]}
        >
          <OccupationSelect />
        </Form.Item>
        <Form.Item
          label="Sex"
          name="sex"
          rules={[{ required: true, message: "Please select Sex" }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Space size="large" style={{ width: "100%", justifyContent: 'center', marginTop: 20 }}>
          <Button type="primary" htmlType="submit" style={{ background: '#19b867' }} loading={saving}>
            Save
          </Button>
          <Button onClick={onClear} disabled={saving}>
            Clear
          </Button>
        </Space>
      </Form>
        </div>
      </>
  );
}