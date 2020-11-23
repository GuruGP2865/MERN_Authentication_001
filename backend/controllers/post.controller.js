const Post = require("../models/post.model");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single("file");

exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ succes: false, err });
    }

    console.log(res.req.file.path);

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.fileName,
    });
  });
};

exports.createPost = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ succes: false, err });
    }

    const post = new Post(req.body);
    //console.log(res.req.file.path);
    post.image = res.req.file.path;

    if ("date" in req.body) {
      let date = new Date(req.body.date);
      let value = ["-" + date.getDate(), 
                (date.getMonth() + 1).toString().padStart(2, '0'), 
                date.getFullYear().toString()].join('-');
      post.date = value;
    } 

    post.save((err, post) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Post is not created",
        });
      }
      res.json({
        post,
        url: res.req.file.path,
        fileName: res.req.file.fileName,
      });
    });

    //fileName: res.req.file.fileName,
  });
};

exports.getPostById = (req, res, next, id) => {
  Post.findById(id).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: "No Post is found",
      });
    }
    req.post = post;
    next();
  });
};

exports.getPostBySlug = (req, res, next, slug) => {
  Post.find({ slug: slug }).exec((err, postdata) => {
    if (err) {
      return res.status(400).json({
        error: "Post not found",
      });
    }
    req.post = postdata;
    next();
  });
};

exports.getAllPosts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;
  Post.find()
    .sort({ createdAt: "desc" })
    .limit(limit)
    .skip(skip)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "No posts found",
        });
      }
      res.json(posts);
    });
};

exports.getPost = (req, res) => {
  //console.log(req.post);
  return res.json(req.post);
};

exports.updatePost = (req, res) => {
    upload(req, res, (err) => {
    if (err) {
      return res.json({ succes: false, err });
    }

    const post = req.post;
    //console.log(req.body);

    if ("file" in res.req) {
      post.image = res.req.file.path;
    }

    if ("date" in req.body) {
      let date = new Date(req.body.date);
      let value = ["-" + date.getDate(), 
                (date.getMonth() + 1).toString().padStart(2, '0'), 
                date.getFullYear().toString()].join('-');
      post.date = value;
    } 

    post.title = req.body.title;
    post.intro_content = req.body.intro_content;
    post.content = req.body.content;
    post.hashtag = req.body.hashtag;
    post.category = req.body.category;
    
    
    post.save((err, updatedPost) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Post is not created",
        });
      }
      res.json(
        updatedPost
      );
    });

    //fileName: res.req.file.fileName,
  });
};

exports.removePost = (req, res) => {
  const post = req.post;
  post.remove((err, post) => {
    if (err) {
      return rs.status(400).json({
        error: "Post is not deleted",
      });
    }

    res.json({
      message: "Post deleted successfully",
    });
  });
};
