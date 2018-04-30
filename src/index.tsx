import React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './scripts/registerServiceWorker'
import App from './views/App'

import '@mdi/font/css/materialdesignicons.min.css'
import './semantic/dist/semantic.min.css'
// tslint:disable-next-line:ordered-imports
import './index.css'

render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
