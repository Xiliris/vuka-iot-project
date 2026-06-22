from sense_hat import SenseHat

sense = SenseHat()

def procitaj_vibracije():
    try:
        ubrzanje = sense.get_accelerometer_raw()
        x = round(ubrzanje['x'], 4)
        y = round(ubrzanje['y'], 4)
        z = round(ubrzanje['z'], 4)
        return {"x": x, "y": y, "z": z}
    except Exception as e:
        print(f"Greška pri čitanju vibracija: {e}")
        return None