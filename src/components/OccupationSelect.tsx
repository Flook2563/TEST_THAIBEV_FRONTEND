import { Select } from 'antd';

const OCCUPATION_MOCK = [
  { value: 'React Developer', label: 'React Developer' },
  { value: 'Golang Developer', label: 'Golang Developer' },
  { value: 'NodeJs Developer', label: 'NodeJs Developer' },
];

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
}

export default function OccupationSelect({ value, onChange, error }: Props) {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={OCCUPATION_MOCK}
      placeholder="Please select occupation"
      status={error ? "error" : undefined}
      style={{ width: '100%' }}
      allowClear
    />
  );
}