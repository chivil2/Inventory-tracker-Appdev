const api = '/api/items';

async function loadItems() {
  const res = await fetch(api);
  const items = await res.json();
  const ul = document.getElementById('items');
  ul.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.dataset.id = item._id;
    li.innerHTML = `
      <span class="name">${escapeHtml(item.name)}</span>
      <span class="qty">Qty: ${item.quantity}</span>
      <button class="dec">-</button>
      <button class="inc">+</button>
      <button class="del">Delete</button>
      `;
    if (item.quantity <= item.lowStockThreshold) li.classList.add('low');
    ul.appendChild(li);
  });
}

function escapeHtml(text){ return text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

document.getElementById('add-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const quantity = parseInt(document.getElementById('quantity').value, 10) || 0;
  const lowStockThreshold = parseInt(document.getElementById('threshold').value, 10) || 5;
  await fetch(api, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, quantity, lowStockThreshold }) });
  document.getElementById('add-form').reset();
  loadItems();
});

document.getElementById('items').addEventListener('click', async (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = li.dataset.id;
  if (e.target.classList.contains('del')) { await fetch(`${api}/${id}`, { method: 'DELETE' }); loadItems(); }
  if (e.target.classList.contains('inc') || e.target.classList.contains('dec')) {
    const inc = e.target.classList.contains('inc') ? 1 : -1;
    const qtySpan = li.querySelector('.qty');
    const match = qtySpan.textContent.match(/Qty: (\d+)/);
    const current = match ? parseInt(match[1], 10) : 0;
    const next = Math.max(0, current + inc);
    await fetch(`${api}/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ quantity: next }) });
    loadItems();
  }
});

loadItems().catch(err => { console.error(err); });