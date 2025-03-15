const fs = require('fs');

// Función para leer el archivo transactions.txt
function leerArchivo() {
    // TODO: Implementar la lógica para leer el archivo transactions.txt.
    // Devuelve el contenido del archivo en formato JSON.
    return {}; // Completar la lógica
}

// Función para escribir el archivo transactions.txt
function escribirArchivo(data) {
    // TODO: Implementar la lógica para escribir los datos de vuelta en el archivo transactions.txt.
    // Los datos deben guardarse en formato JSON.
    // Completar la lógica
}

// Función para calcular el saldo actual de un usuario, basado en sus transacciones
function calcularSaldo(usuario) {
    // TODO: Implementar la lógica para calcular el saldo del usuario.
    // El saldo se calcula sumando los depósitos y restando los retiros.
    let saldo = 0;
    return saldo; // Completar la lógica
}

// Función para realizar la transferencia entre cuentas
function transferir(de, para, monto) {
    // TODO: Implementar la lógica para realizar la transferencia entre dos cuentas.
    // Verificar que el saldo de la cuenta de origen sea suficiente.
    // Restar el monto de la cuenta de origen y sumarlo a la cuenta de destino.
    // Actualizar el archivo transactions.txt.
    return {
        exito: true, 
        mensaje: `Transferencia de ${monto} realizada correctamente de ${de} a ${para}.`
    }; // Completar la lógica
}

const resultado = transferir('juan.jose@urosario.edu.co', 'sara.palaciosc@urosario.edu.co', 50);
console.log(resultado.mensaje);

// Exportar las funciones para pruebas
module.exports = { transferir };