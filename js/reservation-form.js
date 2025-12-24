// Reservation Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Format the date
            const dateObj = new Date(data.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            // Create email body
            const emailBody = `
NEW RESERVATION REQUEST - The Wolf Den Bar & Grill

CONTACT INFORMATION:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

RESERVATION DETAILS:
Date: ${formattedDate}
Time: ${data.time}
Number of Guests: ${data.guests}
Seating Preference: ${data.seating || 'No preference'}

EVENT INFORMATION:
Occasion: ${data.occasion || 'Not specified'}

SPECIAL REQUESTS:
${data.specialRequests || 'None'}

MARKETING CONSENT: ${data.marketingConsent ? 'Yes' : 'No'}

---
Please confirm this reservation by contacting the customer.
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:grsonsinc@gmail.com?subject=Reservation Request - ${formattedDate} at ${data.time}&body=${encodeURIComponent(emailBody)}`;
            
            // Create SMS link for text notification
            const smsBody = `New reservation: ${data.firstName} ${data.lastName}, ${data.guests} guests on ${formattedDate} at ${data.time}. Phone: ${data.phone}`;
            const smsLink = `sms:+17754486946&body=${encodeURIComponent(smsBody)}`;
            
            // Show confirmation message
            alert(`Thank you for your reservation request, ${data.firstName}!\n\nReservation Details:\nDate: ${formattedDate}\nTime: ${data.time}\nGuests: ${data.guests}\n\nWe'll confirm your reservation within 24 hours.`);
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Optional: Open SMS
            setTimeout(() => {
                if (confirm('Would you like to send an SMS notification as well?')) {
                    window.location.href = smsLink;
                }
            }, 1000);
            
            // Reset form
            setTimeout(() => {
                this.reset();
            }, 2000);
        });
        
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            
            // Set maximum date to 90 days from now
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 90);
            dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
        }
        
        // Validate that reservation is not on Tuesday (closed day)
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const dayOfWeek = selectedDate.getDay();
            
            // Tuesday is 2
            if (dayOfWeek === 2) {
                alert('We are closed on Tuesdays. Please select a different date.');
                this.value = '';
            }
        });
        
        // Update guest count if "More than 10" is selected
        const guestsSelect = document.getElementById('guests');
        if (guestsSelect) {
            guestsSelect.addEventListener('change', function() {
                if (this.value === '10+') {
                    const customCount = prompt('Please enter the exact number of guests:');
                    if (customCount && !isNaN(customCount) && customCount > 10) {
                        // Create a new option with the custom value
                        const option = document.createElement('option');
                        option.value = customCount;
                        option.text = `${customCount} Guests`;
                        option.selected = true;
                        this.appendChild(option);
                    }
                }
            });
        }
    }
});
