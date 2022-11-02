const jwt = require("jsonwebtoken")


const authentication = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]
        if (!token) {
           return res.status(401).send({ status: false, msg: "you are unauthorized" })
        }

        let decodeToken = jwt.verify(token, "mysecretkey")

        if (!decodeToken) {
           return res.status(404).send({ status: false, msg: "Invalid token" })
        }
        req.userId = decodeToken.userId

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.authentication = authentication;
