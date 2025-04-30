function getInputData() {
    return {
        hp: parseFloat(document.getElementById('hp').value) || 0,
        cp: parseFloat(document.getElementById('cp').value) || 0,
        sp: parseFloat(document.getElementById('sp').value) || 0,
        np: parseFloat(document.getElementById('np').value) || 0,
        op: parseFloat(document.getElementById('op').value) || 0,
        wp: parseFloat(document.getElementById('wp').value) || 0,
        ap: parseFloat(document.getElementById('ap').value) || 0
    };
}

// Функція перевірки суми компонентів
function validateInput(data) {
    const sum = data.hp + data.cp + data.sp + data.np + data.op + data.wp + data.ap;
    if (sum !== 100) {
        alert('Сума компонентів має дорівнювати 100%');
        return false;
    }
    return true;
}

// Функція розрахунку складу
function calculateComposition(data) {
    const kcc = 100 / (100 - data.wp);
    const kpt = 100 / (100 - data.wp - data.ap);

    return {
        kcc: kcc,
        kpt: kpt,
        dry: {
            hc: data.hp * kcc,
            cc: data.cp * kcc,
            sc: data.sp * kcc,
            nc: data.np * kcc,
            oc: data.op * kcc,
            ac: data.ap * kcc
        },
        combustible: {
            hg: data.hp * kpt,
            cg: data.cp * kpt,
            sg: data.sp * kpt,
            ng: data.np * kpt,
            og: data.op * kpt
        }
    };
}

// Функція розрахунку теплоти згоряння
function calculateHeat(data) {
    const qp = (339 * data.cp + 1030 * data.hp - 108.8 * (data.op - data.sp) - 25 * data.wp) / 1000;
    const qc = (qp + 0.025 * data.wp) * (100 / (100 - data.wp));
    const qg = (qp + 0.025 * data.wp) * (100 / (100 - data.wp - data.ap));

    return { qp, qc, qg };
}

function calculateTask1_1() {
    const data = getInputData();
    if (!validateInput(data)) return;

    const result = calculateComposition(data);

    document.getElementById('kcc').textContent = result.kcc.toFixed(2);
    document.getElementById('kpt').textContent = result.kpt.toFixed(2);
    
    document.getElementById('hc').textContent = result.dry.hc.toFixed(2);
    document.getElementById('cc').textContent = result.dry.cc.toFixed(2);
    document.getElementById('sc').textContent = result.dry.sc.toFixed(2);
    document.getElementById('nc').textContent = result.dry.nc.toFixed(2);
    document.getElementById('oc').textContent = result.dry.oc.toFixed(2);
    document.getElementById('ac').textContent = result.dry.ac.toFixed(2);
    
    document.getElementById('hg').textContent = result.combustible.hg.toFixed(2);
    document.getElementById('cg').textContent = result.combustible.cg.toFixed(2);
    document.getElementById('sg').textContent = result.combustible.sg.toFixed(2);
    document.getElementById('ng').textContent = result.combustible.ng.toFixed(2);
    document.getElementById('og').textContent = result.combustible.og.toFixed(2);

    document.getElementById('result_1').style.display = 'block';
    document.getElementById('result_2').style.display = 'none';
}

function calculateTask1_2() {
    const data = getInputData();
    if (!validateInput(data)) return;

    const result = calculateHeat(data);

    document.getElementById('qp').textContent = result.qp.toFixed(2);
    document.getElementById('qc').textContent = result.qc.toFixed(2);
    document.getElementById('qg').textContent = result.qg.toFixed(2);

    document.getElementById('result_1').style.display = 'none';
    document.getElementById('result_2').style.display = 'block';
}