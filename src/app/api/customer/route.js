import db from "@/database/db";

/* 👉 READ (GET) */
export async function GET() {
  const customers = db.prepare("SELECT * FROM customer").all();
  return Response.json(customers);
}

/* 👉 CREATE (POST) */
export async function POST(request) {
  const body = await request.json();

  const stmt = db.prepare(`
    INSERT INTO customer (company, fullname, phoneno, address, pincode)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(
    body.company,
    body.fullname,
    body.phoneno,
    body.address,
    body.pincode
  );

  return Response.json({ message: "Customer added" });
}

/* 👉 UPDATE (PUT) */
export async function PUT(request) {
  const body = await request.json();

  db.prepare(`
    UPDATE customer
    SET company=?, fullname=?, phoneno=?, address=?, pincode=?
    WHERE id=?
  `).run(
    body.company,
    body.fullname,
    body.phoneno,
    body.address,
    body.pincode,
    body.id
  );

  return Response.json({ message: "Customer updated" });
}

/* 👉 DELETE (DELETE) */
export async function DELETE(request) {
  const body = await request.json();

  db.prepare("DELETE FROM customer WHERE id=?").run(body.id);

  return Response.json({ message: "Customer deleted" });
}
