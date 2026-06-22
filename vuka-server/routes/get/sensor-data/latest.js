const database = require("../../../database/sql-database");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const latestQuery = `
      SELECT id, temperatura, vlaznost, sila, cpu_temp, cpu_load, ram_used_gb, vrijeme_zapisa
      FROM sensor_readings 
      ORDER BY id DESC 
      LIMIT 1
    `;

    const [rows] = await database.execute(latestQuery);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nema pronađenih zapisa u bazi." });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Greška pri dohvaćanju zadnjeg zapisa:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
