const url = require('url');

const myService = require('./service');

const blogPostSchema = require('./middleware');

async function findAll(req, res) {
    try {
        const demo = await myService.findAll();

        return res.status(200).json({
            data: demo,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function create(req, res) {
    try {
        const result = blogPostSchema.schema.validate(req.body);
        const { error } = result;
        const valid = error == null;

        if (valid) {
            const demo = await myService.create(req.body);

            return res.status(201).json({
                data: demo,
            });
        }

        return res.status(400).send(error.details[0].message);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function putUser(req, res) {
    try {
        const queryObject = url.parse(req.url, true).query;
        const result = blogPostSchema.schema.validate(req.body);
        const result2 = blogPostSchema.schemaQuery.validate(queryObject);
        const { error } = (result || result2);
        const valid = error == null;

        if (valid) {
            const demo = await myService.putUser(req.body, queryObject.id);

            return res.status(201).json({
                data: demo,
            });
        }

        return res.status(400).send(error.details[0].message);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function deleteUser(req, res) {
    try {
        const queryObject = url.parse(req.url, true).query;
        const result = blogPostSchema.schemaQuery.validate(queryObject);
        const { error } = result;
        const valid = error == null;

        if (valid) {
            const demo = await myService.deleteUser(queryObject.id);

            return res.status(201).json({
                data: demo,
            });
        }

        return res.status(400).send(error.details[0].message);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function getToken(req, res) {
    if (req.body) {
        const user = await myService.getToken(req.body);

        return res.json({ token: `${user}` });
    }

    return res.json(' not data');
}

module.exports = {
    findAll,
    create,
    putUser,
    deleteUser,
    getToken,
};