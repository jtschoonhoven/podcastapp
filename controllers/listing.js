const Pg = require('./pg');
const pg = new Pg();

const FETCHALL = "SELECT * FROM public.shows";
const FETCHONE = "SELECT * FROM public.shows WHERE id = $1";
const CREATE = "INSERT INTO public.shows VALUES (DEFAULT, $1, $2)";

class ListingController {
    _schema() { return 'public'; }
    _now() { return new Date().toISOString(); }

    fetchAll() { return pg.fetchAll(FETCHALL); }
    fetchOne(id) { return pg.fetchOneRow(FETCHONE, [id]); }
    create(attr) { pg.execute(CREATE, [attr['name'], this._now()]); }
}

module.exports = ListingController;
