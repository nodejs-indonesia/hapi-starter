'use strict';

const Bcrypt = require('bcrypt'); // We don't want to store password with out encryption
const saltRounds = 10; // see: (https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds)

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        userId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userUuid: {
            allowNull: true,
            type: DataTypes.UUID,
            unique: true,
            defaultValue: DataTypes.UUIDV1
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isUnique: (value, next) => {

                    const self = this;
                    User.find({ where: { email: value } })
                        .then((user) => {
                            // reject if a different user wants to use the same email
                            if (user && self.userId !== user.userId) {
                                // return next('Sorry, email already taken!');
                                // console.log(user);
                                return next('Sorry, ' + user.email + ' already taken!');
                                // return next();

                            }
                            return next();
                        })
                        .catch((err) => {

                            return next(err);
                        });
                }
            }
        },
        password: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE
        }
    }, {
        // don't forget to enable timestamps!
        timestamps: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: false,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                // associations can be defined here

            }
        },
        hooks: {
            // Sequelize: Hooks (https://youtu.be/JAld7bV5qV8)
            beforeCreate: function (user, options, next) {
                // Info: (https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt)
                Bcrypt.genSalt(saltRounds, (err, salt) => {

                    if (err) {
                        return next(err);
                    }
                    Bcrypt.hash(user.password, salt, (err, hash) => {

                        if (err) {
                            return next(err);
                        }
                        user.password = hash;
                        next();
                    });
                });
            }
        },
        instanceMethods: {
            // We don't wan't to send back encrypted password either
            // See: (https://stackoverflow.com/questions/27972271/sequelize-dont-return-password)
            toJSON: function () {

                const values = Object.assign({}, this.get());

                delete values.password;
                return values;
            }
        }
    });

    return User;
};

