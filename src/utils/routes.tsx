// Importing helper mdoules
import AuthRoot from "pages/auth/AuthRoot"
import ConfirmAccount from "pages/auth/ConfirmAccount"
import ConfirmSignUp from "pages/auth/ConfirmSignUp"
import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
import ResetPassword from "pages/auth/ResetPassword"
import CreateBlog from "pages/blog/CreateBlog"
import PostDetails from "pages/blog/PostDetails"
import Posts from "pages/blog/Posts"
import { type ReactElement } from "react"

interface AppRoute {
	title: string
	path: string
	component: ReactElement
	authRequired?: boolean
	nested?: { path: string; component: ReactElement }[]
}

const appRoutes: AppRoute[] = [
	{
		title: "Blog Posts",
		path: "/",
		component: <Posts />,
		authRequired: false,
	},
	{
		title: "Blog Post",
		path: "/:id",
		component: <PostDetails />,
		authRequired: false,
	},
	{
		title: "Create Blog",
		path: "/create-blog",
		component: <CreateBlog />,
		authRequired: true,
	},
	{
		title: "Auth",
		path: "/auth",
		component: <AuthRoot />,
		authRequired: false,
		nested: [
			{
				path: "",
				component: <Login />,
			},
			{
				path: "register",
				component: <Register />,
			},
			{
				path: "verify",
				component: <ConfirmSignUp />,
			},
			{
				path: "forgot-password",
				component: <ResetPassword />,
			},
			{
				path: "confirm-account",
				component: <ConfirmAccount />,
			},
		],
	},
]

export default appRoutes
