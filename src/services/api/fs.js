const API_KEY = 'c1XoqAbCpRvtT5SMk2Dy'

const myHeaders = new Headers();
myHeaders.append("Token", API_KEY);

const requestOptions = {
	headers: myHeaders,
	redirect: 'follow'
};

const API_URL = process.env.REACT_APP_API_URL
export default async function fs(formData) {
	requestOptions.body = formData
	requestOptions.method = 'POST'
	const response = await fetch(API_URL, requestOptions)
	const data     = await response.json()
	return data
}
export async function fs_put(urlencoded, id) {
	requestOptions.body = urlencoded
	requestOptions.headers.append("Content-Type", "application/x-www-form-urlencoded")
	requestOptions.method = 'PUT'
	const response = await fetch(`${API_URL}/${id}`, requestOptions)
	const data     = await response.json()
	return data
}
export async function fs_get({dateStart, dateEnd}) {
	delete requestOptions['body']
	requestOptions.headers.append("Content-Type", "application/x-www-form-urlencoded")
	requestOptions.method = 'GET'
	const response = await fetch(`${API_URL}/?limit=200000&filter[fechacreacion_gte]=${dateStart}&filter[fechacreacion_lte]=${dateEnd}`, requestOptions)
	const data     = await response.json()
	return data
}