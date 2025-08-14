// Démo interactive d'alignement CSS Grid

function highlightCSS(css, activeProperty, activeValue) {
  return css
    // Highlight CSS selectors
    .replace(/^(\.[a-zA-Z][a-zA-Z0-9-]*)/gm, '<span class="css-selector">$1</span>')
    // Highlight braces
    .replace(/([{}])/g, '<span class="css-brace">$1</span>')
    // Highlight comments
    .replace(/(\/\*.*?\*\/)/g, '<span class="css-comment">$1</span>')
    // Highlight the active property line specially
    .replace(
      new RegExp(`(\\s*)(${activeProperty})(\\s*:)(\\s*)(${activeValue})(\\s*;)`, 'g'),
      '$1<span class="highlight-property">$2$3$4$5</span>$6'
    )
    // Highlight other properties
    .replace(/(\s+)([a-zA-Z-]+)(\s*:)(\s*)([^;]+)(;)/g, 
      '$1<span class="css-property">$2</span><span class="css-colon">$3</span>$4<span class="css-value">$5</span><span class="css-semicolon">$6</span>')
    // Fix line breaks
    .replace(/\n/g, '<br>');
}

function highlightHTML(html) {
  return html
    // First escape HTML
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Highlight opening and closing tags
    .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9-]*)/g, 
      '<span class="html-tag">$1$2</span>')
    .replace(/(&gt;)/g, '<span class="html-tag">$1</span>')
    // Highlight class attribute specifically
    .replace(/(class)(=)("demo-[^"]*")/g, 
      '<span class="html-attribute">$1</span><span class="css-colon">$2</span><span class="html-string">$3</span>')
    .replace(/(class)(=)("interactive-[^"]*")/g, 
      '<span class="html-attribute">$1</span><span class="css-colon">$2</span><span class="html-string">$3</span>')
    // Highlight id attribute
    .replace(/(id)(=)("[^"]*")/g, 
      '<span class="html-attribute">$1</span><span class="css-colon">$2</span><span class="html-string">$3</span>')
    // Highlight text content (A, B, C, D)
    .replace(/(&gt;)([A-D])(&lt;)/g, 
      '$1<span class="html-text">$2</span>$3')
    // Preserve indentation and line breaks
    .replace(/\n/g, '<br>')
    .replace(/  /g, '&nbsp;&nbsp;');
}

function generateCSS(property, value) {
  const css = `.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 80px);
  grid-template-rows: repeat(2, 60px);
  gap: 8px;
  border: 2px dashed #2563eb;
  background: #f8fafc;
  padding: 20px;
  min-height: 200px;
  min-width: 240px;
  
  /* Propriété active */
  ${property}: ${value};
}

.demo-item {
  background: #e2e8f0;
  border: 2px solid #64748b;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: #1e293b;
}`;

  return highlightCSS(css, property, value);
}

function generateHTML() {
  const html = `<div class="demo-grid" id="interactive-grid">
  <div class="demo-item">A</div>
  <div class="demo-item">B</div>
  <div class="demo-item">C</div>
  <div class="demo-item">D</div>
</div>`;

  return highlightHTML(html);
}

function updateDemo() {
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
  
  // Update dynamic code if modal is open
  updateDynamicCode(property, value);
  
  // Update available values based on target
  updateAvailableValues(target);
}

function updateDynamicCode(property, value) {
  const cssCodeElement = document.getElementById('dynamic-css-code');
  const htmlCodeElement = document.getElementById('dynamic-html-code');
  
  if (cssCodeElement) {
    cssCodeElement.innerHTML = generateCSS(property, value);
  }
  if (htmlCodeElement) {
    htmlCodeElement.innerHTML = generateHTML();
  }
}

function updateAvailableValues(target) {
  const valueSelect = document.getElementById('value-select');
  if (!valueSelect) return;
  
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

function initCodeModal(updateDemoCallback) {
  const showCodeBtn = document.getElementById('show-code-btn');
  const modal = document.getElementById('code-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const tabs = document.querySelectorAll('.code-tab');
  const panels = document.querySelectorAll('.code-panel');
  
  if (!showCodeBtn || !modal || !closeBtn) return;
  
  // Show modal
  showCodeBtn.addEventListener('click', () => {
    modal.classList.add('show');
    updateDemoCallback(); // Update code when opening modal
    document.body.style.overflow = 'hidden';
  });
  
  // Close modal
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  
  closeBtn.addEventListener('click', closeModal);
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active panel
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${targetTab}-panel`) {
          panel.classList.add('active');
        }
      });
    });
  });
}

function initInteractiveDemo() {
  const grid = document.getElementById('interactive-grid');
  if (!grid) return; // Not an alignment demo page
  
  // Event listeners
  document.querySelectorAll('input[name="axis"], input[name="target"]').forEach(input => {
    input.addEventListener('change', updateDemo);
  });
  
  const valueSelect = document.getElementById('value-select');
  if (valueSelect) {
    valueSelect.addEventListener('change', updateDemo);
  }
  
  // Initialize
  updateDemo();
  
  // Initialize code modal
  initCodeModal(updateDemo);
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initInteractiveDemo();
});
