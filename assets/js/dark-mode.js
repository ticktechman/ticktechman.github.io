
(function () {
  var isDarkMode = localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // set theme first
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function toggleDarkMode() {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      isDarkMode = false;
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add('dark');
      isDarkMode = true;
      localStorage.theme = "dark";
    }
  }

  // mount toggle function to element
  var elem = document.getElementById("dark-mode");
  if (elem) {
    elem.onclick = toggleDarkMode;
    console.log("dark mode mounted");
  }

})();

