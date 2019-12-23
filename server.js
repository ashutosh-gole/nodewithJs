require('dotenv').config();

let app = require('./src/config/middlewares/base');
const port = parseInt(process.env.PORT, 10) || 5000;
app.set("port", port);

// Db Connection
require('./src/app/dataAccess/dbHelper');

app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});
