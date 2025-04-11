const UserModel = require("../models/User.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
exports.register = (req, res) => {

    UserModel.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(422).send({ message: 'Email exist' })
            } else {
                // generation de la clé de hashage puissance entre 10 et 20
                bcrypt.genSalt(14)
                    .then((key) => {
                        bcrypt.hash(req.body.password, key)
                            .then((hashedPass) => {
                                let new_user = new UserModel(req.body);
                                new_user.password = hashedPass
                                new_user.save()
                                    .then((data) => {
                                        res.send(data)
                                    }).catch(err => res.status(422).send(err))

                            }).catch(err => res.status(422).send(err))
                    }).catch(err => res.status(422).send(err))
            }
        }).catch(err => res.status(422).send(err))
}

exports.register2 = async (req, res) => {

    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            res.status(422).send({ message: 'Email exist' })
        } else {
            let key = await bcrypt.genSalt(14)
            let hashedPass = await bcrypt.hash(req.body.password, key)
            let new_user = new UserModel(req.body);
            new_user.password = hashedPass
            await new_user.save()
            res.send(new_user)
        }
    } catch (err) {
        res.status(422).send(err)
    }
}

exports.login = async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            res.status(450).send({ message: 'Invalid Email Address' })
        } else {

            console.log(user.password)
            console.log(req.body.password)
            let compare = await bcrypt.compare(req.body.password, user.password)
            if (compare) {
                let token = await jwt.sign(
                    { _id: user._id, email: user.email },
                    process.env.SECRETKEY || '123'

                )
                res.send(token)

            } else {
                res.status(423).send({ message: 'Invalid Credentials' })
            }
        }

    } catch (err) {
        res.status(425).send(err)
    }
}
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})
exports.forgotPassword = async (req, res) => {

    try {
        //1: test if user exist with email ( req.body)
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            res.status(422).send({ message: 'Invalid Account' })
        } else {

            //2: generate unique id ( example : jwt)
            let resetKey = uuid.v4()
            console.log(resetKey)
            //3 : save unique id 
            user.resetKey = resetKey
            // type date 
            let timeout = new Date();
            timeout.setHours(timeout.getHours() + 1)
            user.resetTimeout = timeout
            //type number 
            // user.resetTimeout = Date.now()
            await user.save()
            //4 send mail

            let mailContent = {
                from: 'NODE APPLICATION',
                to: user.email,
                subject: 'Reset password link',
                text: 'reset key : ' + resetKey,
                //   html: `reset link : <a href="http://localhost:3000/reset/${resetKey}">here</a>`
            }
            await transporter.sendMail(mailContent)
            res.send({ message: 'Mail sent successfully' })
        }
    } catch (err) {
        res.status(422).send(err)
    }

}
exports.resetPassword = async (req, res) => {
    if (req.body.resetKey && req.body.newPass) {
        try {
            //1: search user by resetKey
            let user = await UserModel.findOne({ resetKey: req.body.resetKey })
            if (!user) {
                res.status(422).send({ message: 'Invalid Account' })
            } else {
                if (new Date() < new Date(user.resetTimeout)) {
                    let salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(req.body.newPass, salt)
                    user.resetKey = undefined
                    await user.save()
                    res.send({ message: 'user updated' })
                }else{
                    res.status(444).send({ message: 'Expired reset link' })
                }
            }
            //2: hashage password
        } catch (err) {
            console.log(err)
            res.status(422).send(err)
        }
    } else {
        res.status(422).send({ message: "Missing parameters" })
    }
}