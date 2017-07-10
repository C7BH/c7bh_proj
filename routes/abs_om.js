/**
 * Created by c7bh on 5/8/2017.
 */
var express = require('express');
var router  = express.Router();
var mongojs = require('mongojs');
//db is located at c/Users/C7BH/data/db

//var db = mongojs('mydb', ['mycollection'])
//in general collections should be lowercase and plural
//test is the db within the db directory, todos is the collection
var db = mongojs("test", ['absdata']);

//var db = mongojs("C:\Users\WebstormProjects\c7bh\c\C7BH\data\db\test", ['absdata']);
//console.log('DB is:' + db);
/* GET ALL ITEMS IN COLLECTION
 find everything
 db.mycollection.find(function (err, docs) {
 // docs is an array of all the documents in mycollection
 })
 */
router.get('/abs_om', function(req, res, next) {
    /*db.collection('chat').find().toArray(function(err, docs) {
     console.log(JSON.stringify(docs));
     });*/
    db.absdata.find(function(err, todos) {
        if (err) {
            console.log('GET Error: /abs_om');
            res.send(err);
        } else {
            console.log("GET Response received: /abs_om ");
            res.json(todos)
            //console.log(JSON.stringify(ww));
        }
    });
});

/*Get one collection item with the provided ID */
router.get('/om_item/:id', function(req, res, next) {
    db.absdata.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todos) {
        if (err) {
            console.log('Error trying to get a single om_item');
            res.send(err);
        } else {
            console.log('Successful response grabbing a single om_item');
            res.json(todos);
        }
    });
});

/* POST/SAVE a todo */
router.post('/om_item', function(req, res, next) {
    var todo = req.body;
    todo = {text: 'test',isCompleted: false}
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.absdata.save(todo, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log("error in om_item");
                res.json(result);
            }
        })
    }
});
/* PUT/UPDATE a todo */
router.put('/om_item/:id', function(req, res, next) {
    var todo = req.body;
    var updObj = {};

    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }
    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.absdata.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }

});

/* DELETE a todo */
router.delete('/om_item/:id', function(req, res) {
    db.absdata.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;