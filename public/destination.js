// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Map Points Interaction
    const mapPoints = document.querySelectorAll(".map-point")
    const mapTooltip = document.querySelector(".map-tooltip")
  
    mapPoints.forEach((point) => {
      point.addEventListener("mouseenter", function (e) {
        // Get location data
        const location = this.getAttribute("data-location")
  
        // Update tooltip content
        const tooltipLocation = mapTooltip.querySelector(".tooltip-location")
        const tooltipLink = mapTooltip.querySelector(".tooltip-link")
  
        tooltipLocation.textContent = location
        tooltipLink.setAttribute("href", `#${location.toLowerCase().replace(/\s+/g, "-")}`)
  
        // Position tooltip near the point
        const pointRect = this.getBoundingClientRect()
        const mapRect = document.querySelector(".map-placeholder").getBoundingClientRect()
  
        const top = this.offsetTop - 70
        const left = this.offsetLeft + 15
  
        mapTooltip.style.top = `${top}px`
        mapTooltip.style.left = `${left}px`
  
        // Show tooltip
        mapTooltip.style.display = "flex"
  
        // Add active class to point
        mapPoints.forEach((p) => p.classList.remove("active"))
        this.classList.add("active")
      })
    })
  
    // Hide tooltip when mouse leaves the map
    document.querySelector(".map-container").addEventListener("mouseleave", () => {
      mapTooltip.style.display = "none"
      mapPoints.forEach((p) => p.classList.remove("active"))
    })
  
    // Destination Search Functionality
    const searchBtn = document.querySelector(".destination-search .btn-primary")
  
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        const location = document.querySelector(".destination-search input").value
        const type = document.querySelector(".destination-search select:nth-of-type(1)").value
        const price = document.querySelector(".destination-search select:nth-of-type(2)").value
  
        // In a real application, you would perform a search with these parameters
        console.log("Searching for destinations with parameters:", { location, type, price })
  
        // For demo purposes, we'll just scroll to the featured destinations section
        document.querySelector(".featured-destinations").scrollIntoView({ behavior: "smooth" })
      })
    }
  
    // Category Card Hover Effect
    const categoryCards = document.querySelectorAll(".category-card")
  
    categoryCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.querySelector(".category-image img").style.transform = "scale(1.1)"
      })
  
      card.addEventListener("mouseleave", function () {
        this.querySelector(".category-image img").style.transform = "scale(1)"
      })
    })
  })
  