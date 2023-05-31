// Importing helper modules
import { generateUrl, storageUrl } from "utils/modules"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { type Article } from "utils/contentTypes"
import axios from "axios"
import api from "utils/axios.config"

// Importing core components
import { toast } from "react-toastify"
import { Spinner } from "react-activity"
import BackButton from "components/ui/BackButton"
import Container from "components/ui/Container"
import Fade from "react-reveal/Fade"

// Importing styles
import "./styles.css"

const PostDetails = () => {
	// Getting params
	const { id } = useParams()

	// Component state
	const [data, setData] = useState<Article>()
	const [loading, setLoading] = useState<boolean>(false)

	const fetchPost = useCallback(async () => {
		if (id) {
			setLoading(true)
			try {
				const res = await api.get(`/blog/${id}`)
				const article = res.data as Article
				const content = await axios.get(`${storageUrl}/${article.content}`)
				article.content = content.data
				setData(article)
			} catch (error: any) {
				toast.error(error.message)
			}
			setLoading(false)
		}
	}, [id])

	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	return (
		<div>
			{loading ? (
				<div className="h-screen center">
					<Spinner color="#3d9e4d" size={20} speed={1} animating={true} />
				</div>
			) : (
				data && (
					<Fade>
						<div className="center py-5">
							<Container>
								<BackButton title={data.title} to="/" />
								<div className="border-t border-t-gray-700 mt-3"></div>
								<div className="flex items-center gap-6 py-5">
									<div className="flex items-center gap-2">
										<span className="material-symbols-outlined text-primary text-[22px]">
											calendar_today
										</span>
										<p className="text-sm font-light text-gray-300">
											{data.date}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<span className="material-symbols-outlined text-primary text-[22px]">
											account_circle
										</span>
										<p className="text-sm font-light text-gray-300">
											{data.author}
										</p>
									</div>
								</div>
								<img
									src={generateUrl(data.image)}
									className="max-w-full object-center object-cover mb-5"
									alt=""
								/>
								<div
									className="details"
									dangerouslySetInnerHTML={{ __html: data.content }}
								/>
							</Container>
						</div>
					</Fade>
				)
			)}
		</div>
	)
}

export default PostDetails
