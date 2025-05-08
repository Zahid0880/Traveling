// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Variables to store trip data
    const tripData = {
      destination: "",
      departureDate: "",
      returnDate: "",
      adults: 2,
      children: 0,
      infants: 0,
      activities: [],
      accommodation: "hotel",
      preferences: [],
    }
  
    // Step Navigation
    const nextButtons = document.querySelectorAll(".next-step")
    const prevButtons = document.querySelectorAll(".prev-step")
    const progressSteps = document.querySelectorAll(".progress-step")
  
    // Function to go to next step
    function goToNextStep(currentStep, nextStep) {
      // Hide current step
      document.getElementById(`${currentStep}-step`).classList.remove("active")
  
      // Show next step
      document.getElementById(`${nextStep}-step`).classList.add("active")
  
      // Update progress indicator
      progressSteps.forEach((step) => {
        if (step.getAttribute("data-step") === currentStep) {
          step.classList.add("completed")
        }
        if (step.getAttribute("data-step") === nextStep) {
          step.classList.add("active")
        }
      })
    }
  
    // Function to go to previous step
    function goToPrevStep(currentStep, prevStep) {
      // Hide current step
      document.getElementById(`${currentStep}-step`).classList.remove("active")
  
      // Show previous step
      document.getElementById(`${prevStep}-step`).classList.add("active")
  
      // Update progress indicator
      progressSteps.forEach((step) => {
        if (step.getAttribute("data-step") === currentStep) {
          step.classList.remove("active")
        }
        if (step.getAttribute("data-step") === prevStep) {
          step.classList.add("active")
        }
      })
    }
  
    // Add event listeners to next buttons
    nextButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const currentStep = this.getAttribute("data-next")
        const nextStep = this.getAttribute("data-next")
  
        // Validate and save data before proceeding
        if (validateStep(currentStep)) {
          saveStepData(currentStep)
          goToNextStep(currentStep, nextStep)
        }
      })
    })
  
    // Add event listeners to previous buttons
    prevButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const currentStep = this.parentElement.parentElement.id.replace("-step", "")
        const prevStep = this.getAttribute("data-prev")
        goToPrevStep(currentStep, prevStep)
      })
    })
  
    // Progress step click navigation
    progressSteps.forEach((step) => {
      step.addEventListener("click", function () {
        const clickedStep = this.getAttribute("data-step")
        const currentStep = document.querySelector(".planner-step.active").id.replace("-step", "")
  
        // Only allow navigation to completed steps or the current active step
        if (this.classList.contains("completed") || this.classList.contains("active")) {
          document.getElementById(`${currentStep}-step`).classList.remove("active")
          document.getElementById(`${clickedStep}-step`).classList.add("active")
  
          // Update active state in progress
          progressSteps.forEach((s) => s.classList.remove("active"))
          this.classList.add("active")
        }
      })
    })
  
    // Destination Selection
    const destinationOptions = document.querySelectorAll(".destination-option")
    const destinationInput = document.getElementById("destination-input")
  
    destinationOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const destination = this.getAttribute("data-destination")
        destinationInput.value = destination
  
        // Remove selected class from all options
        destinationOptions.forEach((opt) => opt.classList.remove("selected"))
  
        // Add selected class to clicked option
        this.classList.add("selected")
  
        // Update trip data
        tripData.destination = destination
      })
    })
  
    // Date Selection
    const departureDate = document.getElementById("departure-date")
    const returnDate = document.getElementById("return-date")
    const tripDays = document.getElementById("trip-days")
  
    // Set min date to today
    const today = new Date()
    const todayFormatted = today.toISOString().split("T")[0]
    departureDate.setAttribute("min", todayFormatted)
  
    departureDate.addEventListener("change", function () {
      // Set min return date to departure date
      returnDate.setAttribute("min", this.value)
  
      // Update trip duration if both dates are selected
      if (returnDate.value) {
        updateTripDuration()
      }
    })
  
    returnDate.addEventListener("change", () => {
      if (departureDate.value) {
        updateTripDuration()
      }
    })
  
    function updateTripDuration() {
      const start = new Date(departureDate.value)
      const end = new Date(returnDate.value)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
      tripDays.textContent = diffDays
  
      // Update trip data
      tripData.departureDate = departureDate.value
      tripData.returnDate = returnDate.value
    }
  
    // Travelers Count
    const adultsCount = document.getElementById("adults-count")
    const childrenCount = document.getElementById("children-count")
    const infantsCount = document.getElementById("infants-count")
    const increaseButtons = document.querySelectorAll(".increase")
    const decreaseButtons = document.querySelectorAll(".decrease")
  
    increaseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input")
        input.value = Number.parseInt(input.value) + 1
        updateTravelersCount()
      })
    })
  
    decreaseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input")
        if (Number.parseInt(input.value) > Number.parseInt(input.getAttribute("min"))) {
          input.value = Number.parseInt(input.value) - 1
          updateTravelersCount()
        }
      })
    })
  
    function updateTravelersCount() {
      tripData.adults = Number.parseInt(adultsCount.value)
      tripData.children = Number.parseInt(childrenCount.value)
      tripData.infants = Number.parseInt(infantsCount.value)
    }
  
    // Activities Selection
    const activityCheckboxes = document.querySelectorAll(".activity-option input")
  
    activityCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateSelectedActivities()
      })
    })
  
    function updateSelectedActivities() {
      tripData.activities = []
      activityCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          tripData.activities.push(checkbox.id.replace("activity-", ""))
        }
      })
    }
  
    // Accommodation Selection
    const accommodationRadios = document.querySelectorAll(".accommodation-type input")
    const preferenceCheckboxes = document.querySelectorAll(".preference-option input")
  
    accommodationRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        tripData.accommodation = this.id
      })
    })
  
    preferenceCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateAccommodationPreferences()
      })
    })
  
    function updateAccommodationPreferences() {
      tripData.preferences = []
      preferenceCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          tripData.preferences.push(checkbox.id.replace("preference-", ""))
        }
      })
    }
  
    // Summary Step
    const summaryDestination = document.getElementById("summary-destination")
    const summaryDates = document.getElementById("summary-dates")
    const summaryTravelers = document.getElementById("summary-travelers")
    const summaryActivities = document.getElementById("summary-activities")
    const summaryAccommodation = document.getElementById("summary-accommodation")
    const costAccommodation = document.getElementById("cost-accommodation")
    const costActivities = document.getElementById("cost-activities")
    const costTransportation = document.getElementById("cost-transportation")
    const costTotal = document.getElementById("cost-total")
  
    // Function to update summary
    function updateSummary() {
      // Update destination
      summaryDestination.textContent = tripData.destination || "Not selected"
  
      // Update dates
      if (tripData.departureDate && tripData.returnDate) {
        const start = new Date(tripData.departureDate)
        const end = new Date(tripData.returnDate)
        summaryDates.textContent = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
      } else {
        summaryDates.textContent = "Not selected"
      }
  
      // Update travelers
      const totalTravelers = tripData.adults + tripData.children + tripData.infants
      let travelersText = `${totalTravelers} total: `
      travelersText += `${tripData.adults} adult${tripData.adults !== 1 ? "s" : ""}`
      if (tripData.children > 0) {
        travelersText += `, ${tripData.children} child${tripData.children !== 1 ? "ren" : ""}`
      }
      if (tripData.infants > 0) {
        travelersText += `, ${tripData.infants} infant${tripData.infants !== 1 ? "s" : ""}`
      }
      summaryTravelers.textContent = travelersText
  
      // Update activities
      if (tripData.activities.length > 0) {
        summaryActivities.textContent = tripData.activities
          .map((activity) => activity.charAt(0).toUpperCase() + activity.slice(1))
          .join(", ")
      } else {
        summaryActivities.textContent = "None selected"
      }
  
      // Update accommodation
      let accommodationText = tripData.accommodation.charAt(0).toUpperCase() + tripData.accommodation.slice(1)
      if (tripData.preferences.length > 0) {
        accommodationText += ` with ${tripData.preferences
          .map((pref) => pref.charAt(0).toUpperCase() + pref.slice(1))
          .join(", ")}`
      }
      summaryAccommodation.textContent = accommodationText
  
      // Calculate estimated costs (simplified for demo)
      calculateEstimatedCosts()
    }
  
    // Function to calculate estimated costs
    function calculateEstimatedCosts() {
      // These would be more complex calculations in a real application
      const days =
        tripData.departureDate && tripData.returnDate
          ? Math.ceil(Math.abs(new Date(tripData.returnDate) - new Date(tripData.departureDate)) / (1000 * 60 * 60 * 24))
          : 0
  
      const baseAccommodationCost = {
        hotel: 150,
        resort: 250,
        apartment: 120,
        villa: 300,
        hostel: 50,
      }
  
      const activityCostPerDay = 50
      const transportationCostPerPerson = 200
  
      // Calculate accommodation cost
      const accommodationCost =
        days * baseAccommodationCost[tripData.accommodation] * (tripData.preferences.length > 0 ? 1.2 : 1) // 20% more for preferences
  
      // Calculate activities cost
      const activitiesCost = days * activityCostPerDay * tripData.activities.length
  
      // Calculate transportation cost
      const transportationCost = transportationCostPerPerson * (tripData.adults + tripData.children)
  
      // Update cost display
      costAccommodation.textContent = `$${accommodationCost.toFixed(0)}`
      costActivities.textContent = `$${activitiesCost.toFixed(0)}`
      costTransportation.textContent = `$${transportationCost.toFixed(0)}`
      costTotal.textContent = `$${(accommodationCost + activitiesCost + transportationCost).toFixed(0)}`
    }
  
    // Function to validate step data
    function validateStep(step) {
      switch (step) {
        case "destination":
          if (!tripData.destination && !destinationInput.value) {
            alert("Please select or enter a destination")
            return false
          }
          return true
  
        case "dates":
          if (!departureDate.value || !returnDate.value) {
            alert("Please select both departure and return dates")
            return false
          }
          return true
  
        case "travelers":
          if (tripData.adults < 1) {
            alert("There must be at least 1 adult traveler")
            return false
          }
          return true
  
        default:
          return true
      }
    }
  
    // Function to save step data
    function saveStepData(step) {
      switch (step) {
        case "destination":
          tripData.destination = destinationInput.value || tripData.destination
          break
  
        case "dates":
          tripData.departureDate = departureDate.value
          tripData.returnDate = returnDate.value
          break
  
        case "travelers":
          updateTravelersCount()
          break
  
        case "activities":
          updateSelectedActivities()
          break
  
        case "accommodation":
          updateAccommodationPreferences()
          break
  
        case "summary":
          updateSummary()
          break
      }
  
      // If going to summary step, update the summary
      if (step === "accommodation") {
        updateSummary()
      }
    }
  
    // Save and Book Trip buttons
    const saveTrip = document.getElementById("save-trip")
    const bookTrip = document.getElementById("book-trip")
  
    saveTrip.addEventListener("click", () => {
      alert("Trip saved to your account!")
      // In a real application, this would save the trip to the user's account
    })
  
    bookTrip.addEventListener("click", () => {
      alert("Proceeding to payment...")
      // In a real application, this would redirect to a payment page
    })
  })
  