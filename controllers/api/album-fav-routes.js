const router = require('express').Router();
const { AlbumFavorites, ArtistFavorites } = require('../../models');

router.get('/', (req, res) => {
    AlbumFavorites.findAll({
        where: {
            user_id: req.session.id
        },
        attributes: [
            'id',
            'album_id',
            'album_name',
            'user_id'
        ],
    })
        .then(favorites => res.json(favorites))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    AlbumFavorites.create({
        album_id: req.body.album_id,
        album_name: req.body.album_name,
        user_id: req.body.user_id

    })

        .then(favorites => res.json(favorites))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.delete('/:id', (req, res) => {
    AlbumFavorites.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(favorites => {
            if (favorites) {
                res.status(404).json({ message: 'No favorite found with this id' });
                return;
            }
            res.json(favorites);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;