const { transferir, leerArchivo, escribirArchivo, calcularSaldo } = require('../src/app');
const fs = require('fs');

jest.mock('fs'); // Para simular la lectura y escritura en el sistema de archivos

// Configurar Jest antes de cada prueba
beforeEach(() => {
    // Simula el archivo con un conjunto de datos de ejemplo
    fs.readFileSync.mockReturnValueOnce(JSON.stringify({
        "juan.jose@urosario.edu.co": [
            { "balance": "50", "type": "Deposit", "timestamp": "2025-02-11 14:17:21.921536" }
        ],
        "sara.palaciosc@urosario.edu.co": [
            { "balance": "400", "type": "Deposit", "timestamp": "2025-03-13 17:41:06.330219" }
        ]
    }));
});

test('Transferencia entre cuentas', () => {
    const resultado = transferir('juan.jose@urosario.edu.co', 'sara.palaciosc@urosario.edu.co', 30);
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toBe('Transferencia de 30 realizada correctamente de juan.jose@urosario.edu.co a sara.palaciosc@urosario.edu.co.');
});

test('Transferencia con saldo insuficiente', () => {
    const resultado = transferir('juan.jose@urosario.edu.co', 'sara.palaciosc@urosario.edu.co', 1000);
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe('Saldo insuficiente en la cuenta de juan.jose@urosario.edu.co.');
});

test('Calcular saldo de usuario', () => {
    const saldoJuan = calcularSaldo('juan.jose@urosario.edu.co');
    expect(saldoJuan).toBe(50);
});

test('Escribir archivo correctamente', () => {
    escribirArchivo({ "juan.jose@urosario.edu.co": [] });
    expect(fs.writeFileSync).toHaveBeenCalled();
});
