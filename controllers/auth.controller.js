const UserModel = require("../models/User.model")
const bcrypt = require('bcryptjs')
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

exports.login = (req, res) => {

}


exports.forgotPassword = (req, res) => {

}
exports.resetPassword = (req, res) => {

}