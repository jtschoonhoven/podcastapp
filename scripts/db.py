import json
import os
import psycopg2


class DB(object):
    """Extends the psycopg cursor with convenience methods."""

    def __init__(self):
        with open('config.json') as f:
            self.config = json.load(f)
        self.env = os.environ.get(self.config['constants']['ENV'], 'development')
        self.cur = None
        self.dict_cur = None

    def _get_cursor(self):
        pg_credentials = self.config[self.env]['PG_CREDENTIALS']
        conn = psycopg2.connect(**pg_credentials)
        self.cur = conn.cursor()

    def _get_dict_cursor(self):
        pg_credentials = self.config[self.env]['PG_CREDENTIALS']
        conn = psycopg2.connect(**pg_credentials)
        self.dict_cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    def fetch_row(self, sql, params=None):
        """Fetch a single row as tuple."""
        if not self.cur:
            self._get_cursor()
        self.cur.execute(sql, params)
        return self.cur.fetchone()

    def fetch_row_dict(self, sql, params=None):
        """Fetch a single row as dict with column names as keys."""
        if not self.dict_cur:
            self._get_dict_cursor()
        self.dict_cur.execute(sql, params)
        return self.dict_cur.fetchone()

    def fetch_value(self, sql, params=None):
        """Return the first value from the first row of a query."""
        if not self.cur:
            self._get_cursor()
        row = self.fetch_row(sql, params=params)
        return row[0] if row[:1] else None

    def fetch_many(self, sql, params=None):
        """Return result as nested tuples."""
        if not self.cur:
            self._get_cursor()
        self.cur.execute(sql, params)
        return self.cur.fetchall()

    def fetch_many_dict(self, sql, params=None):
        """Return result as nested tuples."""
        if not self.dict_cur:
            self._get_dict_cursor()
        self.dict_cur.execute(sql, params)
        return self.dict_cur.fetchall()
