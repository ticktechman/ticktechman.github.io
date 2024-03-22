
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
  if ('clipboard' in navigator) {
    navigator.clipboard.writeText(elem.nextElementSibling.textContent);
    var children = elem.getElementsByTagName("svg");
    if (children.length != 2) {
      return;
    }

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

  } else {
    console.error("can not access clipboard");
  }
}


function imageZoomIn(ev, e) {
  console.log("image zoom in");
  if (e.classList.contains("max-w-max")) {
    e.classList.remove("max-w-max");
    e.classList.remove("max-h-max");
    e.classList.remove("cursor-zoom-out");
    e.classList.add("max-w-[100vw]");
    e.classList.add("max-h-[100vh]");
    e.classList.add("cursor-zoom-in");
  } else {
    e.classList.remove("max-w-[100vw]");
    e.classList.remove("max-h-[100vh]");
    e.classList.add("max-w-max");
    e.classList.add("max-h-max");
    e.classList.remove("cursor-zoom-in");
    e.classList.add("cursor-zoom-out");
  }

  ev.stopPropagation();
  return true;
}

function resetImageProp(e) {
  e.classList.remove("max-w-max");
  e.classList.remove("max-h-max");
  e.classList.remove("cursor-zoom-out");
  e.classList.add("max-w-[100vw]");
  e.classList.add("max-h-[100vh]");
  e.classList.add("cursor-zoom-in");
  e.src = "";
}

function hideImageDiag(ev, e) {
  console.log("hide image diag");
  e.classList.add("hidden");
  let img = e.getElementsByTagName("img");
  if (img.length > 0) {
    resetImageProp(img[0]);
  }

  ev.stopPropagation();
}

function largeImageClick(ev) {
  ev.stopPropagation();
}

function showImageDiag(e) {
  console.log("show image diag");
  e.classList.remove("hidden");
  return true;
}

var pgcontent = document.getElementById("page-content");
if (pgcontent != null) {
  var eles = pgcontent.getElementsByTagName("img");
  if (eles.length > 0) {
    for (let ele of eles) {
      ele.onclick = (ev) => {
        var diag = document.getElementById("page-model-image-diag");
        let images = diag.getElementsByTagName("img");
        for (let one of images) {
          one.src = ele.src;
        }
        showImageDiag(diag);
        ev.stopPropagation();
      };
    }
  }
}

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    hideImageDiag(event, document.getElementById("page-model-image-diag"));
  }
});

