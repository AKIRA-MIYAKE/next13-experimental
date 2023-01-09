import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { v4 as uuidV4 } from 'uuid'

const app = express()

app.use(cors())
app.use(bodyParser.json())

export const sleep = (msec) =>
  new Promise((resolve) => setTimeout(resolve, msec))

const users = [
  {
    id: '2326c8ad-b255-416c-88f4-f2835e3e428a',
    email: 'alice@example.com',
    nickname: 'alice',
  },
]

let posts = [
  {
    id: '61f8f597-fb62-4b07-a67c-9434ae4b9ac1',
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed faucibus turpis in eu mi bibendum neque egestas congue. Tincidunt augue interdum velit euismod in pellentesque massa placerat. Semper quis lectus nulla at. Urna et pharetra pharetra massa massa ultricies. Vulputate odio ut enim blandit. Lobortis elementum nibh tellus molestie nunc. Commodo quis imperdiet massa tincidunt nunc. Turpis tincidunt id aliquet risus feugiat. Rhoncus mattis rhoncus urna neque viverra justo. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Ultricies tristique nulla aliquet enim tortor at auctor urna. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Vitae suscipit tellus mauris a diam.',
    createdAt: '2023-01-02T12:12:32.755Z',
    updatedAt: '2023-01-02T12:12:32.755Z',
  },
  {
    id: '4cfa00be-5770-4dc9-a558-6ea55b0d2429',
    title: 'Second post',
    body: 'In fermentum posuere urna nec tincidunt. Aliquet risus feugiat in ante metus dictum at tempor. Lorem sed risus ultricies tristique nulla. Nibh tellus molestie nunc non. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Pellentesque sit amet porttitor eget dolor morbi non. Sit amet porttitor eget dolor morbi non arcu. Varius duis at consectetur lorem donec massa. Porta nibh venenatis cras sed felis eget velit. Eget mi proin sed libero enim sed faucibus. Est sit amet facilisis magna etiam tempor.',
    createdAt: '2023-01-01T12:09:08.755Z',
    updatedAt: '2023-01-01T12:10:21.755Z',
  },
  {
    id: '57328578-c62e-403e-a896-698debe60772',
    title: 'This is a first post',
    body: 'Pharetra diam sit amet nisl suscipit. Et molestie ac feugiat sed. Nibh mauris cursus mattis molestie a. Pellentesque adipiscing commodo elit at. Imperdiet dui accumsan sit amet nulla facilisi morbi. Sed enim ut sem viverra aliquet eget sit. Porttitor massa id neque aliquam. Ut porttitor leo a diam sollicitudin tempor. Dolor sit amet consectetur adipiscing elit ut aliquam. Nullam non nisi est sit amet facilisis magna etiam. Habitant morbi tristique senectus et netus et. Pellentesque habitant morbi tristique senectus et netus et malesuada. Amet risus nullam eget felis eget.',
    createdAt: '2022-12-31T12:09:06.755Z',
    updatedAt: '2022-12-31T12:09:06.755Z',
  },
]

let sessions = []

const findUserbyRequestHeaders = (headers) => {
  const { authorization } = headers

  if (!authorization) {
    return undefined
  }

  const token = authorization.replace('Bearer ', '')
  const session = sessions.find((session) => session.token === token)

  if (!session) {
    return undefined
  }

  const user = users.find((user) => user.id === session.userId)

  return user
}

app.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  await sleep(500)

  if (password !== 'password') {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const user = users.find((user) => user.email === email)

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token = uuidV4()

  sessions = [
    ...sessions,
    {
      userId: user.id,
      token,
    },
  ]

  res.status(200).json({ user, token })
})

app.post('/signout', async (req, res) => {
  await sleep(500)

  const user = findUserbyRequestHeaders(req.headers)

  if (!user) {
    res.status(204).end()
    return
  }

  sessions = sessions.filter((session) => session.userId !== user.id)

  res.status(204).end()
})

app.get('/me', async (req, res) => {
  await sleep(500)

  const user = findUserbyRequestHeaders(req.headers)

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  res.status(200).json(user)
})

app.get('/posts', async (req, res) => {
  await sleep(500)

  res.status(200).json({ items: posts })
})

app.post('/posts', async (req, res) => {
  const user = findUserbyRequestHeaders(req.headers)

  if (!user) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  const { title, body } = req.body

  if (!title || !body) {
    res.status(400).json({ message: 'Bad Request' })
    return
  }

  await sleep(500)

  const nowString = new Date().toISOString()
  const post = {
    id: uuidV4(),
    title,
    body,
    createdAt: nowString,
    updatedAt: nowString,
    user: {
      id: user.id,
      nickname: user.nickname,
    },
  }

  posts = [post, ...posts]

  res.status(201).json(post)
})

app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId

  await sleep(500)

  const post = posts.find((post) => post.id === postId)

  if (!post) {
    res.status(404).json({ message: 'Not Found' })
    return
  }

  res.status(200).json(post)
})

app.patch('/posts/:postId', async (req, res) => {
  const user = findUserbyRequestHeaders(req.headers)

  if (!user) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  const postId = req.params.postId

  await sleep(500)

  const post = posts.find((post) => post.id === postId)

  if (!post) {
    res.status(404).json({ message: 'Not Found' })
    return
  }

  const { title, body } = req.body

  const updatedPost = {
    ...post,
    title: title ? title : post.title,
    body: body ? body : todo.body,
    updatedAt: new Date().toISOString(),
  }

  posts = [updatedPost, ...posts.filter((post) => post.id !== postId)]

  res.status(200).json(updatedPost)
})

app.delete('/posts/:postId', async (req, res) => {
  const user = findUserbyRequestHeaders(req.headers)

  if (!user) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  const postId = req.params.postId

  await sleep(500)

  const post = posts.find((post) => post.id === postId)

  if (!post) {
    res.status(404).json({ message: 'Not Found' })
    return
  }

  posts = posts.filter((post) => post.id !== postId)

  res.status(204).end()
})

app.listen(3001)
