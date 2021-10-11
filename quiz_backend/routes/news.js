const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const News = require('../models/news.model');


const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/news/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})
   
const uploadImage = multer({ 
    storage: imageStorage,
    fileFilter: function (res, file, cb) {
        checkImageFileType( file , cb );
    }
});

const router = express.Router();

const checkImageFileType = ( file , cb ) => {
    // allowed extensions
    const fileTypes = /jpeg|jpg|png/;

    //check ext
    const checkExt = fileTypes.test(path.extname(file.originalname).toLowerCase());

    //check mime type
    const checkMime = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if(checkExt && checkMime){
        cb(null,true);
    } else{
        cb('Error: Images with extension png,jpg,jpeg only allowed!',false);
    }
}

router.route('/').get( (req,res) => {
    News.find().then( news => {
        res.json({data: news, success: true})
    }).catch( err => {
        res.status(400).json('Error:' + err)
    });
});

router.route('/add').post(uploadImage.array('newsImages'),(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const categories = req.body.categories;
    const reporter = req.body.reporter;
    const publish = req.body.publish;
    const youtubeLink = req.body.youtubeLink;
    const images = [];
    req.files.forEach( ele => {
        if(ele.fieldname === "newsImages"){
            images.push(ele.path);
        }
    });
    const newNews = new News({
        title,
        description,
        categories,
        reporter,
        publish,
        youtubeLink,
        images,
    })
    newNews.save().then(() => {
        res.json({
            success: true,
            successMessage: "News Added!"
        });
    }).catch( error => {
        console.log(error);
        res.status(400).json({ Error : error})
    });
});

router.route('/delete/:id').delete((req,res) => {
    News.findByIdAndDelete({
        _id : req.params.id,
    }).then((result) => {
        res.json({
            data: result,
            success: true,
            successMessage: "Deleted Successfully"
        })
    })
})

router.route('/update/:id').put((req,res) => {
    News.findByIdAndUpdate({
        _id : req.params.id,
    }, req.body).then((result) => {
        res.json({
            success: true,
            successMessage: `News Updated Successfully`
        })
    })
})

module.exports = router;