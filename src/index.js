import React from "react"
import ReactDOM from "react-dom"
import { Provider } from  "react-redux"

import Layout from "./js/components/Layout.js"
import store from "./js/store.js"

const app = document.getElementById("main-div")

ReactDOM.render(
	<Provider store={store}>
	<Layout />
	</Provider>
	, app);