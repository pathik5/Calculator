document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('calculator-screen');
    const historyList = document.getElementById('history-list');
    const fullEquationPanel = document.getElementById('full-equation-panel');
    const historyPanel = document.getElementById('history-panel');
    const historyIcon = document.getElementById('history-icon');
    const closeHistoryBtn = document.getElementById('close-history-btn');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const helloKittySound = document.getElementById('hello-kitty-sound');

    let currentCalculation = '';
    let currentEquation = '';

    // Function to update screen with button clicks
    function updateScreen(value) {
        screen.value += value;
        currentCalculation += value;
    }

    // Event listeners for calculator buttons
    document.querySelectorAll('.calculator-keys button').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.value;
            if (value === 'all-clear') {
                clearAll();
            } else if (value === '=') {
                calculateResult();
            } else {
                updateScreen(value);
            }
        });
    });

    // Function to clear calculator screen and current calculation
    function clearAll() {
        screen.value = '';
        currentCalculation = '';
        currentEquation = '';
    }

    // Function to calculate the result and store it in history
    function calculateResult() {
        try {
            const result = eval(currentCalculation);
            screen.value = result;
            addToHistory(currentEquation + ' = ' + result);
            currentCalculation = result.toString();
        } catch (error) {
            screen.value = 'Error';
            currentCalculation = '';
        }
    }

    // Function to add the equation to history
    function addToHistory(equation) {
        const listItem = document.createElement('li');
        listItem.textContent = equation;
        historyList.appendChild(listItem);
    }

    // Event listener to show history panel
    historyIcon.addEventListener('click', function() {
        showHistoryPanel();
    });

    // Event listener to hide history panel
    closeHistoryBtn.addEventListener('click', function() {
        hideHistoryPanel();
    });

    // Event listener to clear history
    clearHistoryBtn.addEventListener('click', function() {
        clearHistory();
    });

    // Function to show history panel
    function showHistoryPanel() {
        historyPanel.classList.add('open');
        populateHistoryList();
    }

    // Function to hide history panel
    function hideHistoryPanel() {
        historyPanel.classList.remove('open');
    }

    // Function to clear history list
    function clearHistory() {
        historyList.innerHTML = '';
    }

    // Function to populate history list
    function populateHistoryList() {
        historyList.innerHTML = '';
        const historyItems = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
        historyItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.equation + ' = ' + item.result;
            historyList.appendChild(listItem);
        });
    }

    // Function to save equation and result to localStorage
    function saveToHistory(equation, result) {
        const historyItems = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
        historyItems.push({ equation, result });
        localStorage.setItem('calculatorHistory', JSON.stringify(historyItems));
    }

    // Event listener for dark/light theme toggle
    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });

    // Function to toggle dark/light theme
    function toggleTheme() {
        document.body.classList.toggle('dark');
        themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    }

    // Event listener for equal sign button to play Hello Kitty sound
    document.querySelector('.equal-sign').addEventListener('click', function() {
        helloKittySound.play();
    });

    // Event delegation for history list navigation
    historyList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'li') {
            const equationText = target.textContent.split(' = ')[0];
            screen.value = equationText;
            currentCalculation = equationText;
        }
    });
});
