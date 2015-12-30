const showsController = require('../controllers/shows');
const episodesController = require('../controllers/episodes');

const onFailure = function(res) {
    return err => res.render('error', {mesage: err.message, error: err});
};

const onSuccess = function(res) {
    return data => res.send(data);
};

module.exports = app => {
    app.get('/api/v0/shows', (req, res) => {
        showsController.fetchAll().then(
            onSuccess(res),
            onFailure(res)
        );
    });

    app.get('/api/v0/shows/:id', (req, res) => {
        const showId = Number(req.params.id);
        showsController.fetchOne(showId).then(
            onSuccess(res),
            onFailure(res)
        );
    });

    app.get('/api/v0/shows/:showId/episodes', (req, res) => {
        episodesController.fetchWhere({show_id: Number(req.params.showId)}).then(
            onSuccess(res),
            onFailure(res)
        );
    });

    app.get('/api/v0/shows/:showId/episodes/latest', (req, res) => {
        episodesController.fetchLatest({show_id: Number(req.params.showId)}).then(
            onSuccess(res),
            onFailure(res)
        );
    });

    app.get('/api/v0/shows/:showId/episodes/:episodeId', (req, res) => {
        episodesController.fetchOne({episode_id: Number(req.params.episodeId)}).then(
            onSuccess(res),
            onFailure(res)
        );
    });
}
