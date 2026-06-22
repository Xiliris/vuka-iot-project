const database = require("../../database/sql-database");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const selectQuery = `
      SELECT id, temperatura, vlaznost, sila, cpu_temp, cpu_load, ram_used_gb, vrijeme_zapisa
      FROM sensor_readings 
      ORDER BY id DESC 
      LIMIT ? OFFSET ?
    `;

    const [rows] = await database.execute(selectQuery, [limit, offset]);

    const [countResult] = await database.execute(
      "SELECT COUNT(*) as total FROM sensor_readings",
    );
    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    res.json({
      data: rows,
      pagination: {
        currentPage: page,
        perPage: limit,
        totalRecords: totalRecords,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error("Greška pri dohvaćanju iz baze:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;
