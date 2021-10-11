const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/my-uploads/userProfile/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + req.body.username + Date.now() + path.extname(file.originalname))
    }
  })
   
// const upload = multer({ 
//     storage: storage,
//     fileFilter: function (res, file, cb) {
//         checkFileType( file , cb );
//     }
// }).single('avatar');

const router = express.Router();

// const checkFileType = ( file , cb ) => {
    // allowed extensions
    // const fileTypes = /jpeg|jpg|png/;

    // check ext
    // const checkExt = fileTypes.test(path.extname(file.originalname).toLowerCase());

    //check mime type
    // const checkMime = fileTypes.test(path.extname(file.originalname).toLowerCase());

//     if(checkExt && checkMime){
//         cb(null,true);
//     } else{
//         cb('Error: Images of png,jpg,jpeg only allowed!',false);
//     }
// }

const checkUsernameExist = (username) => {
    User.find({
        username: username
    }).exec()
    .then( user => {
        if(user.length >= 1){
            return true
        } else{
            return false
        }
    })
}

const checkEmailExist = (email) => {
    User.findOne({
        email: email
    }).exec()
    .then( user => {
        if(user){
            console.log("uuuuuuuussseeerrrr",user);
            return true
        } else{
            console.log("uuuuuusdhfbjsfdb");
            return false
        }
    }).catch(err => {
        return false;
    })
}

const emailFormat = (email) => {
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(format.test(email)){
        return true;
    } else{
        return false;
    }
}

const passwordFormat = (password) => {
    const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(format.test(password)){
        return true;
    } else{
        return false;
    }
}

router.route('/').get( (req,res) => {
    User.find().then( users => {
        res.json({data:users, success: true})
    }).catch( err => {
        res.status(400).json('Error:' + err)
    });
});

router.route('/add').post((req,res) => {
    if(!emailFormat(req.body.email)){
        res.json({Error: "format of email is incorrect"});
    } else{
        if(!passwordFormat(req.body.password)){
            res.json({Error: "format of password is incorrect"});
        } else{
            if(checkEmailExist(req.body.email)){
                console.log("Entering...............",req.body.email);
                res.json({Error: "User exist with this email"});
            } else{
                if(checkUsernameExist(req.body.username)){
                    res.json({Error: "User exist with this username"});
                } else{
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        if(err){
                            console.log(err);
                            res.json({Error: "Password cannot be set"});
                        } else{
                            const name = req.body.name;
                            const email = req.body.email;
                            const username = req.body.username;
                            const password = hash;
                            const role = req.body.role;
                            const newUser = new User({
                                name,
                                email,
                                username,
                                password,
                                role,
                            });
                        
                            newUser.save().then(() => {
                                res.json({
                                    success: true,
                                    successMessage: "User Added!"
                                });
                            }).catch( error => {
                                console.log(error);
                                res.status(400).json({ Error : error})
                            });
                        }
                    });
                }
            }
        }
    }
});

router.route('/delete/:id').delete((req,res) => {
    User.findByIdAndDelete({
        _id : req.params.id,
    }).then((result) => {
        res.json({
            data: result,
            success: true,
            successMessage: "deleted Successfully"
        })
    })
})

router.route('/update/:id').put((req,res) => {
    User.findByIdAndUpdate({
        _id : req.params.id,
    }, req.body).then((result) => {
        res.json({
            success: true,
            successMessage: `Updated Successfully`
        })
    })
})

// router.route('/api/admin/auth').

// upload( req , res , (uploaderror) => {
//     if(err){
//         console.log(uploaderror);
//         res.json({ Error : uploaderror});    
//     } else{
//         console.log(req.file);
//         const username = req.body.username;
//         const password = hash;
//         const role = req.body.role;
//         const profileAvatar = req.file.path;
//         const newUser = new Users({
//             username,
//             password,
//             role,
//             profileAvatar,
//         });
    
//         newUser.save().then(() => {
//             res.json({
//                 success: true,
//                 successMessage: "User Added!"
//             });
//         }).catch( error => {
//             console.log(error);
//             res.status(400).json({ Error : error})
//         });
//     }
// });

module.exports = router;