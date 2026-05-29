import "./load-env.mjs";
import db from "../db/db_config.js";

try {
  const [ping] = await db.execute("SELECT 1 as ok");
  console.log("db ok:", ping);

  const [ins] = await db.execute(
    "INSERT INTO conversations (role, content, token_count) VALUES (?,?,?)",
    ["user", "db-smoke-test", 0],
  );
  console.log("insert ok:", ins.insertId);

  const [rows] = await db.execute(
    "SELECT id, role, content, token_count, created_at FROM conversations ORDER BY id DESC LIMIT 3",
  );
  console.log("latest rows:", rows);
} catch (e) {
  console.error("DB ERROR:", {
    code: e?.code,
    errno: e?.errno,
    message: e?.sqlMessage || e?.message,
  });
  process.exitCode = 1;
} finally {
  await db.end();
}

