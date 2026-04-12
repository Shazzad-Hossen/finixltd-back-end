require('dotenv').config();
const settings = require("../settings");
const App = require("./app");
const { createDefaultUser } = require('./controllers/default-user');
const { connectDB } = require("./controllers/mongodb");




const deps=[
    {
        method: connectDB,
        args:[settings]
    }
];

(async()=>{

    const app = new App({deps});
    await app.start();
    await createDefaultUser();




})();