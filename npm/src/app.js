const fs = require('fs');
const archivo = 'transactions.txt';

// Función para leer el archivo transactions.txt
function leerArchivo() {
    try {
        const data = fs.readFileSync(archivo, 'utf-8');
        return JSON.parse(data); // Devuelve el contenido del archivo en formato JSON
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return {};
    }
}

// Función para escribir en el archivo transactions.txt
function escribirArchivo(data) {
    try {
        fs.writeFileSync(archivo, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error al escribir en el archivo:", error);
    }
}

// Función para calcular el saldo actual de un usuario basado en sus transacciones
function calcularSaldo(usuario) {
    const transacciones = leerArchivo();
    let saldo = 0;

    if (transacciones[usuario]) {
        transacciones[usuario].forEach(transaccion => {
            saldo += parseFloat(transaccion.balance);
        });
    }
    return saldo;
}

// Función para realizar la transferencia entre dos cuentas
function transferir(de, para, monto) {
    const transacciones = leerArchivo();

    const saldoDe = calcularSaldo(de);
    if (saldoDe < monto) {
        return {
            exito: false,
            mensaje: `Saldo insuficiente en la cuenta de ${de}.`
        };
    }

    // Actualizar transacciones de ambas cuentas
    if (!transacciones[de]) transacciones[de] = [];
    if (!transacciones[para]) transacciones[para] = [];

    // Realizar la transferencia (restar del de y sumar al para)
    transacciones[de].push({
        balance: `-${monto}`,
        type: 'Withdrawal',
        timestamp: new Date().toISOString()
    });

    transacciones[para].push({
        balance: `${monto}`,
        type: 'Deposit',
        timestamp: new Date().toISOString()
    });

    // Guardar los datos actualizados en el archivo
    escribirArchivo(transacciones);

    return {
        exito: true,
        mensaje: `Transferencia de ${monto} realizada correctamente de ${de} a ${para}.`
    };
}

// Exportar las funciones para pruebas
module.exports = { transferir, leerArchivo, escribirArchivo, calcularSaldo };
