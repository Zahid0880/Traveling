// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Tab Switching
    const loginTabs = document.querySelectorAll(".login-tab")
    const loginForms = document.querySelectorAll(".login-form")
  
    loginTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabType = this.getAttribute("data-tab")
  
        // Remove active class from all tabs and forms
        loginTabs.forEach((t) => t.classList.remove("active"))
        loginForms.forEach((f) => f.classList.remove("active"))
  
        // Add active class to clicked tab and corresponding form
        this.classList.add("active")
        document.getElementById(`${tabType}-form`).classList.add("active")
      })
    })
  
    // Form Validation
    const loginForm = document.querySelector("#login-form form")
    const registerForm = document.querySelector("#register-form form")
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simple validation
        const email = loginForm.querySelector('input[type="email"]').value
        const password = loginForm.querySelector('input[type="password"]').value
  
        if (!email || !password) {
          alert("Please fill in all fields")
          return
        }
  
        // Simulate successful login
        alert("Login successful! Redirecting to dashboard...")
        setTimeout(() => {
          window.location.href = "index.html"
        }, 1000)
      })
    }
  
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simple validation
        const inputs = registerForm.querySelectorAll("input")
        let isValid = true
  
        inputs.forEach((input) => {
          if (!input.value && input.type !== "checkbox") {
            isValid = false
          }
        })
  
        if (!isValid) {
          alert("Please fill in all fields")
          return
        }
  
        const terms = document.getElementById("terms")
        if (!terms.checked) {
          alert("Please agree to the Terms & Conditions")
          return
        }
  
        // Simulate successful registration
        alert("Registration successful! Please check your email to verify your account.")
  
        // Switch to login tab
        document.querySelector('.login-tab[data-tab="login"]').click()
      })
    }
  })
  