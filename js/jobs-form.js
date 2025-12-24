// Jobs Application Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const jobForm = document.getElementById('jobApplicationForm');
    
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                if (key === 'resume') {
                    data[key] = value.name;
                } else {
                    data[key] = value;
                }
            }
            
            // Create email body
            const emailBody = `
NEW JOB APPLICATION - The Wolf Den Bar & Grill

PERSONAL INFORMATION:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address || 'Not provided'}
City: ${data.city || 'Not provided'}
State: ${data.state || 'Not provided'}
ZIP: ${data.zip || 'Not provided'}

POSITION DETAILS:
Position: ${data.position}
Availability: ${data.availability}
Start Date: ${data.startDate || 'Not specified'}

EXPERIENCE:
Years of Experience: ${data.experience || 'Not specified'}
Previous Employer: ${data.previousEmployer || 'Not provided'}

WHY WOLF DEN:
${data.coverLetter}

LEGAL CONFIRMATIONS:
Over 18: ${data.over18 ? 'Yes' : 'No'}
Legally Authorized to Work: ${data.legallyAuthorized ? 'Yes' : 'No'}

ADDITIONAL INFORMATION:
${data.additionalInfo || 'None provided'}

RESUME: ${data.resume}
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:grsonsinc@gmail.com?subject=Job Application - ${data.position} - ${data.firstName} ${data.lastName}&body=${encodeURIComponent(emailBody)}`;
            
            // Create SMS link for text notification
            const smsBody = `New job application from ${data.firstName} ${data.lastName} for ${data.position}. Email: ${data.email}, Phone: ${data.phone}`;
            const smsLink = `sms:+17754486946&body=${encodeURIComponent(smsBody)}`;
            
            // Show confirmation message
            alert(`Thank you for your application, ${data.firstName}!\n\nYour application is being prepared. Please check your email client to send the application.\n\nWe'll review your information and contact you soon.`);
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Optional: Open SMS (you can comment this out if not needed)
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
        
        // File upload validation
        const resumeInput = document.getElementById('resume');
        if (resumeInput) {
            resumeInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    // Check file size (5MB max)
                    if (file.size > 5 * 1024 * 1024) {
                        alert('File size must be less than 5MB');
                        this.value = '';
                        return;
                    }
                    
                    // Check file type
                    const allowedTypes = ['.pdf', '.doc', '.docx'];
                    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                    if (!allowedTypes.includes(fileExt)) {
                        alert('Please upload a PDF, DOC, or DOCX file');
                        this.value = '';
                        return;
                    }
                }
            });
        }
        
        // Set minimum date to today
        const startDateInput = document.getElementById('startDate');
        if (startDateInput) {
            const today = new Date().toISOString().split('T')[0];
            startDateInput.setAttribute('min', today);
        }
    }
});
