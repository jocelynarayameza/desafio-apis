//OBTENER DATOS DE LA API

async function obtenerDolar() {
    try {
        const res = await fetch("https://mindicador.cl/api/")
        const data = await res.json();
        const dolar = data.dolar.valor;
        return dolar
    } catch (error) {
        console.error("Error al obtener datos de Dolar")
    }
}

async function obtenerEuro() {
    try {
        const res = await fetch("https://mindicador.cl/api/")
        const data = await res.json();
        const euro = data.euro.valor;
        return euro
    } catch (error) {
        console.error("Error al obtener datos de Euro")
    }
}

//OBTENER FECHAS
async function obtenerFechasValorDolar() {
    try {
        const res = await fetch("https://mindicador.cl/api/dolar")
        const data = await res.json();
        const serieDolar = data.serie
        const fechaDolar = serieDolar.map((fechaMap) => {
            return fechaMap.fecha
        })
        const valorDolar = serieDolar.map((valorMap) => {
            return valorMap.valor
        })
        return { fechaDolar, valorDolar }
    } catch (error) {
        console.error("Error al obtener las fechas")
    }
}

async function obtenerFechasValorEuro() {
    try {
        const res = await fetch("https://mindicador.cl/api/euro")
        const data = await res.json();
        const serieEuro = data.serie
        const fechaEuro = serieEuro.map((fechaMap) => {
            return fechaMap.fecha
        })
        const valorEuro = serieEuro.map((valorMap) => {
            return valorMap.valor
        })
        return { fechaEuro, valorEuro }
    } catch (error) {
        console.error("Error al obtener las fechas")
    }
}



async function buscar() {
    //Obtener valores
    const valorDolar = await obtenerDolar();
    const valorEuro = await obtenerEuro();
    //Elementos del DOM
    const numeroIngresado = document.getElementById("numeroIngresado")
    const resultado = document.getElementById("resultado")
    const opcionMoneda = document.getElementById("moneda")

    if (opcionMoneda.value == "dolar") {
        let conversionDolar = numeroIngresado.value / valorDolar
        let dolarDosDecimales = conversionDolar.toFixed(2)
        resultado.innerHTML = dolarDosDecimales + " " + "USD"
        renderGrafica("dolar");
    } else if (opcionMoneda.value == "euro") {
        let conversionEuro = numeroIngresado.value / valorEuro
        let euroDosDecimales = conversionEuro.toFixed(2)
        resultado.innerHTML = euroDosDecimales + " " + "EUR"
        renderGrafica("euro");
    }
}

async function configGraficaDolar() {
    try {
        const resultado = await obtenerFechasValorDolar();
        const fechaDolar = resultado.fechaDolar;
        const valorDolar = resultado.valorDolar;

        const config = {
            type: 'line',
            data: {
                labels: fechaDolar,
                datasets: [{
                    label: "Valor Dólar último mes",
                    backgroundColor: "red",
                    data: valorDolar
                }]
            }
        }
        return config;

    } catch (error) {
        console.error(error, "error al graficar dólar");
    }

}

async function configGraficaEuro() {
    try {
        const resultado = await obtenerFechasValorEuro();
        const fechaEuro = resultado.fechaEuro;
        const valorEuro = resultado.valorEuro;

        const config = {
            type: 'line',
            data: {
                labels: fechaEuro,
                datasets: [{
                    label: "Valor Euro último mes",
                    backgroundColor: "red",
                    data: valorEuro
                }]
            }
        }
        return config;
    } catch (error) {
        console.error(error, "error al graficar euro");
    }

}

let chartInstance
async function renderGrafica(type) {
    try {
        let config;
        if (type === 'dolar') {
            config = await configGraficaDolar();
        } else if (type === 'euro') {
            config = await configGraficaEuro();
        } else {
            throw new Error('Invalid type');
        }

        const chartDOM = document.getElementById("chart");
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
        chartInstance = new Chart(chartDOM, config);
    } catch (error) {
        console.error(error, "error al renderizar");
    }

}









