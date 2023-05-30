export interface Article {
	readonly [key: string]: string
	PK: string
	SK: string
	title: string
	description: string
	content: string
	author: string
	date: string
	image: string
}
