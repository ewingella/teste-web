// Guide Core - Fonctionnalités des boutons toggle

document.addEventListener("DOMContentLoaded", () => {
  function expand(block){
    block.classList.add("measuring");
    block.style.height = "auto";
    const target = block.scrollHeight;
    block.style.height = "0px";
    block.offsetHeight; // reflow
    block.classList.add("open");
    block.style.height = target + "px";
    block.addEventListener("transitionend", function onEnd(e){
      if (e.propertyName === "height") {
        block.style.height = "auto";
        block.classList.remove("measuring");
        block.removeEventListener("transitionend", onEnd);
      }
    });
  }
  
  function collapse(block){
    const current = block.scrollHeight;
    block.style.height = current + "px";
    block.offsetHeight;
    block.style.height = "0px";
    block.classList.remove("open");
  }
  
  function ensureIcon(btn, initial){
    let icon = btn.querySelector(".icon");
    if (!icon) {
      icon = document.createElement("span");
      icon.className = "icon";
      icon.setAttribute("aria-hidden", "true");
      btn.prepend(icon);
    }
    icon.textContent = initial ? "▶" : "▼";
  }
  
  function setLabel(btn, show){
    btn.lastChild && btn.removeChild(btn.lastChild);
    const label = document.createTextNode(" " + (show ? (btn.dataset.labelShow || "Voir le code") : (btn.dataset.labelHide || "Masquer le code")));
    btn.appendChild(label);
  }
  
  function toggle(btn, block){
    const isOpen = block.classList.contains("open");
    if (isOpen){
      collapse(block);
      btn.setAttribute("aria-expanded", "false");
      ensureIcon(btn, true);
      setLabel(btn, true);
    } else {
      expand(block);
      btn.setAttribute("aria-expanded", "true");
      ensureIcon(btn, false);
      setLabel(btn, false);
    }
  }
  
  // Initialize all toggle buttons
  document.querySelectorAll(".btn-toggle").forEach(btn => {
    const id = btn.getAttribute("data-target");
    const block = document.getElementById(id);
    if (!block) return;
    
    btn.setAttribute("aria-controls", id);
    btn.setAttribute("aria-expanded", "false");
    btn.dataset.labelShow = btn.dataset.labelShow || "Voir le code";
    btn.dataset.labelHide = btn.dataset.labelHide || "Masquer le code";
    
    ensureIcon(btn, true);
    setLabel(btn, true);
    block.style.height = "0px";
    
    btn.addEventListener("click", () => toggle(btn, block));
  });
});
