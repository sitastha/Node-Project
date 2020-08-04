const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const Tw = require('../../models/Tw');

// This is the route to have all the tws
Router.get('/', (req, res) => {
    Tw.find()
        .lean()
        .exec()
        .then(tws => {
            res.status(200).json(tws);
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
})

// this is the route to have one specific tw
Router.get('/:twId', (req, res) => {
    twId = req.params.twId;

    Tw.find({
        _id: twId
    })
        .lean()
        .exec()
        .then(tw => {
            res.status(200).json(tw);
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
})


//this is the route to create a tw
Router.post('/', (req, res) => {
    console.log(req.body.message);
    
    if (req.body.message && req.body.message != "") {
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message
        })

        tw.save()
            .then(tw => {
                res.status(200).send(tw);
            })
            .catch(err => {
                res.status(500).json({error: err});    
            })
    } else {
        res.status(500).json({error: "Please put some values"});    
    }
})

// this is the route to delete a tw
Router.delete('/:twId', (req, res) => {
    twId = req.params.twId;

    Tw.remove({
        _id: twId
    })
        .exec()
        .then(result => {
            res.status(200).json({ 'message': 'This has been deleted !' });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
})

// this is the route to update a tw
Router.patch('/:twId', (req, res) => {
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
                res.status(200).json(tw);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    } else {
        res.status(500).json({ error: 'updated' });
    }
})
module.exports = Router;

