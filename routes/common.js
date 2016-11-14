const router = require('express').Router()

router.route('/ping')
    .get((request, response) => {
        response.json('pong')
    })

module.exports = router
