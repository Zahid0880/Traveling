// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Category Tags Functionality
    const categoryTags = document.querySelectorAll(".category-tag")
  
    categoryTags.forEach((tag) => {
      tag.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Remove active class from all tags
        categoryTags.forEach((t) => t.classList.remove("active"))
  
        // Add active class to clicked tag
        this.classList.add("active")
  
        // In a real application, you would filter articles by category
        const category = this.textContent.trim()
        console.log(`Filtering articles by category: ${category}`)
  
        // For demo purposes, we'll just log the category
        if (category === "All") {
          console.log("Showing all articles")
        } else {
          console.log(`Showing articles in category: ${category}`)
        }
      })
    })
  
    // Search Functionality
    const searchBtn = document.querySelector(".search-btn")
    const searchInput = document.querySelector(".search-input input")
  
    if (searchBtn && searchInput) {
      searchBtn.addEventListener("click", (e) => {
        e.preventDefault()
  
        const searchTerm = searchInput.value.trim()
        if (searchTerm) {
          // In a real application, you would search for articles
          console.log(`Searching for: ${searchTerm}`)
        }
      })
  
      // Also trigger search on Enter key
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          searchBtn.click()
        }
      })
    }
  
    // Pagination Functionality
    const paginationNumbers = document.querySelectorAll(".pagination-number")
    const paginationPrev = document.querySelector(".pagination-arrow.prev")
    const paginationNext = document.querySelector(".pagination-arrow.next")
  
    if (paginationNumbers.length) {
      paginationNumbers.forEach((num) => {
        num.addEventListener("click", function (e) {
          e.preventDefault()
  
          // Remove active class from all numbers
          paginationNumbers.forEach((n) => n.classList.remove("active"))
  
          // Add active class to clicked number
          this.classList.add("active")
  
          // In a real application, you would load the corresponding page
          const page = this.textContent.trim()
          console.log(`Loading page ${page}`)
        })
      })
  
      // Previous page functionality
      if (paginationPrev) {
        paginationPrev.addEventListener("click", (e) => {
          e.preventDefault()
  
          // Find current active page
          const activePage = document.querySelector(".pagination-number.active")
          if (
            activePage &&
            activePage.previousElementSibling &&
            activePage.previousElementSibling.classList.contains("pagination-number")
          ) {
            activePage.classList.remove("active")
            activePage.previousElementSibling.classList.add("active")
  
            const page = activePage.previousElementSibling.textContent.trim()
            console.log(`Loading previous page: ${page}`)
          }
        })
      }
  
      // Next page functionality
      if (paginationNext) {
        paginationNext.addEventListener("click", (e) => {
          e.preventDefault()
  
          // Find current active page
          const activePage = document.querySelector(".pagination-number.active")
          if (
            activePage &&
            activePage.nextElementSibling &&
            activePage.nextElementSibling.classList.contains("pagination-number")
          ) {
            activePage.classList.remove("active")
            activePage.nextElementSibling.classList.add("active")
  
            const page = activePage.nextElementSibling.textContent.trim()
            console.log(`Loading next page: ${page}`)
          }
        })
      }
    }
  })
  