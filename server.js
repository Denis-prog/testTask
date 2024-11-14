const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const server = jsonServer.create();
const _ = require('lodash');
const router = jsonServer.router('db.json');
var cors = require('cors');
var middlewares = jsonServer.defaults();
server.db = router.db;

const reloadDB = (req, res, next) => {
    if (req.method === 'POST' && req.url.endsWith('/reloadDB')) {
        const initiallDb = fs.readFileSync(path.join(__dirname, 'initial.json'), 'utf8');

        fs.writeFileSync(path.join(__dirname, 'db.json'), initiallDb)
        res.sendStatus(201);
    } else {
        next();
    }
};

server.use(cors());



server.use(reloadDB);

server.use(function (req, res, next) {
    if (!req.url.endsWith('/reloadDB')) {
        setTimeout(next, 1000);
    }

});

server.post('/usersCollections', (req, res) => {
    const db = router.db;
    console.log(req.body);
    if (Array.isArray(req.body)) {
        req.body.forEach(element => {
            insert(db, 'users', element);
        });
    }

    res.sendStatus(200)

    function insert(db, collection, data) {
        const table = db.get(collection);

        if (_.isEmpty(table.find({ _id: data._id }).value())) {
            table.push(data).write();
        }
        else {
            table.find({ _id: data._id })
                .assign(_.omit(data, ['_id']))
                .write();
        }
    }
});


server.use(middlewares);
server.use(router);

server.listen(3000, function () {
    console.log('JSON Server is running')
})