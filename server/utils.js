import multer from "multer";

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname + "-" + datetimestamp + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

export const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function(req, file, callback) {
    //file filter
    console.log(req, file)
    if (["xls", "xlsx"].indexOf(file.originalname.split(".")[file.originalname.split(".").length - 1]) === -1) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
}).array("files", 10);
