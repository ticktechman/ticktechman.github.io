var log = console.log;
var loge = console.error;

function toggleMainMenu(event) {
  log("toggle main menu");
  var menu = document.getElementById("main-menu-hidden");
  if (menu.classList.contains("menu-shown")) {
    menu.classList.remove("menu-shown");
    menu.classList.add("menu-hidden");
  } else {
    menu.classList.add("menu-shown");
    menu.classList.remove("menu-hidden");
  }
  event.stopPropagation();
}

function toggleLanguageMenu(event) {
  log("toggle language menu");
  var menu = document.getElementById("language-ul");
  if (menu.classList.contains("menu-shown")) {
    menu.classList.remove("menu-shown");
    menu.classList.add("menu-hidden");
  } else {
    menu.classList.add("menu-shown");
    menu.classList.remove("menu-hidden");
  }
  event.stopPropagation();
}

document.body.onclick = function (event) {
  var menu = document.getElementById("language-ul");
  menu.classList.add("menu-hidden");
  menu.classList.remove("menu-shown");
  menu = document.getElementById("main-menu-hidden");
  menu.classList.add("menu-hidden");
  menu.classList.remove("menu-shown");
  event.stopPropagation();
}

function toggleArchiveList(event, elem) {
  let img = elem.getElementsByTagName("img");
  if (img.length == 1) {
    img = img[0];
    img.classList.toggle("rotate-90");
  }
  elem.nextElementSibling.classList.toggle("hidden");
  event.stopPropagation();
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
    loge("can not access clipboard");
  }
}


function imageZoomIn(ev, e) {
  log("image zoom in");
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
  log("hide image diag");
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
  log("show image diag");
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


function carousel_left(event, thiz) {
  log("scroll left");

  let carousel = thiz.parentElement.parentElement;
  if(!carousel) {
    return;
  }

  let items = carousel.querySelectorAll(".carousel-item");
  let n = items.length;
  let i = 0;
  if(n <= 1) {
    items[0].classList.remove('-translate-x-full', 'translate-x-full', 'z-6');
    items[0].classList.add('translate-x-0', 'z-8');
    items[0].setAttribute("current", "");
    return;
  }

  let cur = n;
  for(; i<n; i++) {
    if(items[i].hasAttribute("current")) {
      cur = i;
      items[i].removeAttribute("current");
    } else {
      items[i].classList.remove('duration-1000');
      items[i].classList.add('-translate-x-full');
      items[i].classList.remove('translate-x-full', 'translate-x-0');
    }
  }
  i = i % n;

  window.setTimeout(function(items, cur, n) {
    let nxt = cur - 1 < 0 ? n - 1 : cur - 1;
    // log("next=", nxt, "cur=", cur, "n=", n);
    items[cur].classList.add("duration-1000");
    items[cur].classList.remove('translate-x-0', 'z-8');
    items[cur].classList.add('translate-x-full', 'z-6');
    items[nxt].classList.add("duration-1000");
    items[nxt].classList.remove('-translate-x-full', 'z-6');
    items[nxt].classList.add('translate-x-0', 'z-8');
    items[nxt].setAttribute("current", "");
  }, 0, items, cur, n);

  if(event) {
    event.stopPropagation();
  }
}

function carousel_right(event, thiz) {
  log("scroll right");
  let carousel = thiz.parentElement.parentElement;
  if(!carousel) {
    return;
  }

  let items = carousel.querySelectorAll(".carousel-item");
  let n = items.length;
  let i = 0;
  if(n <= 1) {
    items[0].classList.remove('translate-x-full', '-translate-x-full', 'z-6');
    items[0].classList.add('translate-x-0', 'z-8');
    items[0].setAttribute("current", "");
    return;
  }

  let cur = n;
  for(; i<n; i++) {
    if(items[i].hasAttribute("current")) {
      cur = i;
      items[i].removeAttribute("current");
    } else {
      items[i].classList.remove('duration-1000');
      items[i].classList.add('translate-x-full');
      items[i].classList.remove('-translate-x-full', 'translate-x-0');
    }
  }
  i = i % n;

  window.setTimeout(function(items, cur, n) {
    let nxt = (cur + 1) % n;
    items[cur].classList.add("duration-1000");
    items[cur].classList.remove('translate-x-0', 'z-8');
    items[cur].classList.add('-translate-x-full', 'z-6');
    items[nxt].classList.add("duration-1000");
    items[nxt].classList.remove('translate-x-full', 'z-6');
    items[nxt].classList.add('translate-x-0', 'z-8');
    items[nxt].setAttribute("current", "");
  }, 0, items, cur, n);

  if(event) {
    event.stopPropagation();
  }
}

let carousels = document.querySelectorAll(".carousel");
if(carousels.length > 0) {
  carousels.forEach(e => {
    let items = e.querySelectorAll(".carousel-item");
    if(items.length <= 0) {
      return;
    }
    items[items.length - 1].setAttribute("current", "");
    carousel_right(null, e.querySelector('svg[name="right"]'));
  });
}

function coffee(thiz) {
  log("coffee");
  if(!thiz || !thiz.parentElement) {
    return;
  }
  let img = thiz.parentElement.getElementsByTagName("img");
  log(img);
  if(img.length != 1) {
    return;
  }
  img[0].classList.toggle("hidden");
}