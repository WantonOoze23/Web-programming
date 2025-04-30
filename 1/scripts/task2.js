import { calculateHeat } from './task2-validation.js';
function getInputData() {
    return {
        hg: parseFloat(document.getElementById('hg').value) || 0,
        cg: parseFloat(document.getElementById('cg').value) || 0,
        sg: parseFloat(document.getElementById('sg').value) || 0,
        og: parseFloat(document.getElementById('og').value) || 0,
        qg: parseFloat(document.getElementById('qg').value) || 0,
        vg: parseFloat(document.getElementById('vg').value) || 0,
        wp: parseFloat(document.getElementById('wp').value) || 0,
        ad: parseFloat(document.getElementById('ad').value) || 0
    };
}

// Функція перевірки суми горючих компонентів
function validateInput(data) {
    const sum = data.hg + data.cg + data.sg + data.og;
    if (sum !== 100) {
        alert('Сума горючих компонентів (H^г + C^г + S^г + O^г) має дорівнювати 100%');
        console.log('Sum:', sum);
        return false;
    }
    return true;
}

// Функція розрахунку робочої маси та теплоти згоряння
function calculateResult(data) {
    const ar = data.ad * (100 - data.wp) / 100; 
    const k = (100 - data.wp - ar) / 100; 

    return {
        hp: data.hg * k,
        cp: data.cg * k,
        sp: data.sg * k,
        op: data.og * k,
        ap: ar,
        vp: data.vg * (100 - data.wp) / 100, 
        qp: data.qg * (100 - data.wp - ar) / 100 - 0.025 * data.wp 
    };
}

// Основна функція обробки
function calculate() {
    const data = getInputData();
    if (!validateInput(data)) return;
    
    const heatResults = calculateHeat(data);

    const result = calculateResult(data);

    document.getElementById('hp').textContent = result.hp.toFixed(2);
    document.getElementById('cp').textContent = result.cp.toFixed(2);
    document.getElementById('sp').textContent = result.sp.toFixed(2);
    document.getElementById('op').textContent = result.op.toFixed(2);
    document.getElementById('ap').textContent = result.ap.toFixed(2);
    document.getElementById('vp').textContent = result.vp.toFixed(2);
    document.getElementById('qp').textContent = result.qp.toFixed(2);

    document.getElementById('result').style.display = 'block';
}