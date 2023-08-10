import logo from './logo.svg';
import './App.css';
import MainComponent from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom/dist';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <MainComponent/>
      </div>
    </BrowserRouter>
  );
}

export default App;
