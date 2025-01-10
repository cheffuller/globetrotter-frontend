import { Container, Tab, Tabs } from 'react-bootstrap';
import { LoginForm } from '../../components/login/LoginForm';
import RegisterPage from '../register/RegisterPage';
import { AccountRole } from '../../enums/AccountRole';

export function LoginPage() {
  return (
    <div className='register-container'>
    <Container className='w-25 mt-5 text-center login'>
      <Tabs
        defaultActiveKey='login'
        className='login-tab mb-3'
      >
        <Tab eventKey='login' title='Login'>
          <LoginForm loginMode={AccountRole.User}/>
        </Tab>{}
        <Tab eventKey='register' title='Register'>
          <RegisterPage />
        </Tab>
        <Tab eventKey='moderator' title='Moderator'>
        <LoginForm loginMode={AccountRole.Moderator}/>
        </Tab>
      </Tabs>
    </Container></div>
  );
}
