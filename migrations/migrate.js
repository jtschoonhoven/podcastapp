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
    BEGIN;

    DROP TABLE IF EXISTS public.publishers CASCADE;
    CREATE TABLE public.publishers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(256),
        created_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    DROP TABLE IF EXISTS public.shows CASCADE;
    CREATE TABLE public.shows (
        id SERIAL PRIMARY KEY,
        rss_url VARCHAR(256),
        title VARCHAR(256),
        description TEXT,
        publisher_id INT references public.publishers(id),
        homepage_url VARCHAR(256),
        image_url VARCHAR(256),
        language VARCHAR(256),
        audio BOOLEAN,
        video BOOLEAN,
        explicit BOOLEAN,
        alive BOOLEAN,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP,
        deleted_at TIMESTAMP
    );

    DROP TABLE IF EXISTS public.episodes CASCADE;
    CREATE TABLE public.episodes (
        id SERIAL PRIMARY KEY,
        show_id INT references public.shows(id),
        title VARCHAR(256),
        episode_url VARCHAR(256),
        image_url VARCHAR(256),
        hash VARCHAR(256),
        author VARCHAR(256),
        description TEXT,
        guid VARCHAR(256),
        audio_url VARCHAR(256),
        audio_encoding VARCHAR(256),
        audio_length VARCHAR(256),
        video_url VARCHAR(256),
        video_encoding VARCHAR(256),
        video_length VARCHAR(256),
        explicit BOOLEAN,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP,
        deleted_at TIMESTAMP
    );

    DROP TABLE IF EXISTS public.tags CASCADE;
    CREATE TABLE public.tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(256),
        created_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    DROP TABLE IF EXISTS public.shows_tags CASCADE;
    CREATE TABLE public.shows_tags (
        show_id INT references public.shows(id),
        tag_id INT references public.tags(id),
        created_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    DROP TABLE IF EXISTS public.episodes_tags CASCADE;
    CREATE TABLE public.episodes_tags (
        episodes_id INT references public.episodes(id),
        tag_id INT references public.tags(id),
        created_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    COMMIT;
`;


pg.execute(INIT)
    .then(_onSuccess, _onFailure);
