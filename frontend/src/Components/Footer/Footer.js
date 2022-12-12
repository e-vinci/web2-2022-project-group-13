const Navbar = () => {
    renderNavbar();
  };
  
  function renderNavbar() {
    const footer = document.querySelector('footer');
    
    const footerHtml = `
    <div class="text-center p-3 text-light">
    © 2022 Copyright:
    <p class="text-light">created by : Younes Benbouchta / Quoc An Duong / Kyle Nguyen / Maxime Vlaminck / Ke Man Yi Nghi</p>
    </div>
    `
    footer.innerHTML = footerHtml;
  }
  
  export default Navbar;
  