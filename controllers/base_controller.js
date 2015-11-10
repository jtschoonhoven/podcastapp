const Pg = require('./pg');

class BaseController {
    constructor(schema, table) {
        this.schema = schema;
        this.table = table;
        this.pg = new Pg();
    }

    _now() {
        return new Date().toISOString();
    }

    fetchAll() {
        const sql = `SELECT * FROM ${this.schema}.${this.table}`;
        return this.pg.fetchAll(sql);
    }

    fetchOne(id) {
        const sql = `
            SELECT * FROM ${this.schema}.${this.table}
            WHERE id = ${id}`;
        return this.pg.fetchOneRow(sql);
    }

    create(attr) {
        attr.created_at = this._now();

        const columnNames = Object.keys(attr);
        const valueIndexes = Object.keys(attr).map((x, i) => '$' + (i + 1));
        const values = Object.keys(attr).map(x => attr[x]);

        const sql = `
            INSERT INTO ${this.schema}.${this.table}
            (${columnNames.join(', ')})
            VALUES (DEFAULT, ${valueIndexes.join(', ')})`;

        return this.pg.execute(sql, values);
    }
}

module.exports = BaseController;
