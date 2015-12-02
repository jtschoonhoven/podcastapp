"use strict";
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

    /**
     * Return all rows in table.
     * @return {promise} - resolves to array
     */
    fetchAll() {
        const sql = `SELECT * FROM ${this.schema}.${this.table}`;
        return this.pg.fetchAll(sql);
    }

    /**
     * Return the single record that matches numeric id.
     * @param {number} id
     * @return {promise} - resolves to object literal
     */
    fetchOne(id) {
        const sql = `
            SELECT * FROM ${this.schema}.${this.table}
            WHERE id = ${id} LIMIT 1`;
        return this.pg.fetchOneRow(sql);
    }

    /**
     * Naive method to return rows where given key/value pair exactly matches column/value.
     * If {where} is numeric, it is assumed to match on the id column.
     * @param {number | object} where
     * @return {promise} - resolves to array
     */
    fetchWhere(where) {
        if (typeof(where) === 'number') {
            where = {id: where};
        }

        const values = [];
        const conditions = [];

        for (const colname in where) {
            if (!where.hasOwnProperty(colname)) {
                continue;
            }
            values.push(where[colname]);
            const cleanCol = colname.replace(/[^a-z0-9_]/gi, '');
            conditions.push(`${cleanCol} = $${values.length}`);
        }

        const sql = `
            SELECT * FROM ${this.schema}.${this.table}
            WHERE ${conditions.join('\nAND ')}`;

        return this.pg.fetchAll(sql, values);
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
