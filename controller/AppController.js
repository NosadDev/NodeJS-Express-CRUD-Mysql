const con = require("../modules/mysql")

exports.index = async (req, res, next) => {
    try {
        result = await con.query("SELECT * FROM person");
        action = (req.session.action ? action = req.session.action : null);
        if (req.session.action != undefined) {
            delete req.session.action
        }
        res.render('index', { result: result, action: action });
    } catch (error) {
        next(error)
    }
}
exports.create = async (req, res, next) => {
    try {
        if (req.method == 'GET') {
            res.render('create');
        }
        if (req.method == 'POST') {
            result = await con.query("INSERT INTO person (firstname,lastname) VALUES (?,?)", [req.body.firstname, req.body.lastname])
            if (result.affectedRows >= 1) {
                req.session.action = `Create PersonID:<b>${result.insertId}</b> Successfully`;
            }
            return res.redirect('/');

        }
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res) => {
    try {
        if (req.method == 'GET') {
            result = await con.query("SELECT * FROM person WHERE id=? LIMIT 1", [req.params.id])
            res.render('update', { result: result[0] });
        }
        if (req.method == 'POST') {
            result = await con.query("UPDATE person SET firstname=?,lastname=? WHERE id=?", [req.body.firstname, req.body.lastname, req.params.id])
            if (result.affectedRows >= 1) {
                req.session.action = `Update PersonID:<b>${req.params.id}</b> Successfully`;
            }
            return res.redirect('/');
        }
    } catch (error) {
        next(error)
    }
}
exports.delete = async (req, res) => {
    try {
        result = await con.query("DELETE FROM person WHERE id=?", [req.params.id])
        console.log(result);
        if (result.affectedRows >= 1) {
            req.session.action = `Delete PersonID:<b>${req.params.id}</b> Successfully`;
        }
        return res.redirect('/');
    } catch (error) {
        next(error)
    }
}