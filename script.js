let inputContainer, btnGrade, btnCalculate, failing, error, mean, btnReset
let count = 1

let onloadFunc = function () {
    mean = document.getElementById('mean')
    error = document.getElementById('error')
    failing = document.getElementById('failing')
    btnCalculate = document.getElementById('calculate')
    btnGrade = document.getElementById('add-grade')
    btnReset = document.getElementById('reset')
    inputContainer = document.getElementById('input-container')
    createInput(count)

    btnCalculate.addEventListener('click', calculateAverage)
    btnGrade.addEventListener('click', addGrade)
    btnReset.addEventListener('click', resetFunc)
}

function createInput() {
    let div = document.createElement('div')
    div.classList.add('input')

    let input1 = document.createElement('input')
    let input2 = document.createElement('input')

    input1.type = 'number'
    input2.type = 'number'

    input1.id= 'grade'+count
    input2.id= 'weight'+count

    input1.placeholder = 'Grade'
    input2.placeholder = 'Weight'

    let label = document.createElement('label')
    label.htmlFor = 'grade'+count
    label.innerText = 'Grade #'+count

    div.appendChild(label)
    div.appendChild(input1)
    div.appendChild(input2)

    inputContainer.appendChild(div)
}

let addGrade = function() {
    count++
    createInput()
}

let calculateAverage = function() {
    let avg = 0
    let weight = 0
    let valid = true
    for (let i = 1; i <= count; i++) {
        let grade = document.getElementById('grade'+i)
        let weightIn = document.getElementById('weight'+i)
        let x = parseInt(grade.value)
        let y = parseInt(weightIn.value)
        if(!isNaN(x) && !isNaN(y)) {
            avg += (x*(y/100))
            weight += y/100
        }
        else {
            valid = false
            displayError()
            break
        }
    }

    if(valid) {
        removeError()
        isFailing((avg/weight))
    }

}

function displayError() {
    error.innerText = 'Některý ze vstupů obsahuje neplatné číslo'
    failing.innerText = ''
    mean.innerText = ''
}

function removeError() {
    error.innerText = ''
}

function isFailing(avg) {
    console.log(avg)
    if(avg <= 40) {
        failing.innerHTML = 'Am I failing my class? <span class="red">yes</span>'
        mean.innerHTML = `Mean: <span class="red">${Math.round(avg * 100) / 100}%</span>`
    } else {
        failing.innerHTML = 'Am I failing my class? <span class="green">no</span>'
        mean.innerHTML = `Mean: <span class="green">${Math.round(avg * 100) / 100}%</span>`
    }
}

let resetFunc = function resetFunc() {
    count=0
    inputContainer.innerHTML= ''
    failing.innerHTML = 'Am I failing my class?'
    mean.innerHTML = `Mean:`
    removeError()
    addGrade()
}


window.onload = onloadFunc
