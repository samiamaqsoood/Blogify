const { validateToken } = require("../services/authentication");
// middleware to check token at each request
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
       return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}

     return next();
  };
}

module.exports = {
    checkForAuthenticationCookie,
}
