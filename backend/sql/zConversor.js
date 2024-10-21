function decimalParaHorasMinutos(decimal) {
    // Parte inteira do número é a hora
    let horas = Math.floor(decimal);

    // Parte decimal multiplicada por 60 para obter os minutos
    let minutos = Math.round((decimal - horas) * 60);

    // Retorna um objeto com 'h' para horas e 'm' para minutos
    return { h: horas, m: minutos };
}
let resultado = decimalParaHorasMinutos(11.8889);
console.log(resultado); // Saída: { h: 11, m: 53 }


function minutosParaHorasMinutos(decimalMinutos) {
    // Parte inteira da divisão por 60 dá as horas
    let horas = Math.floor(decimalMinutos / 60);

    // O resto da divisão por 60 dá os minutos
    let minutos = Math.round(decimalMinutos % 60);

    // Retorna um objeto com 'h' para horas e 'm' para minutos
    return { h: horas, m: minutos };
}
let resultado2 = minutosParaHorasMinutos(134.5);
console.log(resultado2); // Saída: { h: 2, m: 15 }