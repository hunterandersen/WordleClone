import './App.css';
import TileRow from './Components/TileRow';

function App() {
  return (
    <div className="App">
      <TileRow/>
      <header className="App-header">
        <p>
          Hello Hunter
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
    </div>
  );
}

export default App;
