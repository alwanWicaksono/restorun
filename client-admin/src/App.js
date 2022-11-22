import router from './router';
import { RouterProvider } from 'react-router-dom';
import store from './store';
import { Provider as ReduxProvider } from 'react-redux';

function App() {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;