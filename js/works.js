(function () {
  var works = window.WORKS || [];
  var title = document.getElementById("picker-title");
  var role = document.getElementById("picker-role");
  var links = document.getElementById("picker-links");
  var count = document.getElementById("picker-count");
  var list = document.getElementById("picker-list");
  var current = 0;

  if (!title || !works.length) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function show(index) {
    current = (index + works.length) % works.length;
    var work = works[current];
    title.textContent = work.title;
    role.textContent = work.role;
    count.textContent = pad(current + 1) + "  /  " + pad(works.length);
    links.replaceChildren();
    work.links.forEach(function (link) {
      var a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      links.appendChild(a);
    });
    Array.prototype.forEach.call(list.querySelectorAll("button"), function (button, i) {
      if (i === current) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  works.forEach(function (work, i) {
    var item = document.createElement("li");
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = pad(i + 1) + "   " + work.title;
    button.addEventListener("click", function () { show(i); });
    item.appendChild(button);
    list.appendChild(item);
  });

  document.getElementById("picker-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("picker-next").addEventListener("click", function () { show(current + 1); });
  show(0);
})();
