const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const JWT_SECRET = "DhyeyisGood$oy"
var jwt = require('jsonwebtoken');

// ROUTE 1: CREATE/SIGNUP A USER IN MODEL (post request) "/api/auth/createuser" No login requried
router.post('/createuser',[
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a password of atleast 5 characters").isLength({ min: 5 }),
] ,async (req, res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let success = false;
        let user = await User.findOne({email:req.body.email})
        if (user){
            return res.status(400).json({success,error:"Sorry a user with this email already exists."})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
          })

          const data={
            user: {
                id: user.id
            }
          }
          var authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({success,authtoken});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured")
    }
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    //   res.json({error:"Please enter a valid unique email"})});
})



// ROUTE 2: Authenticate a user using POST "api/auth/login" - No Login Required
router.post('/login',[
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        let success = false;
        if (!user){
            return res.status(400).json({success, error :"Please try to login with correct credentials."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error:"Please try to login with correct credentials."})
        }

        const data={
            user: {
                id: user.id
            }
        }
        var authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authtoken});

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.")
    }
    })
    
    
    
    
// ROUTE 3: GET LOGINED USER DETAILS using POST "api/auth/getuser" - Login Required
router.post('/getuser', async (req, res) => {
try {
    let userID = req.user;
    const user = await User.findOne(userID).select("-password");
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.")
}
})

module.exports = router;