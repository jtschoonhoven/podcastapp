const Pg = require('../controllers/pg');
const pg = new Pg();

const _onSuccess = function() {
    console.log('Success.');
};

const _onFailure = function(err) {
    console.error(err);
    throw err;
};

const INIT = `
    DROP TABLE IF EXISTS public.shows;
    CREATE TABLE public.shows
    (id SERIAL PRIMARY KEY, name VARCHAR(1026), created_at TIMESTAMP);
`;


pg.execute(INIT)
    .then(_onSuccess, _onFailure);
