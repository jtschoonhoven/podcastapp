import unittest
from collections import namedtuple
from ..table_base import Table


def get_instance(columns_list=None, id_col=None, unique_col_list=None):
    table_args = {
        'columns_list': columns_list or ['id', 'name', 'desc'],
        'tablename': 'test_table',
        'schema': 'test',
        'id_col': id_col or 'id',
        'unique_col_list': unique_col_list or None
    }
    table = Table(**table_args)
    table._connect_db = lambda: None
    return table


class TableBaseTest(unittest.TestCase):

    def sequelize_values_test(self):
        """
        Strings are wrapped in single quotes, ints not wrapped,
        special values handled appropriately.
        """
        table = get_instance()
        input_output_dict = {
            'str': "'str'",
            42: '42',
            '42': '42',
            None: 'NULL',
            'DEFAULT': 'DEFAULT',
            True: 'TRUE',
            False: 'FALSE'
        }

        input_list = input_output_dict.keys()
        output_list = [input_output_dict[x] for x in input_list]
        sequelized_list = [table._sequelize_values(x) for x in input_list]

        assert output_list == sequelized_list
        for inp, out in input_output_dict.iteritems():
            assert out == table._sequelize_values(inp)

    def prepare_conditionals_test(self):
        """Create a WHERE/AND string."""
        table = get_instance()
        TestCase = namedtuple('InputOutput', ['inp', 'out'])
        testcases = [
            TestCase({'id': 1}, 'WHERE id = 1'),
            TestCase({'name': 'test'}, "WHERE name = 'test'"),
            TestCase({'yes': True}, "WHERE yes IS TRUE"),
        ]

        multitest = TestCase({'id': 1, 'name': 'test', 'yes': True}, "WHERE id = 1\nAND name = 'test'\nAND yes IS TRUE")
        multiprep = table._prepare_conditionals(multitest.inp)

        assert multiprep.startswith('WHERE')
        assert len(multiprep.split('AND')) == 3
        assert 'id = 1' in multiprep
        assert "name = 'test'" in multiprep
        assert "yes IS TRUE" in multiprep

        for case in testcases:
            print case.out
            print table._prepare_conditionals(case.inp)
            assert case.out == table._prepare_conditionals(case.inp)
