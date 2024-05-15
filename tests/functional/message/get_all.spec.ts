import Message from '#models/message'
import testUtils from '@adonisjs/core/services/test_utils'

import { test } from '@japa/runner'

test.group('Message get all', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('get all messages from db', async ({ assert }) => {
    const initialCount = await Message.findManyBy('conversationId', null)

    await Message.createMany([
      {
        sender: 'sender1',
        message: 'message1',
        conversationId: null,
        chatBubbleColor: 'chat-color1',
      },
      {
        sender: 'sender2',
        message: 'message2',
        conversationId: null,
        chatBubbleColor: 'chat-color2',
      },
    ])

    const messages = await Message.findManyBy('conversationId', null)

    assert.isArray(messages)
    assert.lengthOf(messages, initialCount.length + 2)
    assert.strictEqual(messages.length, initialCount.length + 2)
  })
})
