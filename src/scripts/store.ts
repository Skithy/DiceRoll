export const set = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value))
export const get = (key: string) => {
	const json = localStorage.getItem(key)
	return json !== null ? JSON.parse(json) : null
}
