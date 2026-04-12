
const health = require("./health/health");
const user = require("./user/user");

module.exports= (app) => {
    app.configure(health);
    app.configure(user);

  };