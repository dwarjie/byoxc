/**
 * A hook to use for accessing localStorage
 * @param {string} key Key used to save and get the localStorage value
 * @returns {object} the hook functions saveItem, getItem, removeKey, and clearStorage
 */
export const useLocalStorage = (key: string) => {
	/**
	 * Save item to localStorage with the provided key
	 * @param {object} value Object to be saved
	 */
	const saveItem = (value: object) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	/**
	 * Get item from localStorage with the provided key
	 * @returns { object | false } Saved object or false
	 */
	const getItem = (): any | false => {
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
