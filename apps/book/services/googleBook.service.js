import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js'

export const googleBookService = {
    query,
  }

function query(searchTerm) {
  if (searchTerm) {
    const apiUrl = `
    https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)
  }`

    return axios
      .get(apiUrl)
      .then((res) => {
        return res.data.items.map((item) => item.volumeInfo)
      })
      .catch((error) => {
        console.error('Error fetching books:', error)
        return []
      })
  } else {
    return Promise.resolve([])
  }
}
