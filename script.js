document.getElementById('convert').addEventListener('click', function() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const url = `https://v6.exchangerate-api.com/v6/bc263773d16e10efec9cb05c/latest/${fromCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const rate = data.conversion_rates[toCurrency];
                const result = amount * rate;
                document.getElementById('result').innerText = result.toFixed(2);
            } else {
                throw new Error(data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка получения данных:', error);
            document.getElementById('result').innerText = 'Ошибка';
        });
});

// Функция для обновления изображения валюты при изменении выбранной валюты
function updateCurrencyImage(currency, imgId) {
    const img = document.getElementById(imgId);
    switch (currency) {
        case 'USD':
            img.src = 'dol.png';
            break;
        case 'EUR':
            img.src = 'euro.jpg';
            break;
        case 'UAH':
            img.src = 'uah.jpg';
            break;
        default:
            break;
    }
}

// Обработчики событий для обновления изображений валют при изменении выбранных валют
document.getElementById('fromCurrency').addEventListener('change', function() {
    const selectedCurrency = this.value;
    updateCurrencyImage(selectedCurrency, 'fromCurrencyImg');
});

document.getElementById('toCurrency').addEventListener('change', function() {
    const selectedCurrency = this.value;
    updateCurrencyImage(selectedCurrency, 'toCurrencyImg');
});

// Инициализация изображений валют при загрузке страницы
const defaultFromCurrency = document.getElementById('fromCurrency').value;
const defaultToCurrency = document.getElementById('toCurrency').value;

updateCurrencyImage(defaultFromCurrency, 'fromCurrencyImg');
updateCurrencyImage(defaultToCurrency, 'toCurrencyImg');
