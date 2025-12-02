function showDialog(msg) {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  
  const win = document.createElement('div');
  win.className = 'window';
  win.style.maxWidth = '380px';
  
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

const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const target = this.getAttribute('aria-controls');
    
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    panels.forEach(p => p.hidden = true);
    
    this.setAttribute('aria-selected', 'true');
    document.getElementById(target).hidden = false;
  });
});

document.getElementById('encodeBtn').addEventListener('click', function() {
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

document.getElementById('decodeBtn').addEventListener('click', function() {
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
    showDialog('Invalid OHNISHJ text. Only letters J, O, H, N are allowed.');
  }
});

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showDialog('Copied to clipboard!');
    }).catch(err => {
      console.error(err);
      showDialog('Failed to copy.');
    });
  } else {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    
    try {
      document.execCommand('copy');
      showDialog('Copied to clipboard!');
    } catch (e) {
      showDialog('Failed to copy.');
    }
    
    document.body.removeChild(temp);
  }
}

document.getElementById('copyEncoded').addEventListener('click', function() {
  const text = document.getElementById('encodedOutput').value.trim();
  if (text) copyText(text);
});

document.getElementById('copyDecoded').addEventListener('click', function() {
  const text = document.getElementById('decodedOutput').value.trim();
  if (text) copyText(text);
});

document.getElementById('clearEncoded').addEventListener('click', function() {
  document.getElementById('encodedOutput').value = '';
});

document.getElementById('clearDecoded').addEventListener('click', function() {
  document.getElementById('decodedOutput').value = '';
});

document.getElementById('plainInput').addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    document.getElementById('encodeBtn').click();
  }
});

document.getElementById('ohnishjInput').addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    document.getElementById('decodeBtn').click();
  }
});

