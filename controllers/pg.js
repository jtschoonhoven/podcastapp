"use strict";

/**
 * Generic database query methods.
 * @module controllers/db
 */

const pg = require('pg');
const config = require('../config');
const env = process.env[config.constants.ENV] || 'development';

/**
 * Postgres query class.
 * @class
 */
class Pg {
  _connect(cb) {
    return pg.connect(config[env].PG_CREDENTIALS, cb);
  }

  _identity(x) { return x; }

  /**
   * @param {string} sql
   * @param {array} params
   * @param {function} [transform=_identity]
   * @return {Promise}
   */
  _query(sql, params, transform) {
    transform = transform || this._identity;

    return new Promise(function(resolve, reject) {
      this._connect(function(err, client, done) {
        if (err) { return reject(err); }

        client.query(sql, params, function(err, result) {
          done(); // Release client to pool.
          if (err) { return reject(err); }
          return resolve(transform(result));
        });

      });
    }.bind(this));
  }

  /** Execute DDL, returning metadata. */
  execute(sql, params) {
    return this._query(sql, params);
  }

  /** Return all rows. */
  fetchAll(sql, params) {
    const transform = x => x['rows'];
    return this._query(sql, params, transform);
  }

  /**
   * Return flat list where each element is an arbitary value from
   * each row of result.
   */
  fetchAllValues(sql, params) {
    const transform = function(x) {
      return x['rows'].map(function(row) {
        for (const prop in row) return prop;
      });
    };
    return this._query(sql, params, transform);
  }

  /** Return first row as object. */
  fetchOneRow(sql, params) {
    const transform = (x) => x['rows'][0];
    return this._query(sql, params, transform);
  }

  /** Return arbitrary value from first row of results. */
  fetchOneValue(sql, params) {
    const transform = function(x) {
      for (const prop in x['rows'][0]) return prop;
    };
    return this._query(sql, params, transform);
  }
}

module.exports = Pg;
