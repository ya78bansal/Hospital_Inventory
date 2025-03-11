// Function to load Test Types after selecting a hospital
function loadTestTypes() {
    const hospital = document.getElementById("test-hospital-select").value;

    // Dummy test types (can be fetched from server later)
    const testTypes = ["Blood Test", "MRI Scan", "CT Scan", "X-Ray", "Ultrasound"];
    
    const testTypeSelect = document.getElementById("test-type-select");
    testTypeSelect.innerHTML = "<option value=''>Select a Test</option>";

    testTypes.forEach(test => {
        const option = document.createElement("option");
        option.value = test;
        option.text = test;
        testTypeSelect.appendChild(option);
    });

    // Display the next step
    document.getElementById("test-step2").style.display = "block";
}

// Function to load available time slots after selecting test type
function loadTestSlots() {
    const testType = document.getElementById("test-type-select").value;

    // Dummy slots (available times can be fetched from server)
    const slots = {
        "9:00 AM": 3,
        "9:30 AM": 2,
        "10:00 AM": 5, // Full slot
        "10:30 AM": 1,
        "11:00 AM": 0
    };

    const slotContainer = document.getElementById("test-slot-container");
    slotContainer.innerHTML = "";

    Object.keys(slots).forEach(slot => {
        const div = document.createElement("div");
        div.className = "slot";
        div.innerText = slot;

        if (slots[slot] >= 5) {
            div.classList.add("full");
            div.innerText += " (Full)";
        } else {
            div.onclick = function () {
                selectTestSlot(testType, slot);
            };
        }

        slotContainer.appendChild(div);
    });

    // Display the next step
    document.getElementById("test-step3").style.display = "block";
}

// Function to select a slot and display summary
let selectedTestType, selectedTestSlot;
function selectTestSlot(testType, slot) {
    selectedTestType = testType;
    selectedTestSlot = slot;

    const summaryText = `You have selected ${testType} at ${slot}.`;
    document.getElementById("test-summary-text").innerText = summaryText;

    // Display booking summary
    document.getElementById("test-booking-summary").style.display = "block";
}

// Function to confirm booking
function confirmTestBooking() {
    alert(`Test Booking Confirmed!\nTest: ${selectedTestType}\nSlot: ${selectedTestSlot}`);
    
    // Reset after confirmation
    document.getElementById("test-step1").style.display = "block";
    document.getElementById("test-step2").style.display = "none";
    document.getElementById("test-step3").style.display = "none";
    document.getElementById("test-booking-summary").style.display = "none";
}
