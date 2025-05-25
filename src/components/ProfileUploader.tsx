import { Upload, Button, Typography } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
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

  React.useEffect(() => {
    if (!value) setFileName(null);
  }, [value]);

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
      {value && fileName && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 12,
          background: '#fafafa',
          border: '1px solid #eee',
          borderRadius: 8,
          padding: 8,
          minHeight: 64
        }}>
          <img
            src={value}
            alt="profile preview"
            style={{
              width: 48,
              height: 48,
              objectFit: 'cover',
              borderRadius: 8,
              boxShadow: '0 2px 8px #eee',
              border: '1px solid #e0e0e0',
              background: '#fff'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <Typography.Text
              style={{ fontWeight: 500, fontSize: 15, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}
              title={fileName || undefined}
            >
              {fileName}
            </Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12, color: '#888' }}>
              Preview
            </Typography.Text>
          </div>
          <Button danger size="small" onClick={handleRemove} style={{ alignSelf: 'flex-start', padding: 0, width: 24, height: 24, minWidth: 24, minHeight: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={<CloseOutlined style={{ fontSize: 14 }} />} />
        </div>
      )}
    </div>
  );
};

export default ProfileUploader;