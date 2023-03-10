const mongoose = require('mongoose');
const { STRING } = require('sequelize');

const Schema = mongoose.Schema;

const catsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    breed: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    adopted: {
        type: String,
        default: 'false'
    },
    adopter: {
        adoptInfo:
        {
            type: Schema.Types.ObjectId,
            ref: "Humen"
        },
        adopterName: {
            type: String
        }

    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Cats', catsSchema);