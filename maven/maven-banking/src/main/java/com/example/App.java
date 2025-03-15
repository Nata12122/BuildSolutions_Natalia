import java.io.*;
import java.nio.file.*;
import java.util.*;
import org.json.*;

public class AppTest {

    public static void main(String[] args) {
        // Ruta al archivo transactions.txt
        String archivo = "transactions.txt";

        // Leer el archivo JSON
        String contenido = leerArchivo(archivo);
        
        if (contenido == null) {
            System.out.println("No se pudo leer el archivo.");
            return;
        }

        // Convertir el contenido del archivo a un objeto JSON
        JSONObject json = new JSONObject(contenido);

        // Solicitar al usuario el correo electrónico
        Scanner scanner = new Scanner(System.in);
        System.out.print("Ingresa tu correo electrónico: ");
        String correo = scanner.nextLine();

        // Verificar si el correo existe en el JSON
        if (json.has(correo)) {
            // Extraer las transacciones del usuario
            JSONArray transacciones = json.getJSONArray(correo);
            // Generar el extracto bancario
            String extracto = generarExtracto(correo, transacciones);
            // Escribir el extracto a un archivo
            escribirExtracto(correo, extracto);
        } else {
            System.out.println("Correo no encontrado.");
        }
    }

    // Función para leer el archivo
    public static String leerArchivo(String archivo) {
        try {
            return new String(Files.readAllBytes(Paths.get(archivo)));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Función para generar el extracto bancario
    public static String generarExtracto(String correo, JSONArray transacciones) {
        StringBuilder extracto = new StringBuilder();
        extracto.append("Extracto Bancario para: ").append(correo).append("\n");
        double saldo = 0;

        for (int i = 0; i < transacciones.length(); i++) {
            JSONObject transaccion = transacciones.getJSONObject(i);
            String tipo = transaccion.getString("type");
            double balance = transaccion.getDouble("balance");
            String timestamp = transaccion.getString("timestamp");
            
            saldo += balance;

            extracto.append(String.format("Fecha: %s, Tipo: %s, Monto: %.2f, Saldo Actual: %.2f\n", 
                timestamp, tipo, balance, saldo));
        }

        return extracto.toString();
    }

    // Función para escribir el extracto en un archivo de texto
    public static void escribirExtracto(String correo, String extracto) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(correo + "_extracto.txt"))) {
            writer.write(extracto);
            System.out.println("El extracto ha sido guardado en " + correo + "_extracto.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
