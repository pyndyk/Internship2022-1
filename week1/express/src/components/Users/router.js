const { Router } = require('express');
const myComponent = require('./index');
const middleware = require('./middleware');

const router = Router();

router.get('/user', myComponent.findUser);
router.post('/addUser', middleware.validationReqBody, myComponent.create);
router.put('/putUser', middleware.validationReqBodyAndQuery, myComponent.putUser);
router.delete('/deleteUser', middleware.validationQuery, myComponent.deleteUser);

module.exports = router;