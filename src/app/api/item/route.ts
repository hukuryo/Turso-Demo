import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://test.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function initializeDb() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

initializeDb();

export async function GET() {
  try {
    const result = await client.execute("SELECT * FROM items ORDER BY id DESC");
    return Response.json(result.rows);
  } catch (error) {
    console.error("Error fetching items:", error);
    return Response.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    await client.execute({
      sql: "INSERT INTO items (name) VALUES (?)",
      args: [name],
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error adding item:", error);
    return Response.json({ error: "Failed to add item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    await client.execute({
      sql: "DELETE FROM items WHERE id = ?",
      args: [id],
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting item:", error);
    return Response.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
