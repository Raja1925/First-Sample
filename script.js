const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${(completedGoalsCount/3) * 100}%`
progressBar.firstElementChild.innerText = `${completedGoalsCount}/3 completed`

checkBoxList.forEach( function (checkbox) {
    checkbox.addEventListener('click', (e) => {
        const allGoalsAdded = [...inputFields].every(function (input) {
            return input.value
        })

        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${(completedGoalsCount/3) * 100}%`
            progressBar.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }else{
            progressBar.classList.add('show-error')
        }
    })
})

inputFields.forEach((input) => {
    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        allGoals[input.id] = {
            name: input.value,
            completed: false,
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})