const express = require('express');
const request = require('request');
const router = express.Router();
const showsController = require('../controllers/shows');
const episodesController = require('../controllers/episodes');


const onFailure = function(res) {
    return err => res.render('error', {mesage: err.message, error: err});
};

const onSuccess = function(res) {
    return data => res.send(data);
};

router.get('/media/:episodeId', (req, res) => {
    episodesController.fetchOne(req.params.episodeId).then(
        episode => {
            const content = episode.is_audio ? 'audio' : 'video';
            const type = episode.media_encoding || 'mpeg';
            res.setHeader("content-type", `${content}/${type}`);
            request(episode.media_url).pipe(res);
        },
        onFailure(res)
    );
});

router.get('/shows', (req, res) => {
    showsController.fetchAll().then(
        onSuccess(res),
        onFailure(res)
    );
});

router.get('/shows/:id', (req, res) => {
    const showId = Number(req.params.id);
    showsController.fetchOne(showId).then(
        onSuccess(res),
        onFailure(res)
    );
});

router.get('/shows/:showId/episodes', (req, res) => {
    episodesController.fetchWhere({show_id: Number(req.params.showId)}).then(
        onSuccess(res),
        onFailure(res)
    );
});

router.get('/shows/:showId/episodes/latest', (req, res) => {
    episodesController.fetchLatest({show_id: Number(req.params.showId)}).then(
        onSuccess(res),
        onFailure(res)
    );
});

router.get('/shows/:showId/episodes/:episodeId', (req, res) => {
    episodesController.fetchOne(Number(req.params.episodeId)).then(
        onSuccess(res),
        onFailure(res)
    );
});

module.exports = router;
