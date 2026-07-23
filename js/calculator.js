// ==============================
// TITANOS
// CALCULADORA
// ==============================

function calculatorApp() {

    return `

        <div class="calculator">

            <input
                type="text"
                id="calc-display"
                readonly
                value="0"
            >

            <div class="calculator-buttons">

                <button onclick="calcClear()">C</button>
                <button onclick="calcDelete()">⌫</button>
                <button onclick="calcOperator('%')">%</button>
                <button onclick="calcOperator('/')">÷</button>

                <button onclick="calcNumber('7')">7</button>
                <button onclick="calcNumber('8')">8</button>
                <button onclick="calcNumber('9')">9</button>
                <button onclick="calcOperator('*')">×</button>

                <button onclick="calcNumber('4')">4</button>
                <button onclick="calcNumber('5')">5</button>
                <button onclick="calcNumber('6')">6</button>
                <button onclick="calcOperator('-')">−</button>

                <button onclick="calcNumber('1')">1</button>
                <button onclick="calcNumber('2')">2</button>
                <button onclick="calcNumber('3')">3</button>
                <button onclick="calcOperator('+')">+</button>

                <button onclick="calcNumber('0')">0</button>
                <button onclick="calcNumber('.')">.</button>
                <button class="equal" onclick="calcResult()">=</button>

            </div>

        </div>

    `;

}

let calcExpression = "";

function calcDisplay(){

    document.getElementById("calc-display").value =
        calcExpression || "0";

}

function calcNumber(value){

    calcExpression += value;

    calcDisplay();

}

function calcOperator(op){

    calcExpression += op;

    calcDisplay();

}

function calcClear(){

    calcExpression = "";

    calcDisplay();

}

function calcDelete(){

    calcExpression = calcExpression.slice(0,-1);

    calcDisplay();

}

function calcResult(){

    try{

        calcExpression = eval(calcExpression).toString();

    }catch{

        calcExpression = "";

        alert("Operación inválida");

    }

    calcDisplay();

}