function loadWards() {
    const hospital = document.getElementById('hospital').value;
    const wardsContainer = document.getElementById('wards-container');
    const message = document.getElementById('message');

    // Clear previous ward boxes and message
    wardsContainer.innerHTML = '';
    message.innerHTML = '';

    if (hospital) {
        // Set the message
        message.innerHTML = 'Select your ward:';

        // Example ward options based on the selected hospital
        const wards = {
            hospital1: [
                'General Ward',
                'ICU (Intensive Care Unit)',
                'CCU (Cardiac Care Unit)',
                'NICU (Neonatal Intensive Care Unit)',
                'PICU (Pediatric Intensive Care Unit)',
                'Maternity Ward',
                'Surgical Ward',
                'Orthopedic Ward',
                'Oncology Ward',
                'Dialysis Ward'
            ],
            hospital2: [
                'General Ward',
                'Maternity Ward',
                'ICU (Intensive Care Unit)',
                'Oncology Ward',
                'Dialysis Ward',
                'Pediatric Ward',
                'Psychiatric Ward',
                'Trauma Ward',
                'Burns Ward',
                'Plastic Surgery Ward'
            ],
            hospital3: [
                'Orthopedic Ward',
                'Surgical Ward',
                'Geriatric Ward',
                'Burns Ward',
                'Plastic Surgery Ward',
                'Pulmonology Ward',
                'Endocrinology Ward',
                'Rheumatology Ward',
                'Urology Ward',
                'Neurology Ward'
            ]
        };

        // Create and append ward boxes
        wards[hospital].forEach(ward => {
            const wardBox = document.createElement('div');
            wardBox.className = 'ward-box';
            wardBox.innerHTML = `<h3>${ward}</h3>`;

            // Add click event to redirect to availability page
            wardBox.addEventListener('click', () => {
                window.location.href = `availability.html?hospital=${hospital}&ward=${encodeURIComponent(ward)}`;
            });

            wardsContainer.appendChild(wardBox);
        });
    }
}
