from sense_hat import SenseHat

def procitaj_temperaturu():
    try:
        sense = SenseHat()
        temp = sense.get_temperature()
        return round(temp, 2)
    except Exception as e:
        print(f"Greška pri čitanju temperature: {e}")
        return None