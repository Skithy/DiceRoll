import React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './scripts/registerServiceWorker'
import App from './views/App'

import './index.css'

render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
