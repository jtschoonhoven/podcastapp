from .db import DB


class Table(object):

    def __init__(self, columns_list=None, tablename=None, schema=None, id_col=None, unique_col_list=None):
        self.columns_list = columns_list
        self.columns_str = ', '.join(columns_list)
        self.tablename = tablename
        self.schema = schema
        self.id = id_col
        self.unique_col_list = unique_col_list or [id_col]
        self.db = None

    def _connect_db(self):
        self.db = DB()

    def _sequelize_values(self, values_list):
        """Escape and quote values for use in SQL expressions."""
        single_value = False

        if not isinstance(values_list, list):
            values_list = [values_list]
            single_value = True

        for i, val in enumerate(values_list):
            if val == 'DEFAULT':
                continue
            if val is None:
                values_list[i] = 'NULL'
                continue
            if isinstance(val, bool):
                values_list[i] = "{}".format(str(val).upper())
                continue
            try:
                int(val)
                values_list[i] = str(val)
            except ValueError:
                val = val.encode("utf-8").replace("'", "''")
                values_list[i] = "'{}'".format(val)

        return values_list[0] if single_value else values_list

    def _prepare_conditionals(self, colnames_values_dict):
        """Accept a dict of column names and values to match, returns WHERE/AND clause as str."""
        conditional_str = 'WHERE '
        conditional_list = []

        for colname, val in colnames_values_dict.iteritems():
            match = self._sequelize_values(val)
            operator = 'IS' if isinstance(val, bool) or val is None else '='
            conditional = "{col} {op} {match}".format(col=colname, op=operator, match=match)
            conditional_list.append(conditional)

        conditional_str = 'WHERE ' + '\nAND '.join(conditional_list)
        return conditional_str

    def find_where(self, id_val=None, columns_values_dict=None):
        """Return a row by matching a single id or a dict of {colname: value} pairs. None if not matched."""
        if not self.db:
            self._connect_db()

        if id_val and columns_values_dict:
            raise ValueError('Table.find_where called with multiple kwargs.')

        elif id_val:
            conditionals = self._prepare_conditionals({self.id, id_val})

        elif columns_values_dict:
            conditionals = self._prepare_conditionals(columns_values_dict)

        else:
            raise ValueError('Table.find_where called with no kwargs.')

        sql_args = {'schema': self.schema, 'table': self.table, 'conditionals': conditionals}
        sql = "SELECT * FROM {schema}.{table} {conditionals} LIMIT 1".format(**sql_args)
        return self.db.fetch_row_dict(sql)

    def create(self, values_list=None, column_values_dict=None):
        """Add a row by passing positional column values or a dict of {colname: value} pairs."""
        if not self.db:
            self._connect_db()

        if values_list and column_values_dict:
            raise ValueError('Table.create called with multiple kwargs.')

        if values_list:
            'TODO'

    def find_or_create(self, columns_values_dict=None):
        """Add a row to this table if it doesn't already exist. Either way, return attributes."""
        sanitized_values = self._sequelize_values(values_list)
        values_str = ', '.join(sanitized_values)

        sql_args = {
            'schema': self.schema,
            'table': self.tablename,
        }

        sql = """
            INSERT INTO {schema}.{table} ({columns})
            SELECT {values}
            WHERE NOT EXISTS (SELECT 1 FROM {schema}.{table} WHERE {key} = {match})
            RETURNING *
        """.format()
