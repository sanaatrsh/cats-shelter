const { ObjectId } = require('mongodb');
const { isValidObjectId } = require('mongoose');
const { findById } = require('../models/cats');
const Cat = require('../models/cats');
const Humen = require('../models/humens');

exports.getCats = (req, res, next) => {
    Cat.find()
        .then(cat => {
            console.log('meaw')
            res.render('cats', {
                cats: cat,
                showCats: false
            });
        })
        .catch(err => console.log(err))
};

exports.getNewCat = (req, res, next) => {
    res.render('addCat', {
        editing: false
    });
};

exports.postNewCat = (req, res, next) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const breed = req.body.breed;
    const color = req.body.color;
    const adopted = req.body.adopted;
    const notes = req.body.notes;

    const cat = new Cat({
        name: name,
        age: age,
        gender: gender,
        breed: breed,
        color: color,
        adopted: adopted,
        notes: notes
    });

    cat.save()
        .then(result => {
            console.log('New Cat Added!');
            res.redirect('/cats');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditCat = (req, res, next) => {
    const editMode = req.query.edit;
    const catID = req.params.catId;
    if (!editMode) {
        return res.redirect('cats');
    }
    Cat.findById(catID)
        .then(cat => {
            res.render('addCat', {
                editing: editMode,
                cat: cat
            });
        })
        .catch(err => console.log(err))
}

exports.postEditCat = (req, res, next) => {
    const catId = req.params.catId;
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const breed = req.body.breed;
    const color = req.body.color;
    const adopted = req.body.adopted;
    const notes = req.body.notes;

    Cat.findById(catId)
        .then(cat => {
            cat.name = name;
            cat.age = age;
            cat.gender = gender;
            cat.breed = breed;
            cat.color = color;
            cat.adopted = adopted;
            cat.notes = notes;
            return cat.save();
        })
        .then(result => {
            console.log('Updated!');
            res.redirect('/cats');
        })
        .catch(err => console.log(err));
}

exports.postRemoveCat = (req, res, next) => {
    const catId = req.params.catId;
    Cat.findByIdAndRemove(catId)
        .then(() => {
            console.log('Removed!!');
            res.redirect('/cats');
        })
        .catch(err => console.log(err));
}

exports.getAdopted = (req, res, next) => {
    const editMode = req.query.edit;

    const catPromise = Cat.find({});
    const humenPromise = Humen.find({});

    Promise.all([catPromise, humenPromise])
        .then(([cat, humen]) => {
            res.render('humens', {
                cat: cat,
                humens: humen,
                addAdopter: true,
                editing: editMode
            });
        })
}

exports.getAdopter = (req, res, next) => {
    const editMode = req.query.edit;

    const catPromise = Cat.find({});
    const humenPromise = Humen.find({});

    Promise.all([catPromise, humenPromise])
        .then(([cat, humen]) => {
            res.render('humens', {
                cat: cat,
                humens: humen,
                addAdopter: true,
                editing: editMode
            });
        })
}

exports.postAdopter = (req, res, next) => {
    const catId = req.params.catId;
    const humenId = req.params.humenId;

    Humen.findById(humenId)
        .then(humen => {
            Cat.findById(catId)
                .then(cat => {
                    if (cat.adopted != "true") {
                        Cat.findById(catId)
                            .then(cat => {
                                cat.adopted = "true";
                                cat.adopter.adoptInfo = humen._id
                                cat.adopter.adopterName = humen.fName + ' ' + humen.lName
                                return cat.save();
                            })
                        // Cat.findById(catId)
                        humen.cats.push({
                            catId: cat._id,
                            catName: cat.name,
                            catAge: cat.age,
                            catGender: cat.gender,
                            catBreed: cat.breed,
                            catColor: cat.color,
                            catNotes: cat.notes
                        })
                        humen.catsNo++;
                        return humen.save()
                    }
                    else {
                        console.log('cat is adopted!')
                    }
                }
                )
        })
        .then(result => {
            console.log('Updated!');
            console.log(isValidObjectId(catId))
            console.log(isValidObjectId(humenId))
            res.redirect('/cats');
        })
        .catch(err => console.log(err));
}

exports.getSearchCats = (req, res, next) => {
    let { term } = req.query;

    term = term.toLowerCase()

    Cat.find({ name: { $regex: '.*' + term + '.*' } })
        .then(cats => {
            res.render('cats', { cats: cats })
        })
        .catch(err => console.log(err))

}