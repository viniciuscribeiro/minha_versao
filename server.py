from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Form

# Define o modelo de dados para o item
class Item(BaseModel):
    name: str
    description: str = None

# Cria uma conexão com o banco de dados SQLite
conn = sqlite3.connect('database.db')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# Inicializa o aplicativo FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],   
)

@app.post("/items/")
async def create_item(name: str = Form(...), description: str = Form(None)):
    cursor.execute('''
        INSERT INTO items (name, description)
        VALUES (?, ?)
    ''', (name, description))
    conn.commit()
    return {"message": "Item created successfully"}


# Operação de leitura (READ)
@app.get("/items/")
async def read_items():
    cursor.execute('SELECT * FROM items')
    items = cursor.fetchall()
    return items

# Operação de atualização (UPDATE)
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    cursor.execute('''
        UPDATE items
        SET name = ?, description = ?
        WHERE id = ?
    ''', (item.name, item.description, item_id))
    conn.commit()
    return {"message": f"Item with id {item_id} updated successfully"}

# Operação de exclusão (DELETE)
@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    cursor.execute('DELETE FROM items WHERE id = ?', (item_id,))
    conn.commit()
    return {"message": f"Item with id {item_id} deleted successfully"}

from fastapi.responses import HTMLResponse

# HTML para a página inicial
index_html = """
<!DOCTYPE html>
<html>
<head>
    <title>CRUD PI NATAÇÃO</title>
</head>
<body>
    <h1>CRUD PI NATAÇÃO</h1>
    <h2>Criar Item</h2>
    <form action="/items/" method="post">
        <label>Nome:</label><br>
        <input type="text" name="name"><br>
        <label>Descrição:</label><br>
        <input type="text" name="description"><br><br>
        <button type="submit">Create</button>
    </form>
    <h2>Items</h2>
    <ul>
        %s
    </ul>
</body>
</html>
"""
# Página inicial
@app.get("/", response_class=HTMLResponse)
async def read_root():
    # Consulta todos os itens do banco de dados
    cursor.execute('SELECT * FROM items')
    items = cursor.fetchall()
    # Renderiza a lista de itens na página inicial
    item_list_html = ""
    for item in items:
        item_list_html += f"<li>{item['id']}: {item['name']} - {item['description']}</li>"
    return index_html % item_list_html


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)