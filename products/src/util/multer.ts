import multer from "multer";
import { resolve } from "path";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve(__dirname, "../images"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now().toString() + ".jpg"); //Appending .jpg
    },
  });
  
 export var upload = multer({ storage: storage });