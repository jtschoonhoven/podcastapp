from .db import DB


class Table(object):
    """
    Manage a postgres table as a class in the style of a light ORM.
    Common actions are precreated. Feel free to override in child class.
    Execute arbitrary SQL with the raw psycopg cursor in Table.db.cur.

     @method find_many() > return multiple rows as list of dicts.
     @method find_one() > return one row as dict.
     @method find_value() > return one column from one row as value.
     @method save_one() > insert a single row from dict.
     @method update_or_create() > update row if already exists, else insert.
     @method find_or_create() > create row if not exists, regardless return row.
    """

    def __init__(self, columns=None, tablename=None, schema=None, id_col=None, unique_col_list=None):
        self.columns = columns
        self.tablename = tablename
        self.schema = schema
        self.id = id_col
        self.unique_col_list = unique_col_list or [id_col]
        self.db = None

    def _connect_db(self):
        self.db = DB()

    def _sequelize_value(self, val, blacklist=('DEFAULT',)):
        """Escape and quote a single value for use in SQL expression."""
        if not self.db:
            self._connect_db()
        if val in blacklist:
            return val
        else:
            return self.db.cur.mogrify('%s', (val,))

    def _sequelize_values(self, values_list, parens=False):
        """Escape, quote, and comma-delimit values for use in SQL expression (returns str)."""
        sequelized_list = [self._sequelize_values(x) for x in values_list]
        sequelized_str = ', '.join(sequelized_list)
        return sequelized_str if not parens else "({})".format(sequelized_str)

    def _sequelize_colnames(self, colnames_list, parens=False):
        colnames = ', '.join(colnames_list)
        return colnames if not parens else "({})".format(colnames)

    def _sequelize_conditionals(self, where):
        """Accept a dict of column names and values to match, returns WHERE/AND clause as str."""
        if not where:
            return ''
        conditional_str = 'WHERE '
        conditional_list = []

        for colname, val in where.iteritems():
            match = self._sequelize_values(val)
            operator = 'IS' if isinstance(val, bool) or val is None else '='
            conditional = "{col} {op} {match}".format(col=colname, op=operator, match=match)
            conditional_list.append(conditional)

        conditional_str = '\nWHERE ' + '\nAND '.join(conditional_list)
        return conditional_str

    def find_many(self, where=None, limit=None):
        """
        Return one row from table as dict.
         @param {dict} where: {colname: match_value} pairs
         @return {list of dicts}
        """
        if not self.db:
            self._connect_db()
        conditionals = self._sequelize_conditionals(where)
        limit = '\nLIMIT {}'.format(limit) if limit else ''

        sql_args = {'schema': self.schema, 'table': self.table, 'conditionals': conditionals, 'n': limit}
        sql = "SELECT * FROM {schema}.{table}{conditionals}{n}".format(**sql_args)
        return self.db.fetch_many_dict(sql)

    def find_one(self, id_val=None, where=None):
        """
        Return one row from table as dict.
         @param {str | int} id_val
         @param {dict} where: {colname: match_value} pairs
         @return {dict}
        """
        if id_val and where:
            raise ValueError('Table.find_where called with multiple kwargs.')
        elif not id_val and not where:
            raise ValueError('Table.find_where called with no kwargs.')

        match = {self.id: id_val} if id_val else where
        return self.find_many(where=match, limit=1)

    def find_value(self, colname, where=None):
        """
        Return a single value from given colname.
         @param {str} colname: return val from this col
         @param {dict} where: {colname: match_value} pairs
         @return {value}
        """
        if not self.db:
            self._connect_db()
        if not colname and not where:
            raise ValueError('Table.find_value called without all kwargs.')

        row = self.find_one(where=where)
        return row[0] if row else None

    def save(self, values):
        """
        Insert one row. If values is list/tuple, insert positionally. If dict, use key as colname.
        If values list/tuple of nested objects, each element will be assumed to be a row to insert.
         @param {list | dict | tuple | nested list | nested tuple} values:
        """
        if not self.db:
            self._connect_db()

        _is_listlike = lambda x: isinstance(x, list) or isinstance(x, tuple)
        _is_datastructure = lambda x: _is_listlike(x) or isinstance(x, dict)

        # Method accepts several types. Convert to nested list, regardless of input.
        if isinstance(values, dict):
            columns = values.keys()
            values = [[values[x] for x in columns]]  # Convert to nested.

        elif _is_listlike(values):
            columns = self.columns

            # No elements of list are structures, list is not nested (i.e. inserting single row).
            if not any(values, _is_datastructure):
                values = [values]  # Convert to nested.

            # If no elements aren't structures, all must be or raise.
            if not all(values, _is_datastructure):
                raise ValueError('Found mix of values and datastructures in Table.save.')
        else:
            raise ValueError('Invalid type in Table.save. Must be list, tuple, or dict.')

        sql_args = {
            'schema': self.schema,
            'table': self.table,
            'cols': self._sequelize_colnames(self.columns),
            'vals': ',\n'.join([self._sequelize_values(x, parens=True) for x in values])
        }
        sql = "INSERT INTO {schema}.{table} ({cols})\nVALUES {vals}".format(**sql_args)
        self.db.cur.execute(sql)
        self.db.cur.commit()
