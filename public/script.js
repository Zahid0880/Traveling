// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Destination Slider Functionality
  const prevBtn = document.querySelector(".destination-slider .prev")
  const nextBtn = document.querySelector(".destination-slider .next")
  const destinationCards = document.querySelector(".destination-cards")

  // Slide to next set of cards
  nextBtn.addEventListener("click", () => {
    destinationCards.scrollBy({
      left: 300,
      behavior: "smooth",
    })
  })

  // Slide to previous set of cards
  prevBtn.addEventListener("click", () => {
    destinationCards.scrollBy({
      left: -300,
      behavior: "smooth",
    })
  })

  // Filter Buttons Functionality
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      // Here you would typically filter the destinations
      // For demo purposes, we'll just console log the filter
      console.log("Filtered by:", this.textContent.trim())
    })
  })

  // Testimonial Navigation
  const testimonialPrev = document.querySelector(".testimonial-navigation .prev")
  const testimonialNext = document.querySelector(".testimonial-navigation .next")
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  let currentTestimonial = 0

  // Function to show testimonial by index
  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.remove("active")
      if (i === index) {
        card.classList.add("active")
      }
    })
  }

  testimonialPrev.addEventListener("click", () => {
    testimonialPrev.classList.add("active")
    testimonialNext.classList.remove("active")
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length
    showTestimonial(currentTestimonial)
  })

  testimonialNext.addEventListener("click", () => {
    testimonialNext.classList.add("active")
    testimonialPrev.classList.remove("active")
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
    showTestimonial(currentTestimonial)
  })

  // Mobile Menu Toggle (for responsive design)
  // This would be implemented if we had a hamburger menu

  // Date Picker Simulation
  const dateInput = document.querySelector('input[placeholder="Type Date"]')
  if (dateInput) {
    dateInput.addEventListener("focus", () => {
      // In a real application, you would initialize a date picker here
      console.log("Date picker would open here")
    })
  }
})
