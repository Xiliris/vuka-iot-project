const database = require("../../database/sql-database");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    for (const data of req.body) {
      await saveData(data);
    }
    res.json({ message: "Data collected successfully!" });
  } catch (error) {
    console.error("Greška pri upisu u bazu:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

async function saveData(data) {
  const { senzorData, statusData } = data;

  const { temperatura, vlaznost, sila } = senzorData;
  const { cpu_temp, load_percent, ram_used_gb } = statusData;

  const sensorQuery = `
    INSERT INTO sensor_readings (temperatura, vlaznost, sila, cpu_temp, cpu_load, ram_used_gb)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const sensorValues = [
    temperatura,
    vlaznost,
    sila,
    cpu_temp,
    load_percent,
    ram_used_gb,
  ];

  const [sensorResult] = await database.execute(sensorQuery, sensorValues);
  const readingId = sensorResult.insertId;
}

module.exports = router;
