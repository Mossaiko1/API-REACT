import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Layout/Layout'
import { LoginContext } from './Components/Context/LoginContext';

function App() {

  return (
    <>
      <LoginContext>
        <Header/>
      </LoginContext>
    </>
  );
}

export default App
