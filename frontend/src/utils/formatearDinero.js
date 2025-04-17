export const formatearDinero = (numero, moneda = 'COP') => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: moneda,
        maximumFractionDigits: 0,
    }).format(numero)
};