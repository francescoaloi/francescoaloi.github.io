(function () {
  var works = window.WORKS || [];
  var title = document.getElementById("picker-title");
  var role = document.getElementById("picker-role");
  var links = document.getElementById("picker-links");
  var list = document.getElementById("picker-list");
  var nums = document.getElementById("picker-nums");
  var current = 0;
  if (!title || !works.length) return;

  function mark(nodeList) {
    Array.prototype.forEach.call(nodeList, function (button, i) {
      if (i === current) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  function show(index) {
    current = (index + works.length) % works.length;
    var work = works[current];
    title.textContent = work.title;
    role.textContent = work.role;
    links.replaceChildren();
    work.links.forEach(function (link) {
      var a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      links.appendChild(a);
    });
    mark(list.querySelectorAll("button"));
    mark(nums.querySelectorAll("button"));
  }

  works.forEach(function (work, i) {
    var item = document.createElement("li");
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = work.title;
    button.addEventListener("click", function () { show(i); });
    item.appendChild(button);
    list.appendChild(item);

    var n = document.createElement("button");
    n.type = "button";
    n.textContent = String(i + 1);
    n.addEventListener("click", function () { show(i); });
    nums.appendChild(n);
  });

  document.getElementById("picker-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("picker-next").addEventListener("click", function () { show(current + 1); });
  show(0);
})();
