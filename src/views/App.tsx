import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Coin from './Coin/Coin'
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
            <Route exact path="/coin" component={Coin} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
export default App
