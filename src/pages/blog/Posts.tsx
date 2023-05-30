// Importing helper modules
import { useEffect, useState } from "react"
import { type Article } from "utils/contentTypes"
import { generateUrl } from "utils/modules"
import { toast } from "react-toastify"
import api from "utils/axios.config"

// Importing core components
import { NavLink } from "react-router-dom"
import { Spinner } from "react-activity"
import Button from "components/ui/Button"
import Container from "components/ui/Container"
import Fade from "react-reveal/Fade"
import Header from "components/ui/Header"

const Posts = () => {
	const [data, setData] = useState<Article[]>()
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		api
			.get("/blog")
			.then((res) => setData(res.data as Article[]))
			.catch((error: any) => toast.error(error.message))
			.finally(setLoading.bind(null, false))
	}, [])

	return (
		<div>
			<Header title={`Blog Posts.(${data ? data.length : 0})`} />
			{loading ? (
				<div className="h-[600px] center">
					<Spinner color="#3d9e4d" size={20} speed={1} animating={true} />
				</div>
			) : (
				<div className="center">
					<Container>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
							{data?.map((item, i) => (
								<Fade right delay={i * 200} key={item.SK}>
									<div className="relative h-[480px] shadow-sm shadow-gray-700">
										<div className="absolute w-full h-1/2">
											<img
												src={generateUrl(item.image)}
												alt=""
												className="object-cover object-center w-full h-full"
											/>
										</div>
										<div className="absolute w-full h-1/2 bottom-0 p-4">
											<div className="flex items-center gap-6">
												<div className="flex items-center gap-2">
													<span className="material-symbols-outlined text-primary text-[22px]">
														calendar_today
													</span>
													<p className="text-sm font-light text-gray-300">
														{item.date}
													</p>
												</div>
												<div className="flex items-center gap-2">
													<span className="material-symbols-outlined text-primary text-[22px]">
														account_circle
													</span>
													<p className="text-sm font-light text-gray-300">
														{item.author}
													</p>
												</div>
											</div>
											<h3 className="text-base mt-4 font-medium text-gray-200">
												{item.title}
											</h3>
											<p className="text-gray-200 text-sm text-normal my-2">
												{item.description}
											</p>
											<NavLink to={`/${item.SK.replace("ARTICLE#", "")}`}>
												<Button title="Read Now" color="success" />
											</NavLink>
										</div>
									</div>
								</Fade>
							))}
						</div>
					</Container>
				</div>
			)}
		</div>
	)
}

export default Posts
