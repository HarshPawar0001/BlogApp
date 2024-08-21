const { serialize } = require("cookie");

const cookieSetter = (res, token, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 7 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

module.exports = cookieSetter;
