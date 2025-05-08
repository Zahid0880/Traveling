// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Animate achievement numbers
    const achievementNumbers = document.querySelectorAll(".achievement-number")
  
    // Function to animate counting
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        obj.innerHTML = Math.floor(progress * (end - start) + start)
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  
    // Function to check if an element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
  
    // Check if achievements are in viewport on scroll
    let animated = false
    window.addEventListener("scroll", () => {
      if (!animated && achievementNumbers.length > 0 && isInViewport(document.querySelector(".achievements"))) {
        animated = true
  
        // Animate each achievement number
        achievementNumbers.forEach((number) => {
          const finalValue = Number.parseInt(number.getAttribute("data-count"), 10)
          animateValue(number, 0, finalValue, 2000)
        })
      }
    })
  
    // Contact Form Submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // In a real application, you would send this data to a server
        console.log("Form submitted with values:", { name, email, subject, message })
  
        // Show success message (in a real app, this would happen after successful submission)
        alert("Thank you for your message! We'll get back to you soon.")
  
        // Reset form
        contactForm.reset()
      })
    }
  
    // Testimonial Navigation
    const testimonialPrev = document.querySelector(".testimonial-navigation .prev")
    const testimonialNext = document.querySelector(".testimonial-navigation .next")
  
    if (testimonialPrev && testimonialNext) {
      testimonialPrev.addEventListener("click", () => {
        testimonialPrev.classList.add("active")
        testimonialNext.classList.remove("active")
        // Here you would show the previous testimonial
        console.log("Previous testimonial")
      })
  
      testimonialNext.addEventListener("click", () => {
        testimonialNext.classList.add("active")
        testimonialPrev.classList.remove("active")
        // Here you would show the next testimonial
        console.log("Next testimonial")
      })
    }
  })
  