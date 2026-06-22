from sense_hat import SenseHat

def procitaj_vlaznost():
    try:
        sense = SenseHat()
        vlaznost = sense.get_humidity()
        return round(vlaznost, 2)
    except Exception as e:
        print(f"Greška pri čitanju vlažnosti: {e}")
        return None