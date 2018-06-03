export const set = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value))
export const get = (key: string) => {
	try {
		const json = localStorage.getItem(key)
		return json !== null ? JSON.parse(json) : null
	} catch {
		return null
	}
}
