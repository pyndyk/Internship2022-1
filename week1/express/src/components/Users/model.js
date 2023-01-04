const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('strictQuery', true);

const { Schema } = mongoose;

const schemaUser = new Schema({
    email: {
        type: String,
        unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
});

schemaUser.pre('save', function save(next) {
    const user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return next(error);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();

                return undefined;
            });

            return undefined;
        });
    } else {
        return next();
    }

    return undefined;
});
const user = mongoose.model('user', schemaUser);

user.createIndexes({ email: 1 });

module.exports = user;