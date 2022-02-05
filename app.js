const usersEl = document.querySelector('.users')
const userCounterEl = document.querySelector('.user-cunter')
const form = document.querySelector('form')
const userMuch = document.querySelector('.user-much')
// FETCH

let userCounter = 0

form.addEventListener('submit', showUser)

function showUser(e) {
  e.preventDefault()

  if (userMuch.value >= 1) {
    const api = `https://randomuser.me/api/?results=${userMuch.value}`
    fetch(api)
      .then(function (data) {
        return data.json()
      })
      .then(getUserData)

    function getUserData(allData) {
      const users = allData.results

      users.forEach((user) => {
        userCounter++
        const div = document.createElement('div')
        div.classList.add(`user`)
        div.classList.add(`${user.gender}`)
        div.innerHTML = `
            <img class="avatar" src=${user.picture.large} alt="user image" />
            <h3>
              <span class="user-nameInfo firstName">${user.name.first}</span>
              <span class="user-nameInfo lastName">${user.name.last}</span>
            </h3>
            <h4>${user.phone}</h4>
            <h5>${user.email}</h5>
            <button class="delete">Delete</button>
        `
        usersEl.appendChild(div)
      })

      userCounterEl.textContent = userCounter
    }

    usersEl.addEventListener('click', function (e) {
      const item = e.target.classList.value
      if (item == 'delete') {
        const itemParent = e.target.parentElement
        itemParent.remove()
        userCounter--
      }

      userCounterEl.textContent = userCounter
    })
  }

  userMuch.value = ''
}

document.querySelector('.clear').addEventListener('click', function () {
  usersEl.innerHTML = ''
  userCounter = 0
  userCounterEl.textContent = '0'
})

const btns = document.querySelectorAll('.button')

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', (e) => {
    e.preventDefault()
    const filter = e.target.dataset.filter
    console.log(filter)
    for (let i = 0; i < usersEl.childNodes.length; i++) {
      if (filter == 'all') {
        usersEl.childNodes[i].style.display = 'block'
      } else {
        if (usersEl.childNodes[i].classList.value.includes(filter)) {
          usersEl.childNodes[i].style.display = 'block'
          console.log(usersEl.childNodes[i].classList.value)
        } else {
          usersEl.childNodes[i].style.display = 'none'
        }
      }
    }
  })
}
