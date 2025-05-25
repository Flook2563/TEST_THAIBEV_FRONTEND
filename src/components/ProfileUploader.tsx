import { Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProfileUploader: React.FC<Props> = ({ value, onChange, error }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleBeforeUpload = async (file: RcFile) => {
    setFileName(file.name);
    const base64 = await getBase64(file);
    onChange?.(base64);
    return false; 
  };

  const handleRemove = () => {
    setFileName(null);
    onChange?.('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        customRequest={() => {}}
        listType="picture"
        fileList={[]}
        onRemove={handleRemove}
      >
        <Button icon={<UploadOutlined />} type={error ? "default" : "default"} style={{ minWidth: 120, fontWeight: 500 }}>
          เลือกรูปภาพ
        </Button>
      </Upload>
      {fileName && (
        <Typography.Text type="secondary" style={{ marginTop: 8, marginLeft: 2, fontSize: 14, color: '#1890ff' }}>
          ไฟล์ที่เลือก: {fileName}
        </Typography.Text>
      )}
      {value && (
        <div style={{ marginTop: 10, border: '1px solid #eee', borderRadius: 8, padding: 4, background: '#fafafa' }}>
          <img src={value} alt="profile preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, boxShadow: '0 2px 8px #eee' }} />
        </div>
      )}
    </div>
  );
};

export default ProfileUploader;