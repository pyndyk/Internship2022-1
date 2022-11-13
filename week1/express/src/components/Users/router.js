const { Router } = require('express');
const DemoComponent = require('./index');

console.log(' M 1 4 ');
const router = Router();

router.get('/', DemoComponent.findAll);

router.post('/', DemoComponent.create);
router.put('/', DemoComponent.putUser);
router.delete('/', DemoComponent.deleteUser);

module.exports = router;