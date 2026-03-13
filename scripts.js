document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menu-btn");
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const backToTop = document.getElementById("back-to-top");

  function setMenuState(isOpen) {
    menu.hidden = !isOpen;
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "☰";
  }

  function toggleMenu() {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  }

  function validateName() {
    const isValid = nameInput.value.trim() !== "";
    nameError.hidden = isValid;
    nameInput.setAttribute("aria-invalid", String(!isValid));
    return isValid;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const isValid = value !== "" && emailInput.checkValidity();
    emailError.hidden = isValid;
    emailInput.setAttribute("aria-invalid", String(!isValid));
    return isValid;
  }

  function handleFormSubmit(event) {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    if (!isNameValid || !isEmailValid) event.preventDefault();
  }

  function handleScroll() {
    backToTop.hidden = window.scrollY < 300;
  }

  function handleResize() {
    if (window.innerWidth >= 768) {
      menu.hidden = false;
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    } else {
      setMenuState(false);
    }
  }

  menuBtn.addEventListener("click", toggleMenu);
  form.addEventListener("submit", handleFormSubmit);
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);

  handleResize();
  handleScroll();
  nameError.hidden = true;
  emailError.hidden = true;
});
