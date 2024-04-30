import { StatusCodes } from 'http-status-codes'

let posts = [
    {
      id: 1,
      userID: 1,
      title: "Заголовок поста 1",
      body: "Содержание поста 1"
    },
    {
      id: 2,
      userID: 2,
      title: "Заголовок поста 2",
      body: "Содержание поста 2"
    },
    {
      id: 3,
      userID: 3,
      title: "Заголовок поста 3",
      body: "Содержание поста 3"
    },
    {
      id: 4,
      userID: 1,
      title: "Заголовок поста 4",
      body: "Содержание поста 4"
    },
    {
      id: 5,
      userID: 2,
      title: "Заголовок поста 5",
      body: "Содержание поста 5"
    },
    {
      id: 6,
      userID: 3,
      title: "Заголовок поста 6",
      body: "Содержание поста 6"
    },
    {
      id: 7,
      userID: 1,
      title: "Заголовок поста 7",
      body: "Содержание поста 7"
    },
    {
      id: 8,
      userID: 2,
      title: "Заголовок поста 8",
      body: "Содержание поста 8"
    },
    {
      id: 9,
      userID: 3,
      title: "Заголовок поста 9",
      body: "Содержание поста 9"
    },
    {
      id: 10,
      userID: 4,
      title: "Заголовок поста 10",
      body: "Содержание поста 10"
    }
  ]


const getPosts = () => posts

const addPost = (req, res, next) => {
	let post = req.body
	posts.push(post)
  next()
}

function deletePost (req, res, next) {
  posts = posts.filter((post) => post.id !== Number(req.params.id))
  next()
}


function updatePost (req, res, next) {
  let {id} = req.params
  let {title, body, userID} = req.body
  posts = posts.map((post) => {
    if(post.id === Number(id)) {
      post.userID = userID
      post.title = title
      post.body = body
    }
    return post
  })
  next()
}


export {posts, getPosts, addPost, deletePost, updatePost}
