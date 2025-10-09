const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('express-flash');
const dotenv = require('dotenv');
const db = require('./config/database');
const systemConfig = require('./config/system');

// Khởi tạo app
const app = express();

// Cấu hình dotenv
dotenv.config();

// Cấu hình view engine (Pug)
app.set('views', './views');
app.set('view engine', 'pug');

// Kết nối database
db.connect();

// Middleware tĩnh cho file public
app.use(express.static('public'));

// ------------------- MIDDLEWARE CƠ BẢN ------------------- //

// Cookie & session
app.use(cookieParser("Flash-NodeJs"));
app.use(session({
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true
}));

// Flash message (phải sau session)
app.use(flash());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Method override (phải trước khi gọi route)
app.use(methodOverride("_method"));

// -------------------------------------------------------- //

// Biến toàn cục cho Pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// ------------------- ROUTES ------------------- //
const routeClient = require('./routes/client/index-routes');
const routeAdmin = require('./routes/admin/index-route');

// Mount routes
routeAdmin(app);
routeClient(app);
// -------------------------------------------------------- //

// Lắng nghe cổng
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
