const knex = require('knex');

const environment = process.env.DB_ENV || 'development';
const knexConfig = require('../knexfile.js')[environment];
const db = knex(knexConfig);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
