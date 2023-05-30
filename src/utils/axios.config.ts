// Importing helper modules
import axios from "axios"

const api = axios.create({
	baseURL: " https://dwlo8cu8de.execute-api.eu-central-1.amazonaws.com/prod/",
})

export default api
