/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthenticationController = () => import('#controllers/authentication_controller')
const UsersController = () => import('#controllers/users_controller')
const MessagesController = () => import('#controllers/messages_controller')
const DiscussionsController = () => import('#controllers/discussions_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//Auth Routes
router.post('/api/chat/auth/register', [AuthenticationController, 'register'])
router.post('/api/chat/auth/login', [AuthenticationController, 'login'])

//Users Routes
router.get('/api/chat/users/getAll', [UsersController, 'getAll']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/api/chat/users/getId/:id', [UsersController, 'getUserById']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/api/chat/users/getUsername/:username', [UsersController, 'getUserByUsername']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/api/chat/users/setChatBubbleCustom', [UsersController, 'getUserByUsername']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router
  .post('/api/chat/users/changeChatBubbleCustom', [UsersController, 'changeChatBubbleColor'])
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router.get('/api/chat/users/getChatBubbleCustom/:id', [UsersController, 'getChatBubbleColor']).use(
  middleware.auth({
    guards: ['api'],
  })
)

//Messages Routes
router.post('/api/chat/message/store', [MessagesController, 'store']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/api/chat/message/general/getAll', [MessagesController, 'getAllFromGeneral']).use(
  middleware.auth({
    guards: ['api'],
  })
)

//Discussion Routes
router.post('api/chat/discussion/create', [DiscussionsController, 'create']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router
  .get('api/chat/discussion/user/:id/getAll', [DiscussionsController, 'getAllUserInDiscussions'])
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
