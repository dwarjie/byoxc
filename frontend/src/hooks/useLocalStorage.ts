export const useLocalStorage = (key: string) => {
	const saveItem = (value: object) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	const getItem = (): object | false => {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : false;
	};

	const removeKey = (): void => {
		const item = localStorage.getItem(key);

		if (item) localStorage.removeItem(key);
	};

	const clearStorage = (): void => {
		return localStorage.clear();
	};

	return { saveItem, getItem, removeKey, clearStorage };
};
