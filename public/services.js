// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Service Card Interaction
    const serviceCards = document.querySelectorAll(".service-card")
  
    serviceCards.forEach((card) => {
      // Add hover animation
      card.addEventListener("mouseenter", function () {
        this.classList.add("hovered")
      })
  
      card.addEventListener("mouseleave", function () {
        this.classList.remove("hovered")
      })
  
      // Add click functionality
      card.addEventListener("click", function (e) {
        // Only trigger if the click is on the card but not on the button
        if (!e.target.classList.contains("service-btn") && !e.target.closest(".service-btn")) {
          const serviceType = this.getAttribute("data-service")
          showServiceDetails(serviceType)
        }
      })
    })
  
    // Function to show service details
    function showServiceDetails(serviceType) {
      // Remove active class from all cards
      serviceCards.forEach((card) => {
        card.classList.remove("active")
      })
  
      // Add active class to selected card
      const selectedCard = document.querySelector(`.service-card[data-service="${serviceType}"]`)
      if (selectedCard) {
        selectedCard.classList.add("active")
  
        // Scroll to the card if it's not in view
        selectedCard.scrollIntoView({ behavior: "smooth", block: "center" })
      }
  
      console.log(`Showing details for: ${serviceType}`)
      // In a real application, you would fetch and display detailed information about the service
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
  
    // Animate stats on scroll
    const stats = document.querySelectorAll(".stat-number")
  
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
  
    // Check if stats are in viewport on scroll
    let animated = false
    window.addEventListener("scroll", () => {
      if (!animated && stats.length > 0 && isInViewport(stats[0])) {
        animated = true
  
        // Animate each stat
        stats.forEach((stat) => {
          const finalValue = Number.parseInt(stat.textContent.replace(/\D/g, ""), 10)
          animateValue(stat, 0, finalValue, 2000)
        })
      }
    })
  })
  