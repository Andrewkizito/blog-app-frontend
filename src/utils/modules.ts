import getUrls from 'get-urls'

export const storageUrl =
	'https://blog-app-files81955-staging.s3.eu-central-1.amazonaws.com'

export function generateUrl(key: string): string {
	return `${storageUrl}${key.startsWith('/') ? key : `/${key}`}`
}

type FieldType =
	| 'title'
	| 'description'
	| 'subTitle'
	| 'content'
	| 'tag'
	| 'path'
	| 'image'
	| 'icon'
	| 'author'
	| 'pageTitle'
	| 'keywords'
	| 'SK'
	| 'mission'
	| 'vision'
	| 'years_active'
	| 'women_empowered'
	| 'partners'
	| 'file'

export const updateState = (field: FieldType, value: string, setValue: any) => {
	setValue((prevState: any) => ({
		...prevState,
		[field]: value,
	}))
}

export const generateName = (name: string): string => {
	const parts = name.split('.')
	const extention = parts.reverse()[0]
	return `blog-app-${parts[0]}-${(Math.random() * 1000).toFixed(
		0
	)}.${extention}`
}

export function partitionData(data: any[], count: number): any[][] {
	if (data.length === 0) {
		return []
	}
	const copy = [...data]
	const result = []
	while (copy.length) {
		result.push(copy.splice(0, count))
	}
	return result
}

export const generateUniqueValues = (
	originalData: { [index: string]: string | number },
	modifiedData: { [index: string]: string | number }
): Record<string, string | number> => {
	const uniqueValues: Record<string, string | number> = {}

	for (const [key, value] of Object.entries(modifiedData)) {
		if (!(key in originalData) || originalData[key] !== value) {
			uniqueValues[key] = value
		}
	}

	return uniqueValues
}

export const generateNumbers = (max: number): number[] => {
	const nums: number[] = []
	let num = 5
	for (let i = 1; i <= max; i++) {
		nums.push(i)
	}
	return nums
}

export function extractUrls(text: string): string[] {
	const urls = getUrls(text)
	const result: string[] = Array.from(urls).map((item) =>
		item.replace(`${storageUrl}/`, '')
	)

	return result
}