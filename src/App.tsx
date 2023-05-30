// Importing helper modules
import { Auth, Hub } from "aws-amplify"
import { createContext, useEffect, useMemo, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import appRoutes from "utils/routes"

interface CurrentUserContextProps {
	user: any
	setUser: (val: any) => void
}

export const CurrentUserContext = createContext<CurrentUserContextProps>({
	user: null,
	setUser: () => console.log("init"),
})

function App() {
	// Current User
	const [user, setUser] = useState(null)

	// Authentication Status
	const [authStatus, setAuthStatus] = useState<boolean>(false)

	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then(() => setAuthStatus(true))
			.catch(() => setAuthStatus(false))

		Hub.listen("auth", ({ payload: { event, data } }) => {
			switch (event) {
				case "signIn":
					setAuthStatus(true)
					console.log(event, data)
					break
				case "signOut":
					setAuthStatus(false)
					break
				case "signIn_failure":
					console.error("Sign in failure", data)
					break
				default:
					break
			}
		})
	}, [])

	// Generating routes programmatically
	const routes = useMemo(() => {
		if (authStatus) {
			return appRoutes.filter((item) => item.authRequired || item.path === "/" || item.path === "/:id")
		}

		return appRoutes.filter((item) => !item.authRequired || item.path === "/" || item.path === "/:id")
	}, [authStatus])

	return (
		<CurrentUserContext.Provider
			value={{
				user: user,
				setUser(val) {
					setUser(val)
				},
			}}
		>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<Routes>
				{routes.map((item, i) => {
					if (item.nested)
						return (
							<Route key={i} path={item.path} element={item.component}>
								{item.nested.map((item, i: number) => (
									<Route path={item.path} key={i} element={item.component} />
								))}
							</Route>
						)
					return <Route key={i} path={item.path} element={item.component} />
				})}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</CurrentUserContext.Provider>
	)
}

export default App
