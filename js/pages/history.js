import { getSessionHistory, getGlobalHistory } from '../modules/historyTracker.js';
import { trackPageVisit } from '../modules/historyTracker.js';

// trackPageVisit("История просмотра");

function renderTable(data, tableId) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';
    for (const [page, count] of Object.entries(data)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${page}</td><td>${count}</td>`;
        tbody.appendChild(row);
    }
}

renderTable(getSessionHistory(), 'sessionHistory');
renderTable(getGlobalHistory(), 'globalHistory');
