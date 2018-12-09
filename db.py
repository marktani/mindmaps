import sqlite3
import os

dir_path = os.path.dirname(os.path.abspath(__file__))


class DB:
    def _get_conn(self):
        return sqlite3.connect(os.path.join(dir_path, './store.db'))

    def addWord(self, value, language):
        conn = self._get_conn()

        c = conn.cursor()
        c.execute("INSERT INTO Word (value, language) VALUES(?, ?)", (value, language))
        conn.commit()
        id = c.lastrowid

        conn.close()

        return id

    def addPair(self, aId, bId):
        conn = self._get_conn()

        c = conn.cursor()
        c.execute("INSERT INTO _Pair (aId, bId) VALUES(?, ?)", (aId, bId))

        conn.commit()
        id = c.lastrowid

        conn.close()

        return id
