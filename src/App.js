import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DashboardRouter from './router/DshboardRouter';
import { Provider } from 'react-redux';
import { store  } from './redux/store';
function App() {
  return (
    <>
      <BrowserRouter>
      <Provider store={store}>
      <DashboardRouter/>
      </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
