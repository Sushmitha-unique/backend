const port = 3030;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("use your own database storeage value", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.get("/", (req, res) => {
    res.send("Express is running");
});



app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});
const  productroute = require('./routes/product.js')
app.use('/addproduct',productroute)

const  removeroute = require('./routes/remove.js')
app.use('/removeproduct',removeroute)

const  allproductroute = require('./routes/allproduct.js')
app.use('/allproducts', allproductroute)

const  signuproute = require('./routes/signup.js')
app.use('/signup', signuproute)

const  loginroute = require('./routes/login.js')
app.use('/login', loginroute)

const  newcollectionroute = require('./routes/newcollection.js')
app.use('/newcollection', newcollectionroute)

const  popularroute = require('./routes/popularinwomen.js')
app.use('/popularinwomen', popularroute)

const  addtocartroute = require('./routes/addtocart.js')
app.use('/addtocart', addtocartroute )

const  removefromcartroute = require('./routes/removefromcart.js')
app.use('/removefromcart', removefromcartroute )

const  getcartroute = require('./routes/getcart.js')
app.use('/getcart', getcartroute)

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
