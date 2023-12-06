
if (localStorage.theme === 'darkMode' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('darkMode')
    localStorage.theme = 'darkMode'
} else {
    document.documentElement.classList.remove('darkMode')
    localStorage.theme = 'lightMode'
}


