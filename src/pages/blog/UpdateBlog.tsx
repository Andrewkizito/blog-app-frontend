// Importing helper modules
import { Auth } from "aws-amplify"
import { generateUniqueValues, generateUrl, updateState } from "utils/modules"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { type Article } from "utils/contentTypes"
import api from "utils/axios.config"
import axios, { AxiosResponse } from "axios"

// Importing core components
import { toast } from "react-toastify"
import BackButton from "components/ui/BackButton"
import Button from "components/ui/Button"
import Fade from "react-reveal/Fade"
import ImageUploader from "components/modules/ImageUploader"
import TextInput from "components/modules/TextInput"
import RichTextEditor from "components/modules/RichTextEditor"

const UpdateBlog = () => {
	// Navigation
	const navigate = useNavigate()
	const { id } = useParams()

	// Component state
	const [originalPost, setPost] = useState<null | Article>(null)
	const [form, setForm] = useState<null | Article>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [imageProgress, setImageProgress] = useState<boolean>(false)
	const [oldImage, setOldImage] = useState<string>("")

	const initPost = useCallback(() => {
		if (!id) return navigate("/")

		toast
			.promise(api.get(`blog/${id}`), {
				pending: "Intializing post, please wait",
			})
			.then(async (res: AxiosResponse) => {
				const data = res.data as Article
				try {
					const result = await axios.get(generateUrl(data.content))
					const post: Article = { ...res.data, content: result.data }
					setPost(post)
					setForm(post)
				} catch (error: any) {
					toast.error(error.message)
				}
			})
			.catch((err) => toast.error(err.message))
	}, [id, navigate])

	useEffect(() => {
		initPost()
	}, [initPost])

	async function submit() {
		if (loading || imageProgress || !form || !originalPost) return

		const payload = {
			...generateUniqueValues(originalPost, form),
			PK: originalPost.PK,
			SK: originalPost.SK,
			content: originalPost.content,
			timestamp: originalPost.timestamp,
		}

		try {
			// Get Auth Token
			const token = await (await Auth.currentSession())
				.getIdToken()
				.getJwtToken()
			setLoading(true)
			toast
				.promise(
					api.patch(`blog/${id}`, payload, {
						headers: { Authorization: token },
					}),
					{
						pending: "Updating Blog, Please Wait...",
					}
				)
				.then((res) => {
					toast.success(res.data)
				})
				.catch((err) => toast.error(err.message))
		} catch (error: any) {
			toast.error(error.message)
		}
		setLoading(false)
	}

	return (
		<Fade>
			<div className="h-screen bg-gray-900 px-20">
				<div className="mt-4"></div>
				<BackButton to="/blog-manager" title="Edit Article Details" />
				<div className="border-t border-t-gray-700 mt-3"></div>
				<div className="sm:grid md:grid-cols-2 gap-6 py-2">
					<div className=" flex flex-col gap-5">
						<TextInput
							placeholder="Post title"
							label="Title"
							disabled={loading || imageProgress || !form}
							value={form ? form.title : ""}
							setValue={(val) => updateState("title", val, setForm)}
							maxLength={100}
						/>
						<TextInput
							disabled={loading || imageProgress || !form}
							placeholder="Name of author"
							label="Author"
							value={form ? form.author : ""}
							setValue={(val) => updateState("author", val, setForm)}
						/>
						<TextInput
							disabled={loading || imageProgress || !form}
							placeholder="A short summary"
							label="Summary"
							maxLength={148}
							value={form ? form.description : ""}
							setValue={(val) => updateState("description", val, setForm)}
						/>
					</div>
					<div className=" max-sm:my-4">
						<ImageUploader
							label="Cover Photo"
							value={form ? form.image : ""}
							loading={imageProgress}
							edit={{
								oldValue: oldImage,
								setOldValue: (value) => setOldImage(value),
							}}
							disabled={!form || imageProgress || loading}
							setLoading={(val) => setImageProgress(val)}
							setValue={(key) => updateState("image", key, setForm)}
						/>
					</div>
					{form && (
						<Fade>
							<div className="col-span-2 max-sm:my-4">
								<RichTextEditor
									label={"Article Details"}
									value={form.content}
									readOnly={loading || imageProgress || !form}
									setValue={(value) => updateState("content", value, setForm)}
								/>
							</div>
						</Fade>
					)}
					<div className="col-span-2 flex items-center justify-end gap-2">
						<Button
							title="Cancel"
							color="cancel"
							disabled={loading || !Boolean(form)}
							clicked={setForm.bind(this, null)}
						/>
						<Button
							title="Update Post"
							color="primary"
							disabled={loading || !Boolean(form)}
							clicked={submit}
						/>
					</div>
				</div>
			</div>
		</Fade>
	)
}

export default UpdateBlog
