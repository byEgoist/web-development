// js/modules/historyTracker.js
import { getCookie, setCookie } from './cookies.js';

// --- Работа с Local Storage (текущий сеанс) ---
function updateSessionHistory(pageName) {
    const sessionData = JSON.parse(localStorage.getItem('sessionHistory') || '{}');
    sessionData[pageName] = (sessionData[pageName] || 0) + 1;
    localStorage.setItem('sessionHistory', JSON.stringify(sessionData));
}

// --- Работа с Cookies (всё время) ---
function updateGlobalHistory(pageName) {
    const cookieData = JSON.parse(getCookie('globalHistory') || '{}');
    cookieData[pageName] = (cookieData[pageName] || 0) + 1;
    setCookie('globalHistory', JSON.stringify(cookieData), 365);
}

// --- Основная функция ---
export function trackPageVisit(pageName) {
    updateSessionHistory(pageName);
    updateGlobalHistory(pageName);
}

// --- Получение данных для страницы истории ---
export function getSessionHistory() {
    return JSON.parse(localStorage.getItem('sessionHistory') || '{}');
}

export function getGlobalHistory() {
    return JSON.parse(getCookie('globalHistory') || '{}');
}
