function showDialog(msg) {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.setAttribute('role', 'presentation');
  
  const win = document.createElement('div');
  win.className = 'window';
  win.style.maxWidth = '380px';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-modal', 'true');
  
  win.innerHTML = `
    <div class="title-bar">
      <div class="title-bar-text">OHNISHJ Translator</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <div class="dialog-content">
        <p>${msg}</p>
      </div>
      <section class="field-row" style="justify-content: center; margin-top: 20px;">
        <button class="dialog-ok">OK</button>
      </section>
    </div>
  `;
  
  overlay.appendChild(win);
  document.body.appendChild(overlay);
  
  const btn = win.querySelector('.dialog-ok');
  const closeBtn = win.querySelector('.title-bar-controls button');
  
  function close() {
    document.body.removeChild(overlay);
  }
  
  btn.onclick = close;
  closeBtn.onclick = close;
  btn.focus();
  
  overlay.onclick = (e) => {
    if (e.target === overlay) close();
  };
}

const tabs = document.querySelectorAll('[role="tab"]') || [];
const panels = document.querySelectorAll('[role="tabpanel"]') || [];

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const target = this.getAttribute('aria-controls');

    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    panels.forEach(p => p.hidden = true);

    this.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(target);
    if (panel) panel.hidden = false;
  });
});

const encodeBtn = document.getElementById('encodeBtn');
if (encodeBtn) encodeBtn.addEventListener('click', function() {
  const input = document.getElementById('plainInput');
  const output = document.getElementById('encodedOutput');
  const text = input.value.trim();
  
  if (!text) {
    output.value = '';
    return;
  }
  
  try {
    output.value = Ohnishj.encode(text);
  } catch (e) {
    console.error(e);
    output.value = '';
    showDialog('Failed to encode text. Please check your input.');
  }
});
const decodeBtn = document.getElementById('decodeBtn');
if (decodeBtn) decodeBtn.addEventListener('click', function() {
  const input = document.getElementById('ohnishjInput');
  const output = document.getElementById('decodedOutput');
  const text = input.value.trim();
  
  if (!text) {
    output.value = '';
    return;
  }
  
  try {
    output.value = Ohnishj.decode(text);
  } catch (e) {
    console.error(e);
    output.value = '';
    showDialog('Invalid OHNISHJ text. Make sure it contains the ">" marker.');
  }
});

function copyText(text) {
  if (!text) return showDialog('Nothing to copy');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showDialog('Copied to clipboard!');
    }).catch(err => {
      console.error('Clipboard write failed', err);
      showDialog('Failed to copy to clipboard. Try copying manually.');
    });
    return;
  }

  // Fallback
  try {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showDialog('Copied to clipboard!');
  } catch (e) {
    console.error('Fallback copy failed', e);
    showDialog('Failed to copy. Your browser may not support clipboard operations.');
  }
}

const copyEncoded = document.getElementById('copyEncoded');
if (copyEncoded) copyEncoded.addEventListener('click', function() {
  const outEl = document.getElementById('encodedOutput');
  const text = outEl ? outEl.value.trim() : '';
  if (text) copyText(text);
});

const copyDecoded = document.getElementById('copyDecoded');
if (copyDecoded) copyDecoded.addEventListener('click', function() {
  const outEl = document.getElementById('decodedOutput');
  const text = outEl ? outEl.value.trim() : '';
  if (text) copyText(text);
});

const clearEncoded = document.getElementById('clearEncoded');
if (clearEncoded) clearEncoded.addEventListener('click', function() {
  const outEl = document.getElementById('encodedOutput');
  if (outEl) outEl.value = '';
});

const clearDecoded = document.getElementById('clearDecoded');
if (clearDecoded) clearDecoded.addEventListener('click', function() {
  const outEl = document.getElementById('decodedOutput');
  if (outEl) outEl.value = '';
});

const plainInput = document.getElementById('plainInput');
if (plainInput) plainInput.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    const btn = document.getElementById('encodeBtn');
    if (btn) btn.click();
  }
});

const ohnishjInput = document.getElementById('ohnishjInput');
if (ohnishjInput) ohnishjInput.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    const btn = document.getElementById('decodeBtn');
    if (btn) btn.click();
  }
});
