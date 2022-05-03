var inputBillamt = document.querySelector("#input-billamt");
var btnNxt = document.querySelector("#btn-next");
var inputCashamt = document.querySelector("#input-cashamt");
var btnCalulate = document.querySelector("#btn-calculate");

function nextBtnHandler() {
    if (inputBillamt.value < 1) {
        errorMsgSetter("div-errormsg", "please enter valid bill amount");
    } else {
        errorMsgRemover("div-errormsg");
        componentVisible("input-cashamt");
        componentVisible("btn-calculate");
        componentHide("btn-next");
    }
}

function btnCalculateHandler() {
    errorMsgRemover("tr-notes");
    errorMsgRemover("tr-note-count");
    errorMsgRemover("result-placeholder");
    errorMsgRemover("div-errormsg");

    if (inputBillamt.value < 1) {
        errorMsgSetter("div-errormsg", "please enter valid bill amount");
        componentHide("btn-calculate");
        componentHide("input-cashamt");
        componentVisible("btn-next");
        return;
    }

    if (inputCashamt.value < 1) {
        errorMsgSetter("div-errormsg", "please enter valid cash received");
        return;
    }
    var cashToReturn = inputCashamt.value - inputBillamt.value;
    if (cashToReturn == 0) {
        errorMsgSetter("result-placeholder", "No Change to return");
        componentVisible("result-placeholder");
        return;
    }
    if (cashToReturn < 0) {
        var abscashToReturn = Math.abs(cashToReturn);
        errorMsgSetter("result-placeholder", `Ask ${abscashToReturn} more !!`);
        componentVisible("result-placeholder");
        return;
    }

    document.getElementById("tr-notes").innerHTML += "<th>" + "Notes >= 5 > Coins, in £s" + "</th>";
    document.getElementById("tr-note-count").innerHTML += "<th>" + "Number of Notes & Coins" + "</th>";

    var result = calculatorEngine(cashToReturn);
    componentVisible("result-placeholder");
    componentVisible("tbl-result");
    for (var r of result) {
        document.getElementById("tr-notes").innerHTML += "<td>" + r[0] + "</td>";
        document.getElementById("tr-note-count").innerHTML += "<td>" + r[1] + "</td>";
    }
}

function calculatorEngine(cashToReturn) {
    var returnAmt = new Map();
    var currency = [50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01];
    var currencyCounter = [];
    for (var i = 0; i < currency.length; i++) {
        if (cashToReturn >= currency[i]) {
            currencyCounter[i] = Math.floor(cashToReturn / currency[i]);
            cashToReturn = cashToReturn - currencyCounter[i] * currency[i];
        } else {
            currencyCounter[i] = 0;
        }
        returnAmt.set(currency[i], currencyCounter[i]);
    }
    return returnAmt;
}

function errorMsgSetter(id, msg) {
    document.getElementById(id).innerHTML = msg;
}

function errorMsgRemover(id) {
    document.getElementById(id).innerHTML = "";
}

function componentHide(id) {
    document.getElementById(id).style.display = "none";
}

function componentVisible(id) {
    document.getElementById(id).style.display = "block";
}

btnNxt.addEventListener('click', nextBtnHandler);
btnCalulate.addEventListener('click', btnCalculateHandler);
