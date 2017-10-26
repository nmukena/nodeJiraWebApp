import React from "react"
import ReactDOM from "react-dom"
import { Provider } from  "react-redux"

import Layout from "./js/layout.js"
import store from "./js/store.js"

const app = document.body

ReactDOM.render(<Provider store={store}>< Layout /></Provider>, app);