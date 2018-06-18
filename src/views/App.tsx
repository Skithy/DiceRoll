import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Coin from './Coin/Coin'
import DnD from './DnD/DnD'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import SimpleDice from './SimpleDice/SimpleDice'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
          <div style={{ marginTop: '6em' }}>
            <Route exact path="/" component={SimpleDice} />
            <Route path="/coin" component={Coin} />
            <Route path="/dnd" component={DnD} />
          </div>
          <Footer />
        </>
      </BrowserRouter>
    )
  }
}
export default App
