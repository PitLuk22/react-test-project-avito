export default class ImgService {
	constructor() {
		this.base_url_images = 'https://boiling-refuge-66454.herokuapp.com'
		this.base_url_comments = 'http://localhost:3000/comments'
	}

	async getResourses(path) {
		const res = await fetch(`${path}`)

		if (!res.ok) {
			throw new Error(`Could not fetch data: ${res.status}`)
		}
		return await res.json()
	}

	getAllImages = async () => {
		return this.getResourses(`${this.base_url_images}/images`)
	}
	getImage = async (id) => {
		return this.getResourses(`${this.base_url_images}/images/${id}`)
	}
	getComments = async () => {
		return this.getResourses(`${this.base_url_comments}`)
	}
	postComments = async (data, id) => {

		const addZero = (num) => num < 10 ? `0${num}` : num;

		const date = {
			year: new Date().getFullYear(),
			month: addZero(new Date().getMonth() + 1),
			day: addZero(new Date().getDate())
		}

		const newData = {
			imgID: id,
			date: `${date.day}.${date.month}.${date.year}`,
			name: data.name,
			comment: data.comment
		}
		const res = await fetch(`${this.base_url_comments}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newData)
		})

		if (!res.ok) {
			throw Error('Something went wrong!');
		}
	}

}
