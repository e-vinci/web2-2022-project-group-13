const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const footer = document.querySelector('footer');

  const footerHtml = `
    <div class="text-center p-3 text-light">
    © 2022 Copyright:
    <p class="text-light">Created by : Benbouchta Younes / Duong Quoc An / Nguyen Kyle / Vlaminck Maxime / Yi Nghi Ke Man</p>
    </div>
    `;
  footer.innerHTML = footerHtml;
}

export default Navbar;
