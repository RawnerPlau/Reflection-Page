import { renderQuote } from './quotesView.js';
const views = {
    home: 'views/home.html',
    quotes: 'views/quotes.html',
    journal: 'views/journal.html'
  };
  
function loadView(viewName) {
  fetch(views[viewName])
    .then(res => res.text())
    .then(html => {
      document.getElementById('views-container').innerHTML = html;

      if (viewName === 'home') {
          renderQuote(); // Load the quote when the quote view is active
        }
    });
}
  
// Listen to clicks on the header nav
document.addEventListener('click', e => { 
  if (e.target.matches('a[data-view]')) {
    e.preventDefault();
    const viewName = e.target.getAttribute('data-view');
    if (viewName != "logout"){
      loadView(viewName);
    } else {
      localStorage.setItem('isLoggedIn', 'false')
      window.location.href = '/../views/login.html';
    }
      
  }
});
  
// Load default view on page load
window.addEventListener('DOMContentLoaded', () => {
  loadView('home');
});
  