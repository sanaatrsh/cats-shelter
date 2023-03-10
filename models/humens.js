const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const humenSchema = new Schema({
    fName: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        require: true
    },
    birth: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    cats: [{
        catId: {
            type: Schema.Types.ObjectId,
            ref: "Cats"
        },
        catName: {
            type: String
        },
        catAge: {
            type: Number
        },
        catGender: {
            type: String
        },
        catBreed: {
            type: String
        },
        catColor: {
            type: String
        },
        catNotes: {
            type: String
        },
    }],
    catsNo: {
        type: Number,
        default: '0'
    }
});

module.exports = mongoose.model('Humen', humenSchema);