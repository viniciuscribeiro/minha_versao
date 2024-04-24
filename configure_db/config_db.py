import sqlite3

# Cria uma conexão com o banco de dados SQLite
conn = sqlite3.connect('database.db')

# Cria um cursor para executar comandos SQL
cursor = conn.cursor()

# Cria uma tabela chamada 'items' com colunas 'id', 'name' e 'description'
cursor.execute('''
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )
''')

# Salva as alterações
conn.commit()

# Fecha a conexão
conn.close()
