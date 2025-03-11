// Dummy data
const hospitals = {
    "Apollo Hospital": ["Cardiology", "Neurology", "Orthopedics"],
    "Fortis Hospital": ["Pediatrics", "ENT", "Dermatology"]
};

const doctors = {
    "Cardiology": ["Dr. A Sharma", "Dr. B Gupta"],
    "Neurology": ["Dr. C Verma", "Dr. D Singh"],
    "Orthopedics": ["Dr. E Chauhan", "Dr. F Rana"],
    "Pediatrics": ["Dr. G Jain", "Dr. H Kapoor"],
    "ENT": ["Dr. I Mehra", "Dr. J Patel"],
    "Dermatology": ["Dr. K Sharma", "Dr. L Das"]
};

const availableSlots = {
    "Dr. A Sharma": ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"],
    "Dr. B Gupta": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. C Verma": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. D Singh": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. E Chauhan": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. F Rana": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. G Jain": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. H Kapoor": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. I Mehra": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. J Patel": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. K Sharma": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    "Dr. L Das": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"]
};

// Function to hide previously displayed cards
function hideCards() {
    const cardContainers = document.querySelectorAll('.card-container');
    cardContainers.forEach(container => {
        container.style.display = 'none'; // Hide each card container
    });
}

// Step 1: Load hospitals
window.onload = function() {
    const hospitalSelect = document.getElementById("hospital-select");
    Object.keys(hospitals).forEach(hospital => {
        const option = document.createElement("option");
        option.value = hospital;
        option.text = hospital;
        hospitalSelect.appendChild(option);
    });
};

// Step 2: Load departments based on selected hospital
function loadDepartments() {
    const hospital = document.getElementById("hospital-select").value;
    const departmentSelect = document.getElementById("department-select");
    departmentSelect.innerHTML = "<option value=''>Select a Department</option>";

    if (hospital) {
        hospitals[hospital].forEach(department => {
            const option = document.createElement("option");
            option.value = department;
            option.text = department;
            departmentSelect.appendChild(option);
        });
        // Hide previously displayed cards
        hideCards();
        document.getElementById("step2").style.display = "block";
    } else {
        document.getElementById("step2").style.display = "none";
    }
}

// Step 3: Load doctors based on selected department
function loadDoctors() {
    const department = document.getElementById("department-select").value;
    const doctorSelect = document.getElementById("doctor-select");
    doctorSelect.innerHTML = "<option value=''>Select a Doctor</option>";

    if (department) {
        doctors[department].forEach(doctor => {
            const option = document.createElement("option");
            option.value = doctor;
            option.text = doctor;
            doctorSelect.appendChild(option);
        });
        // Hide previously displayed cards
        hideCards();
        document.getElementById("step3").style.display = "block";
    } else {
        document.getElementById("step3").style.display = "none";
    }
}

// Step 4: Load available slots based on selected doctor
function loadSlots() {
    const doctor = document.getElementById("doctor-select").value;
    const slotContainer = document.getElementById("slot-container");
    slotContainer.innerHTML = "";

    if (doctor) {
        availableSlots[doctor].forEach(slot => {
            const div = document.createElement("div");
            div.className = "slot";
            div.innerText = slot;

            // Simulate some slots being full
            if (Math.random() < 0.3) {
                div.classList.add("full");
                div.innerText += " (Full)";
            } else {
                div.onclick = function() {
                    selectSlot(doctor, slot);
                };
            }

            slotContainer.appendChild(div);
        });
        // Hide previously displayed cards
        hideCards();
        document.getElementById("step4").style.display = "block";
    } else {
        document.getElementById("step4").style.display = "none";
    }
}

// Step 5: Show booking summary
function selectSlot(doctor, slot) {
    document.getElementById("summary-text").innerText = `You have selected Dr. ${doctor} at ${slot}.`;
    document.getElementById("booking-summary").style.display = "block";
}

// Step 6: Confirm booking (you can replace this with actual server-side code)
function confirmBooking() {
    alert("Your booking is confirmed! A notification will be sent a day before.");
    location.reload(); // Reload the page or redirect as needed
}
