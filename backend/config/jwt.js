const jwt = require("jsonwebtoken");

function signJwt(user_id, role) {
	const token = jwt.sign({ sub: user_id }, "avp");
	if (!token) return false;
	return token;
}

function verifyJwt(req, res, next) {
	const authorization = req.header("authorization");
	const token = authorization ? authorization.split("Bearer ")[1] : undefined;
	if (!token) {
		return res.send(401, "Unauthorized");
	}
	jwt.verify(token, "avp", (err, payload) => {
		if (err || !payload.sub) {
			return res.send(401, "Unauthorized");
		}
		req.user = payload;
		return next();
	});
}

module.exports = { signJwt, verifyJwt };
