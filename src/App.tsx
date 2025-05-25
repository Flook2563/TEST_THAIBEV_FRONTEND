import UserForm from './components/UserForm';

function App() {

 return (
    <div style={{ 
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 800,
      width: '100%',
    }}>
      <UserForm />
    </div>
  );
}

export default App
