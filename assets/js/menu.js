
console.log("get in menu.js");

function toggleMainMenu() {
  console.log("toggle main menu");
  var menu = document.getElementById("main-menu-hidden");
  menu.classList.toggle("hidden");
}

function toggleLanguageMenu() {
  console.log("toggle language menu");
  var menu = document.getElementById("language-ul");
  menu.classList.toggle("hidden");
}


function toggleArchiveList(elem) {
  elem.nextElementSibling.classList.toggle("hidden");
}

function copyCode(elem) {
  console.log("copy code:", elem.nextElementSibling.textContent);

  if ('clipboard' in navigator) {
    navigator.clipboard.writeText(elem.nextElementSibling.textContent);
    var children = elem.getElementsByTagName("svg");
    console.log(children);
    if (children.length != 2) {
      return;
    }
    console.log(children);

    children[0].style.opacity = 0;
    children[1].style.opacity = 0;
    children[0].classList.add("hidden");
    children[1].classList.remove("hidden");
    setTimeout(function () {
      children[1].style.opacity = 1;
    }, 30);

    setTimeout(function () {
      children[0].style.opacity = 0;
      children[1].style.opacity = 0;
      children[0].classList.remove("hidden");
      children[1].classList.add("hidden");
      setTimeout(function () {
        children[0].style.opacity = 1;
      }, 30);
    }, 1500);

  }
}
