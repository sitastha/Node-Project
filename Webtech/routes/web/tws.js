const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose')

const Tw = require('../../models/Tw');

Router.get('/', (req, res) => {
    var error = false;

    Tw.find()
        .sort({createdAt:-1})
        .lean()
        .exec()
        .then(tws => {
            res.render('tws', {
                tws: tws,
                error: error
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});

module.exports = Router;

Router.post('/', (req, res) => {
    console.log(req.body.message);
    
    if (req.body.message && req.body.message != "") {
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message
        })

        tw.save()
            .then(tw => {
                res.redirect('/tws');
            })
            .catch(err => {
                res.status(500).json({error: err});    
            })
    } else {
        res.status(500).json({error: "Please put some values"});    
    }
})
module.exports = Router;