import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'
import { MainContext } from './context/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MainContext>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </MainContext>,
)
