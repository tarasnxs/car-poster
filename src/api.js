import axios from 'axios'

const SERVER_URL = 'http://192.168.0.99:3000'

const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000
});

export default {
    getPostInfo: (auction, lotId) => instance.get('post_info', {params: {auction: auction, lotId: lotId}}),
    getImages: (auction, lotId) => instance.get('car_image', {params: {auction: auction, lotId: lotId}}),
    getAccounts: () => instance.get('accounts'),
    savePost: (postInfo) => instance.post('posts', postInfo),
    saveCar: (postInfo) => instance.post('cars', postInfo),
    getSavedPosts: (pageNumber) => instance.get('savedPosts', {params: {"_page" : pageNumber, "_sort" : "postDate", "_order" : "desc"}}),
    getAllPostInfo: () => instance.get('post_info'),
    addSavedPost: (savedPost) => instance.post('savedPosts', savedPost),
    deleteSavedPost: (id) => instance.delete('savedPosts/' + id)
}