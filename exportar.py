import os

# Nombre del archivo de salida
archivo_salida = "referencia_bunker.xml"

# Extensiones que queremos respaldar
extensiones_validas = ['.html', '.css', '.js', '.md', '.yml']

# Carpetas que queremos ignorar (las que genera Jekyll automáticamente)
carpetas_ignoradas = ['.git', '.jekyll-cache', '_site']

def generar_referencia():
    with open(archivo_salida, "w", encoding="utf-8") as f_out:
        f_out.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f_out.write('<bunker_backup>\n')
        
        for raiz, carpetas, archivos in os.walk("."):
            # Filtrar carpetas ignoradas
            carpetas[:] = [c for c in carpetas if c not in carpetas_ignoradas]
            
            for archivo in archivos:
                nombre, ext = os.path.splitext(archivo)
                if ext in extensiones_validas:
                    ruta_completa = os.path.join(raiz, archivo)
                    print(f"Procesando: {ruta_completa}")
                    
                    f_out.write(f'  <archivo ruta="{ruta_completa}">\n')
                    f_out.write('    <contenido><![CDATA[\n')
                    
                    try:
                        with open(ruta_completa, "r", encoding="utf-8") as f_in:
                            f_out.write(f_in.read())
                    except Exception as e:
                        f_out.write(f"Error al leer archivo: {e}")
                        
                    f_out.write('\n    ]]></contenido>\n')
                    f_out.write('  </archivo>\n')
        
        f_out.write('</bunker_backup>\n')

if __name__ == "__main__":
    generar_referencia()
    print(f"\n¡Listo! Todo tu código fuente está en: {archivo_salida}")