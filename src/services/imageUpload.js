const multer = require('multer');
  const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "../public/uploads");
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });  
  
  const upload = multer({
    storage: fileStorage,
    limits: { fileSize: 5000000 },
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  });
  app.post("/profile-image", upload.single("profile"), (req, res, err) => {
    try {
      res.send(req.file);
    } catch (err) {
      res.send(400);
    }
  });
  
  const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  };