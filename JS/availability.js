document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const hospital = params.get('hospital');
    const ward = decodeURIComponent(params.get('ward')); // Get ward name from URL params

    const availabilityInfo = document.getElementById('availability-info');
    const wardNameElement = document.getElementById('ward-name'); // Get the h2 element for ward name
    const bookingBox = document.querySelector('.booking-box');
    const bookBedButton = document.createElement('button'); // Create the Book Your Bed button

    // Example data for bed availability with random values
    const availability = {
        'hospital1': {
            'General Ward': generateRandomBeds(),
            'ICU (Intensive Care Unit)': generateRandomBeds(),
            'CCU (Cardiac Care Unit)': generateRandomBeds(),
            'NICU (Neonatal Intensive Care Unit)': generateRandomBeds(),
            'PICU (Pediatric Intensive Care Unit)': generateRandomBeds(),
            'Maternity Ward': generateRandomBeds(),
            'Surgical Ward': generateRandomBeds(),
            'Orthopedic Ward': generateRandomBeds(),
            'Oncology Ward': generateRandomBeds(),
            'Dialysis Ward': generateRandomBeds()
        },
        'hospital2': {
            'General Ward': generateRandomBeds(),
            'Maternity Ward': generateRandomBeds(),
            'ICU (Intensive Care Unit)': generateRandomBeds(),
            'Oncology Ward': generateRandomBeds(),
            'Dialysis Ward': generateRandomBeds(),
            'Pediatric Ward': generateRandomBeds(),
            'Psychiatric Ward': generateRandomBeds(),
            'Trauma Ward': generateRandomBeds(),
            'Burns Ward': generateRandomBeds(),
            'Plastic Surgery Ward': generateRandomBeds()
        },
        'hospital3': {
            'Orthopedic Ward': generateRandomBeds(),
            'Surgical Ward': generateRandomBeds(),
            'Geriatric Ward': generateRandomBeds(),
            'Burns Ward': generateRandomBeds(),
            'Plastic Surgery Ward': generateRandomBeds(),
            'Pulmonology Ward': generateRandomBeds(),
            'Endocrinology Ward': generateRandomBeds(),
            'Rheumatology Ward': generateRandomBeds(),
            'Urology Ward': generateRandomBeds(),
            'Neurology Ward': generateRandomBeds()
        }
    };

    function generateRandomBeds() {
        const totalBeds = Math.floor(Math.random() * 20) + 10; // Total beds between 10 and 30
        const availableBeds = Math.floor(Math.random() * (totalBeds + 1)); // Available beds between 0 and total beds
        return { totalBeds, availableBeds };
    }

    // Display the availability information and update ward name
    if (hospital && ward && availability[hospital] && availability[hospital][ward]) {
        const { totalBeds, availableBeds } = availability[hospital][ward];
        wardNameElement.textContent = ward; // Update the heading with the selected ward name
        availabilityInfo.innerHTML = `
            <h2>${ward}</h2>
            <p>Hospital: ${hospital}</p>
            <p>Total Beds: ${totalBeds}</p>
            <p>Available Beds: ${availableBeds}</p>
        `;
    } else {
        availabilityInfo.innerHTML = '<p>No information available.</p>';
    }

    

    // Add the Book Your Bed button
    bookBedButton.textContent = 'Book Your Bed';
    bookingBox.appendChild(bookBedButton);

    // Add event listener for the Book Your Bed button
    bookBedButton.addEventListener('click', () => {
        // Redirect to wish.html with hospital and ward information
        window.location.href = `request-from.html?hospital=${hospital}&ward=${encodeURIComponent(ward)}`;
    });
});
