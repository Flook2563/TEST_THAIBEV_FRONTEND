import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [showList, setShowList] = useState(false);

  return (
    <div style={{ 
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 1000,
      width: '100%',
    }}>
      <div style={{ marginBottom: 24, textAlign: 'right' }}>
        <button onClick={() => setShowList((v) => !v)} style={{ background: '#19b867', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, fontWeight: 500, cursor: 'pointer' }}>
          {showList ? 'กลับหน้าสร้างโปรไฟล์' : 'ดูรายการโปรไฟล์'}
        </button>
      </div>
      {showList ? <UserList /> : <UserForm />}
    </div>
  );
}

export default App
