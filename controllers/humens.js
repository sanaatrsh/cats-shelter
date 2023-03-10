const Humen = require('../models/humens')
const Cat = require('../models/cats');

exports.getHumens = (req, res, next) => {
    const addAdopter = req.query.addAdopter
    Humen.find()
        .then(humen => {
            res.render('humens', {
                humens: humen,
                addAdopter: addAdopter
            });
        })
        .catch(err => { console.log(err) });
};

exports.getAddHumen = (req, res, next) => {
    res.render('addHumen', {
        editing: false
    });
}

exports.postAddHumen = (req, res, next) => {
    const addAdopter = req.query.addAdopter
    const editMode = req.query.edit;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const birth = req.body.birth;
    const number = req.body.number;
    const address = req.body.address;

    const humen = new Humen({
        fName: fName,
        lName: lName,
        birth: birth,
        number: number,
        address: address
    })

    humen.save()
        .then(result => {
            console.log('New Adopter Added!!');
            if (addAdopter)
                res.redirect('/cats')
            else
                res.redirect('/humens')
        })
        .catch(err => { console.log(err) });
}


exports.getEditHumen = (req, res, next) => {
    const editMode = req.query.edit;
    const humenId = req.params.humenId;
    if (!editMode) {
        res.redirect('humens');
    }
    Humen.findById(humenId)
        .then(humen => {
            res.render('addHumen', {
                editing: editMode,
                humens: humen
            });
        })
        .catch(err => { console.log(err) });
}

exports.postEditHumen = (req, res, next) => {
    const humenId = req.params.humenId;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const birth = req.body.birth;
    const number = req.body.number;
    const address = req.body.address;

    Humen.findById(humenId)
        .then(humen => {
            humen.fName = fName;
            humen.lName = lName;
            humen.birth = birth;
            humen.number = number;
            humen.address = address;
            return humen.save();
        })
        .then(result => {
            console.log('Updated!');
            res.redirect('/humens');
        })
        .catch(err => console.log(err));
}

exports.postRemoveHumen = (req, res, next) => {
    const humenId = req.params.humenId;
    Humen.findByIdAndRemove(humenId)
        .then(() => {
            console.log('HUMEN REMOVED!');
            res.redirect('/humens');
        })
        .catch(err => { console.log(err) });
}

exports.getShowCats = (req, res, next) => {
    const humenId = req.params.humenId;
    Humen.findById(humenId)
        .then(humen => {
            res.render('cats', {
                cats: humen.cats,
                showCats: true,
                humen: humen
            })
        })
        .catch(err => { console.log(err) })
}

exports.postRemoveCat = (req, res, next) => {
    const humenId = req.params.humenId;
    const catId = req.params.catId;

    Humen.findById(humenId)
        .then(humen => {
            // const index = humen.cats.indexOf(Cat.findById(catId))
            // const index = humen.cats.indexOf(humen.cats.pop())
            // console.log(index)
            // if (index > -1) {
            //     humen.cats.splice(index, 1);
            // }
            // const index = humen.agg
            // const index = Humen.aggregate([{
            //     $project: {
            //         index: { $indexOfArray: ["$cats"] }
            //     }
            // }])
            // //  humen.cats.pop()
            // console.log(index)
            // return humen.save()

        })
        .then(() => {
            console.log('Removed!!');
            res.redirect('/humens');
        })
        .catch(err => console.log(err));
}

exports.getSearchHumens = (req, res, next) => {
    let { term } = req.query;

    term = term.toLowerCase()

    Humen.find({
        $or: [
            { fName: { $regex: '.*' + term + '.*' } }
            , { lName: { $regex: '.*' + term + '.*' } }]
    })
        .then(humens => {
            res.render('humens', { humens: humens, addAdopter: false })
        })
        .catch(err => console.log(err))

}