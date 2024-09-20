import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Layout/Layout';
import { LoginProvider } from './Components/Context/LoginContext'; 
import { ClientProvider } from './Components/Context/clientContext';
import { AccountProvider } from './Components/Context/AccountContext';

function App() {
  return (
    <AccountProvider>
      <ClientProvider>
        <LoginProvider>
          <Header />
        </LoginProvider>
      </ClientProvider>
    </AccountProvider>
  );
}

export default App;
