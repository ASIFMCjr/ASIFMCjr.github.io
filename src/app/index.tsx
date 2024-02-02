import React from 'react'
import { Routing } from 'pages'
import { Header } from 'widgets/header'
import { Footer } from 'widgets/footer'
import './index.sass'
import { Provider } from 'react-redux'
import { store } from 'app/store'

function App() {
  return (
    <Provider store={store}>
      <Header/>
      <Routing/>
      <Footer/>
    </Provider>
  )
}

export default App
