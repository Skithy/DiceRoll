import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header/Header'
import SimpleDice from './SimpleDice/SimpleDice'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div style={{ marginTop: '6em' }}>
            <Route exact path="/" component={SimpleDice} />
            <Route exact path="/dice" component={SimpleDice} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
export default App
