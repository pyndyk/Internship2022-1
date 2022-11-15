/* eslint-disable eol-last */
const { Router } = require('express');
const myComponent = require('./index');

const router = Router();

router.get('/', myComponent.findAll);

router.post('/', myComponent.create);
router.put('/', myComponent.putUser);
router.delete('/', myComponent.deleteUser);

module.exports = router;