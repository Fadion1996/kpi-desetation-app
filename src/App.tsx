import { Header, SidePanel, Popup, PopupNotification, Modeling } from './components'
import './App.css';

function App() {
  return (
    <div className="App">
      <Popup />
      <PopupNotification />
      <Header />
      <SidePanel />
      <Modeling />
    </div>
  );
}

export default App;
