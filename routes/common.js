const security = require('../controllers/security')
const router = require('express').Router()

router.route('/ping')
    .get((request, response) => {
        response.json('pong')
    })

router.route('/login')
      .post(security.login)

module.exports = router
