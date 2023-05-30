// Importing helper modules
import { generateUrl, partitionData } from "utils/modules"
import { useEffect, useState } from "react"
import { type Article } from "utils/contentTypes"
import api from "utils/axios.config"

// Importing core components
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import { Spinner } from "react-activity"
import BackButton from "components/ui/BackButton"
import Button from "components/ui/Button"
import DeleteBlog from "./partials/DeleteBlog"
import Fade from "react-reveal/Fade"
import Pagination from "components/ui/Pagination"

const BlogManager = () => {
	const [page, setPage] = useState<number>(0)
	const [posts, setPosts] = useState<Article[][]>()
	const [deleteItem, setItem] = useState<null | Article>(null)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		api
			.get("/blog")
			.then((res) => setPosts(partitionData(res.data, 6)))
			.catch((error: any) => toast.error(error.message))
			.finally(setLoading.bind(null, false))
	}, [])

	return (
		<>
			{loading ? (
				<div className="h-[600px] center">
					<Spinner color="#3d9e4d" size={20} speed={1} animating={true} />
				</div>
			) : (
				posts && (
					<div className="h-screen bg-gray-900 px-20">
						<Fade>
							<div className="flex items-center justify-between pt-4">
								<BackButton to="/" title={`Blog Posts`} />
								<NavLink to="/create-blog">
									<Button color="primary" title="Add New" />
								</NavLink>
							</div>
							<div className="border-t border-t-gray-700 mt-3"></div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
								{posts[page].map((item, i) => (
									<Fade right delay={i * 200} key={item.SK}>
										<div className="relative h-[480px] shadow-sm shadow-gray-700">
											<div className="flex gap-2 mt-5 z-[1] absolute right-2 top-2">
												<NavLink
													to={`/edit/${item.SK.replace("ARTICLE#", "")}`}
												>
													<div className="w-10 h-10 rounded-full bg-white center cursor-pointer duration-300 group hover:bg-blue-500">
														<span className="material-symbols-outlined duration-300 text-blue-500 text-[22px] group-hover:text-white">
															edit_note
														</span>
													</div>
												</NavLink>
												<div
													className="w-10 h-10 rounded-full bg-white center cursor-pointer duration-300 group hover:bg-red-500"
													onClick={setItem.bind(null, item)}
												>
													<span className="material-symbols-outlined duration-300 text-red-500 text-[22px] group-hover:text-white">
														delete_forever
													</span>
												</div>
											</div>
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
												<p className="text-gray-200 text-sm text-normal mt-2">
													{item.description}
												</p>
											</div>
										</div>
									</Fade>
								))}
							</div>
							<Pagination
								count={posts.length}
								onChange={(value: number) => setPage(value - 1)}
							/>
						</Fade>
						<DeleteBlog
							item={deleteItem}
							refetch={() => {}}
							setItem={() => setItem(null)}
						/>
					</div>
				)
			)}
		</>
	)
}

export default BlogManager
