import { StatusCodes } from 'http-status-codes'

let posts = [
  {
    id: 1,
		author: "Author 1",
    title: "Заголовок поста 1",
    body: "Содержание поста 1"
  },
  {
    id: 2,
		author: "Author 2",
    title: "Заголовок поста 2",
    body: "Содержание поста 2"
  },
  {
    id: 3,
		author: "Author 3",
    title: "Заголовок поста 3",
    body: "Содержание поста 3"
  },
  {
    id: 4,
		author: "Author 1",
    title: "Заголовок поста 4",
    body: "Содержание поста 4"
  },
  {
    id: 5,
		author: "Author 2",
    title: "Заголовок поста 5",
    body: "Содержание поста 5"
  },
  {
    id: 6,
		author: "Author 3",
    title: "Заголовок поста 6",
    body: "Содержание поста 6"
  },
  {
    id: 7,
		author: "Author 1",
    title: "Заголовок поста 7",
    body: "Содержание поста 7"
  },
  {
    id: 8,
		author: "Author 2",
    title: "Заголовок поста 8",
    body: "Содержание поста 8"
  },
  {
    id: 9,
		author: "Author 3",
    title: "Заголовок поста 9",
    body: "Содержание поста 9"
  },
  {
    id: 10,
		author: "Author 4",
    title: "Заголовок поста 10",
    body: "Содержание поста 10"
  }
]


function getPosts(req, res) {
  res.status(StatusCodes.OK).json(posts)
}

function addPost(req, res) {
	let post = req.body
	posts.push(post)
	res.status(StatusCodes.CREATED).json(posts)

}

function deletePost (req, res) {
  let newPosts = posts.filter((post) => post.id !== Number(req.params.id))
  posts = newPosts
  res.status(StatusCodes.OK).json(posts)
}

function updatePost (req, res) {
  let {id} = req.params
  let {title, body, author} = req.body
  posts = posts.map((post) => {
    if(post.id === Number(id)) {
      post.author = author
      post.title = title
      post.body = body
    }
    return post
  })
  res.status(StatusCodes.OK).json(posts)
}


export {posts, getPosts, addPost, deletePost, updatePost}
