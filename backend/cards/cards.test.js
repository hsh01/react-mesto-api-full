const request = require('supertest');
const assert = require('assert');

const { app } = require('../app');

const DEFAULT_USER_ID = '6321aa54cff2102550e64264';

it('get user', (done) => {
  request(app)
    .get(`/users/${DEFAULT_USER_ID}`)
    .expect((response) => {
      assert.deepEqual(response.body, {
        _id: DEFAULT_USER_ID,
        about: 'test about',
        avatar: '#test',
        name: 'test',
      });
    })
    .end(done);
});

it('set profile info', (done) => {
  request(app)
    .patch('/users/me')
    .send({ name: 'test', about: 'test about' })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect((response) => {
      assert.deepEqual(response.body, {
        _id: DEFAULT_USER_ID,
        name: 'test',
        about: 'test about',
        avatar: '#test',
      });
    })
    .end(done);
});

it('set avatar info', (done) => {
  request(app)
    .patch('/users/me/avatar')
    .send({ avatar: '#test' })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect((response) => {
      assert.deepEqual(response.body, {
        _id: DEFAULT_USER_ID,
        name: 'test',
        about: 'test about',
        avatar: '#test',
      });
    })
    .end(done);
});

it('empty cards', (done) => {
  request(app)
    .get('/cards')
    .expect((response) => {
      assert.deepEqual(response.body, []);
    })
    .end(done);
});

it('create card should return ValidationError with status 400', (done) => {
  request(app)
    .post('/cards')
    .send({ name: 'test' })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(400)
    .expect('{"message":"ValidationError: card validation failed: link: Path `link` is required."}')
    .end(done);
});

let createdCardId = null;
it('create card', (done) => {
  request(app)
    .post('/cards')
    .send({ name: 'test', link: '#test' })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect((response) => {
      createdCardId = response.body._id;
      assert.deepEqual(response.body.owner, DEFAULT_USER_ID);
    })
    .end(done);
});

it('like card', (done) => {
  request(app)
    .put(`/cards/${createdCardId}/likes`)
    .expect((response) => {
      assert.deepEqual(response.body.likes, [DEFAULT_USER_ID]);
    })
    .end(done);
});

it('dislike card', (done) => {
  request(app)
    .delete(`/cards/${createdCardId}/likes`)
    .expect((response) => {
      assert.deepEqual(response.body.likes, []);
    })
    .end(done);
});

it('delete card', (done) => {
  request(app)
    .delete(`/cards/${createdCardId}`)
    .expect(200)
    .end(done);
});

it('like card should return NotFound with status 404', (done) => {
  request(app)
    .put(`/cards/${createdCardId}/likes`)
    .expect(404)
    .expect('{"message":"Запрашиваемая карточка не найдена"}')
    .end(done);
});

it('dislike card should return NotFound with status 404', (done) => {
  request(app)
    .delete(`/cards/${createdCardId}/likes`)
    .expect(404)
    .expect('{"message":"Запрашиваемая карточка не найдена"}')
    .end(done);
});
