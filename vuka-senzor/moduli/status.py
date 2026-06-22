import psutil

def procitaj_status():
    try:
        with open("/sys/class/thermal/thermal_zone0/temp", "r") as f:
            cpu_temp = round(float(f.read()) / 1000.0, 2)
            
        load_percent = psutil.cpu_percent(interval=None)
        
        ram = psutil.virtual_memory()
        ram_used_gb = round(ram.used / (1024 ** 3), 2)
        
        return cpu_temp, load_percent, ram_used_gb
    except Exception as e:
        print(f"Greška pri čitanju statusa sistema: {e}")
        return None, None, None