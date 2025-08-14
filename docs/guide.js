
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

  // Interactive Demo Functionality
  function initInteractiveDemo() {
    const grid = document.getElementById('interactive-grid');
    const propertyDisplay = document.getElementById('property-display');
    const explanation = document.getElementById('explanation');
    const valueSelect = document.getElementById('value-select');
    
    if (!grid || !propertyDisplay || !explanation || !valueSelect) return;
    
    const explanations = {
      'justify-items': 'Position des éléments horizontalement dans leurs cellules',
      'align-items': 'Position des éléments verticalement dans leurs cellules',
      'justify-content': 'Distribution horizontale de la grille dans son container',
      'align-content': 'Distribution verticale de la grille dans son container'
    };
    
    function updateDemo() {
      const axis = document.querySelector('input[name="axis"]:checked')?.value || 'justify';
      const target = document.querySelector('input[name="target"]:checked')?.value || 'items';
      const value = valueSelect.value;
      
      const property = `${axis}-${target}`;
      
      // Reset all alignment styles
      grid.style.justifyItems = '';
      grid.style.alignItems = '';
      grid.style.justifyContent = '';
      grid.style.alignContent = '';
      
      // Apply the selected style
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      grid.style[camelCaseProperty] = value;
      
      // Update display
      propertyDisplay.textContent = `${property}: ${value}`;
      explanation.textContent = explanations[property] || 'Propriété d\'alignement CSS Grid';
      
      // Update available values based on target
      updateAvailableValues(target);
    }
    
    function updateAvailableValues(target) {
      const itemsValues = ['start', 'center', 'end', 'stretch'];
      const contentValues = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'];
      
      const availableValues = target === 'items' ? itemsValues : contentValues;
      const currentValue = valueSelect.value;
      
      // Clear and repopulate options
      valueSelect.innerHTML = '';
      availableValues.forEach(val => {
        const option = document.createElement('option');
        option.value = val;
        option.textContent = val;
        valueSelect.appendChild(option);
      });
      
      // Restore value if still available, otherwise use first available
      if (availableValues.includes(currentValue)) {
        valueSelect.value = currentValue;
      } else {
        valueSelect.value = availableValues[0];
      }
    }
    
    // Event listeners
    document.querySelectorAll('input[name="axis"], input[name="target"]').forEach(input => {
      input.addEventListener('change', updateDemo);
    });
    
    valueSelect.addEventListener('change', updateDemo);
    
    // Initialize
    updateDemo();
  }
  
  // Initialize interactive demo
  initInteractiveDemo();
});
