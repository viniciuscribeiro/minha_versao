document.addEventListener('DOMContentLoaded', () => {
  const toggleMenu = document.getElementByClassName('background-menu')
  const coverPage = document.getElementByClassName('coverPage')

  toggleMenu.addEventListener('click', () => {
    if (coverPage.classList.contains('visible')) {
      coverPage.classList.remove('visible')
      setTimeout(() => {
        coverPage.classList.add('hidden')
      }, 500) // Tempo igual ao da transição
    } else {
      coverPage.classList.remove('hidden')
      setTimeout(() => {
        coverPage.classList.add('visible')
      }, 10) // Pequeno atraso para permitir a transição
    }
  })
})
