import time
import requests
import math

from moduli.temperatura import procitaj_temperaturu
from moduli.vlaznost import procitaj_vlaznost
from moduli.vibracije import procitaj_vibracije 
from moduli.status import procitaj_status

SERVER_URL = "http://192.168.0.101:4000/post/collect"  

def posalji_podatke(temp, vlaga, maksimalna_sila):
    cpu_temp, load_percent, ram_used_gb = procitaj_status()

    payload = [
        {
            "senzorData": {
                "temperatura": temp,
                "vlaznost": vlaga,
                "sila": maksimalna_sila 
            },
            "statusData": {
                "cpu_temp": cpu_temp,
                "load_percent": load_percent,
                "ram_used_gb": ram_used_gb
            },
        }
    ]
    
    print(f"[INFO] Slanje podataka (Maksimalna sila u 10s: {maksimalna_sila}): {payload}")
    
    try:
        headers = {'Content-Type': 'application/json'}
        response = requests.post(SERVER_URL, json=payload, headers=headers, timeout=5)
        if response.status_code in [200, 201]:
            print("[USPJEH] Podaci uspješno poslati na server.")
        else:
            print(f"[GREŠKA] Server je vratio status kod: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"[KRITIČNO] Nije moguće uspostaviti vezu sa serverom: {e}")

if __name__ == "__main__":
    print("[START] Pokretanje monitoringa vibracija...")
    
    prethodne_vibracije = procitaj_vibracije()
    max_sila_u_intervalu = 0.0
    
    interval_slanja = 10  # sekunde
    vrijeme_zadnjeg_slanja = time.time()
    
    interval_uzorkovanja = 0.1  

    while True:
        trenutno_vrijeme = time.time()
        
        trenutne_vibracije = procitaj_vibracije()
        
        if trenutne_vibracije and prethodne_vibracije:
            dx = trenutne_vibracije['x'] - prethodne_vibracije['x']
            dy = trenutne_vibracije['y'] - prethodne_vibracije['y']
            dz = trenutne_vibracije['z'] - prethodne_vibracije['z']
            
            trenutna_sila = round(math.sqrt(dx**2 + dy**2 + dz**2), 4)
            
            if trenutna_sila > max_sila_u_intervalu:
                max_sila_u_intervalu = trenutna_sila

        if trenutne_vibracije:
            prethodne_vibracije = trenutne_vibracije

        if trenutno_vrijeme - vrijeme_zadnjeg_slanja >= interval_slanja:
            temp = procitaj_temperaturu()
            vlaga = procitaj_vlaznost()
            
            posalji_podatke(temp, vlaga, max_sila_u_intervalu)
            
            max_sila_u_intervalu = 0.0
            vrijeme_zadnjeg_slanja = trenutno_vrijeme
            
        time.sleep(interval_uzorkovanja)