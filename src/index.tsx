// Importing helper modules
import { BrowserRouter } from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"

// Importing app root
import App from "./App"

// Importing amplify config and lib
import { Amplify } from "aws-amplify"
import { Authenticator } from "@aws-amplify/ui-react"
import config from "./aws-exports"

// Importing styles
import "./index.css"
import "react-activity/dist/library.css"
import "react-toastify/dist/ReactToastify.css"

// Configuring aws amplify
Amplify.configure(config)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<React.StrictMode>
		<Authenticator.Provider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Authenticator.Provider>
	</React.StrictMode>
)

reportWebVitals()
