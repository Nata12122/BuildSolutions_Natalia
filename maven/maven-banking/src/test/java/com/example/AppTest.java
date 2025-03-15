import org.junit.Test;
import static org.junit.Assert.*;
import java.util.Map;

public class AppTest {

    // Prueba para verificar que el archivo transactions.txt se lee correctamente
    @Test
    public void testLeerArchivo() {
        // Asumimos que tenemos una función en tu BankingSystem llamada leerArchivo
        Map<String, Object> transacciones = BankingSystem.leerArchivo("transactions.txt");
        
        // Verificamos que las transacciones no sean nulas y contengan datos
        assertNotNull("El archivo no debe ser nulo", transacciones);
        assertFalse("El archivo no debe estar vacío", transacciones.isEmpty());
    }

    // Prueba para obtener las transacciones de un usuario
    @Test
    public void testObtenerTransacciones() {
        // Asumimos que la función leerArchivo ya ha sido llamada y tenemos un mapa de transacciones
        Map<String, Object> transacciones = BankingSystem.leerArchivo("transactions.txt");

        // Supongamos que queremos obtener las transacciones de "juan.jose@urosario.edu.co"
        List<Map<String, Object>> juanTransacciones = (List<Map<String, Object>>) transacciones.get("juan.jose@urosario.edu.co");

        // Verificamos que las transacciones de Juan no sean nulas y contengan datos
        assertNotNull("Las transacciones de Juan no deben ser nulas", juanTransacciones);
        assertFalse("Las transacciones de Juan no deben estar vacías", juanTransacciones.isEmpty());
        
        // Verificamos que la primera transacción tenga un balance de "50"
        assertEquals("El primer balance de Juan debe ser 50", "50", juanTransacciones.get(0).get("balance"));
    }

    // Prueba para generar el extracto bancario en un archivo de texto
    @Test
    public void testGenerarExtracto() {
        // Simulamos que las transacciones ya han sido leídas
        Map<String, Object> transacciones = BankingSystem.leerArchivo("transactions.txt");
        
        // Suponemos que el usuario es "juan.jose@urosario.edu.co"
        String usuario = "juan.jose@urosario.edu.co";

        // Generamos el extracto bancario para el usuario
        String extracto = BankingSystem.generarExtracto(usuario, transacciones);
        
        // Verificamos que el extracto no sea nulo
        assertNotNull("El extracto no debe ser nulo", extracto);
        
        // Verificamos que el extracto contenga la información esperada
        assertTrue("El extracto debe contener el correo del usuario", extracto.contains(usuario));
        assertTrue("El extracto debe contener una transacción de tipo 'Deposit'", extracto.contains("Deposit"));
    }
}
