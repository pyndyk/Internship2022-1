/* eslint-disable consistent-return */
const { Router } = require('express');

const myComponent = require('./index');

const middelware = require('./middleware');

const router = Router();

router.get('/user', myComponent.findUser);

router.post('/addUser', middelware.validationReqBody, myComponent.create);
router.put('/putUser', middelware.validationReqBodyAndQuery, myComponent.putUser);
router.delete('/deleteUser', middelware.validationQuery, myComponent.deleteUser);

module.exports = router;