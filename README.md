# IoT Real-Time Monitoring System

Sistem za prikupljanje, obradu i vizuelizaciju ambijentalnih i hardverskih parametara u realnom vremenu koristeći Raspberry Pi 5, Node.js backend i Next.js dashboard.

---

## Pregled sistema

Ovaj projekat implementira 3-tier IoT arhitekturu:

- Edge sloj: Raspberry Pi 5 + Sense HAT + Python
- Backend sloj: Node.js + Express + MySQL
- Frontend sloj: Next.js + TailwindCSS + Recharts

Sistem prikuplja telemetrijske podatke, obrađuje ih i prikazuje u realnom vremenu.

---

## Arhitektura sistema

### 1. Edge sloj

- Raspberry Pi 5 izvršava Python skriptu
- Sense HAT senzori (temperatura, vlaga, IMU)
- CPU monitoring (temperatura, RAM, load)
- Slanje podataka svakih 10 sekundi

Optimizacija:

- 100 uzoraka → 1 paket
- šalje se maksimalna vibracija u 10s intervalu

---

### 2. Backend sloj

- Node.js + Express API
- automatsko učitavanje ruta iz /routes
- validacija i spremanje u MySQL
- REST API za real-time i historijske podatke

---

### 3. Frontend sloj

- Next.js dashboard
- TailwindCSS UI
- Recharts grafovi
- real-time update bez nepotrebnih fetch poziva

---

## Algoritam vibracija

Formula:
sila = sqrt(dx² + dy² + dz²)

Logika:

- 10Hz sampling
- 10 sekundi interval
- max vrijednost se šalje

Prednosti:

- ~100x manji network traffic
- filtriranje šuma
- detekcija stvarnih vibracija

---

## Hardver

Raspberry Pi 5:

- ARMv8 64-bit
- Python data collection
- system monitoring

Sense HAT:

- temperatura
- vlaga
- 3-axis accelerometer
- I2C / SPI komunikacija

---

## Baza podataka

Tabela: sensor_readings

Polja:

- id (auto increment)
- temperatura
- vlaznost
- sila
- cpu_temp
- cpu_load
- ram_used_gb
- vrijeme_zapisa

---

## API

### POST /post/collect

Sprema podatke u bazu.

Request:
[
{
"senzorData": {
"temperatura": 24.5,
"vlaznost": 48.2,
"sila": 0.0041
},
"statusData": {
"cpu_temp": 42.1,
"load_percent": 12.5,
"ram_used_gb": 2.23
}
}
]

Response:
{
"message": "Data collected successfully!"
}

---

### GET /get/sensor-data/latest

Vraća posljednji zapis.

Primjer:
{
"id": 1420,
"temperatura": 24.5,
"vlaznost": 48.2,
"sila": 0.0041,
"cpu_temp": 42.1,
"cpu_load": 12.5,
"ram_used_gb": 2.23,
"vrijeme_zapisa": "2026-06-22T11:15:00.000Z"
}

---

### GET /get/sensor-data

Vraća historiju podataka.

Query parametri:

- page (default 1)
- limit (default 50)

---

## Frontend komponente

- StatCard.jsx
- ChartCard.jsx
- SystemPerformance.jsx
- HistoryLogTable.jsx

---

## Optimizacije

Heartbeat sistem:

- provjera zadnjeg timestamp-a
- online/offline status indikacija

Client-side caching:

- inicijalno 50 zapisa
- incremental fetchLatest update
- deduplikacija po id
- slice(-50) limit

Rezultat:

- ~95% manje API poziva
- manji load servera i klijenta

---

## Tehnologije

- Raspberry Pi 5
- Python
- Sense HAT
- Node.js
- Express.js
- MySQL
- Next.js
- TailwindCSS
- Recharts

---

## Instalacija

Backend:
cd server
npm install
npm run dev

Frontend:
cd client
npm install
npm run dev

Python sensor:
python3 sensor.py

---

## Namjena

- IoT monitoring
- real-time telemetry
- edge computing edukacija
- industrijski senzori
- dashboard vizualizacija

---
