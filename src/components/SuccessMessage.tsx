import { Alert } from 'antd';

interface Props {
  visible: boolean;
  userId?: string;
}

export default function SuccessMessage({ visible, userId }: Props) {
  if (!visible || !userId) return null;
  return (
    <Alert
      message={`save data success Id : ${userId}`}
      type="success"
      showIcon
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        minWidth: 220,
        zIndex: 999,
      }}
    />
  );
}