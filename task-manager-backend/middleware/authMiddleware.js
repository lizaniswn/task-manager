// middleware/authMiddleware.js
const { CognitoJwtVerifier } = require("aws-jwt-verify");

const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-1_oIX9vyXeS",
  tokenUse: "access",
  clientId: "4s1k98e9mob06ok6g76uvqso8"
});

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const payload = await verifier.verify(token);
    req.user = payload.sub;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

module.exports = { protect };
