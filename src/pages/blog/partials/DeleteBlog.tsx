// Importing helper modules
import { Auth } from "aws-amplify"
import { extractUrls, generateUrl } from "utils/modules"
import { useState } from "react"
import { type Article } from "utils/contentTypes"
import axios from "axios"
import api from "utils/axios.config"

// Importing core components
import { Spinner } from "react-activity"
import { toast } from "react-toastify"
import Button from "components/ui/Button"
import Modal from "components/ui/Modal"

interface Props {
	item: null | Article
	setItem: () => void
	refetch: () => void
}

const DeleteBlog: React.FC<Props> = (props) => {
	// Ui state
	const [loading, setLoading] = useState<boolean>(false)

	// Signout function
	async function submit() {
		if (!props.item) return

		setLoading(true)
		try {
			const content = await axios.get(`${generateUrl(props.item.content)}`)
			const urls = [...extractUrls(content.data), props.item.image]

			const token = (await Auth.currentSession()).getIdToken().getJwtToken()
			const res = await api.delete("/blog", {
				data: {
					PK: props.item.PK,
					SK: props.item.SK,
					files: urls,
				},
				headers: {
					Authorization: token,
				},
			})
			toast.success(res.data)
			props.refetch()
			props.setItem()
		} catch (error: any) {
			toast.error(error.message)
		}
		setLoading(false)
	}

	return (
		<Modal
			open={Boolean(props.item)}
			setOpen={props.setItem}
			title="Delete Post?"
			disabled={loading}
			content={
				<>
					{loading ? (
						<div className="center py-5 flex-col gap-3">
							<Spinner color="#727981" size={8} speed={1} animating={true} />
							<p className={`text-sm text-gray-300`}>
								Deleting Post, Please Wait...
							</p>
						</div>
					) : (
						<>
							<div className="mt-2">
								<p className={`text-sm text-gray-300`}>
									Post will be deleted from both website and database. Action is
									not reversible.
								</p>
							</div>
							<div className="mt-4 flex gap-2">
								<Button title="Continue" color="success" clicked={submit} />
								<Button title="Cancel" color="cancel" clicked={props.setItem} />
							</div>
						</>
					)}
				</>
			}
		/>
	)
}

export default DeleteBlog
