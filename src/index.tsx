import '@mdi/font/css/materialdesignicons.min.css'
import React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import registerServiceWorker from './scripts/registerServiceWorker'
import App from './views/App'

import './index.css'

render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
