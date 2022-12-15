// import { Navbar as BootstrapNavbar } from 'bootstrap';
import logo from '../../img/logo.png';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */
const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const authenticatedUser = getAuthenticatedUser();

  const anonymousNavBar = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a href="#"><img class="nav-link" aria-current="page" data-uri="/" src = '${logo}' alt = "logo" width = "70"></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li id="loginItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/login">Login</a>
              </li>
              <li id="registerItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/register">Register</a>
              </li>             
            </ul>
          </div>
        </div>
      </nav>
  `;

  const authNavBar = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a href="#" id = "LOGO"><img class="nav-link" aria-current="page" data-uri="/" src = '${logo}' alt = "logo" width = "100"></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li id="createQuizItem" class="nav-item">
              <a class="nav-link" href="/createQuiz" data-uri="/createQuiz">Create a Quiz</a>
              </li> 
              <li class="nav-item adminPageBtn">
              <a class="nav-link adminPage" href="#" data-uri="/admin">Admin Page</a>
              </li> 
              <li id="logoutItem" class="nav-item">
              <a class="nav-link" href="/logout" data-uri="/logout">Logout</a>
              </li> 
              <li class="nav-item">
              <a class="nav-link disabled" href="#">${authenticatedUser?.username}</a>
              </li>           
            </ul>
          </div>
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = isAuthenticated() ? authNavBar : anonymousNavBar;
  if (authenticatedUser?.isAnAdmin === false) {
    const adminPageBtn = document.querySelector('.adminPageBtn');
    adminPageBtn.classList.add('d-none');
  }
}

export default Navbar;
