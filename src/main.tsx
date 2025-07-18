import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/router'

import { store } from './redux/Store/Store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
     <RouterProvider router={router}/>
   </Provider>
  </StrictMode>,
)
