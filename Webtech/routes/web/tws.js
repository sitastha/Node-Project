const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose')

const Tw = require('../../models/Tw');

var list = (req, res, msg = '') => {
    var error = false;

    Tw.find()
        .sort({createdAt:-1})
        .lean()
        .exec()
        .then(tws => {
            res.render('tws/list', {
                tws: tws,
                error: error,
                msg: msg,
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
}

Router.get('/delete/:twId', (req, res) => {
    twId = req.params.twId;

    Tw.remove({
        _id: twId
    })
        .exec()
        .then(result => {
            res.redirect('/tws/success/Tw well deleted !');
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});

Router.get('/', (req, res) =>{
    list(req, res)
});

Router.get('/show/:twId', (req, res) => {
    Tw.findOne({_id: req.params.twId})
        .lean()
        .exec()
        .then(tw => {
            res.render('tws/show', {
                tw: tw
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});

Router.get('/edit/:twId', (req, res) => {
    Tw.findOne({_id: req.params.twId})
        .lean()
        .exec()
        .then(tw => {
            res.render('tws/edit', {
                tw: tw
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});

Router.get('/:type/:msg', (req, res) => {
    var msg = {
        type: req.params.type,
        msg: req.params.msg
    }
    list(req, res, msg)
});

Router.post('/', (req, res) => {
    if (req.body.message && req.body.message != "") {
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message
        })

        tw.save()
            .then(tw => {
                res.redirect('/tws/success/Tw well created');
            })
            .catch(err => {
                res.status(500).json({error: err});    
            })
    } else {
        // res.status(500).json({error: "Please put some values"});
        res.redirect('/tws/danger/Please put some value');
    }
})

Router.post('/update/:twId', (req, res) => {
    twId = req.params.twId;
    message = req.body.message;

    if (req.body.message && req.body.message != "") {
        Tw.update({ _id: twId }, {
                $set: {
                    message: req.body.message,
                }
            })
            .exec()
            .then(tw => {
                res.redirect('/tws/success/Tw well updated');
            })
            .catch(err => {
                // res.status(500).json({ error: err });
                res.redirect('/tws/danger/'+err);
            });
    } else {
        // res.status(500).json({ error: 'Merci de remplire tous les champs' });
        res.redirect('/tws/danger/Please put some value');
    }
})

module.exports = Router;