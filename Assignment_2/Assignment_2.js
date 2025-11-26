document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user input
    const name = document.getElementById('name').value;
    const college = document.getElementById('college').value;
    const location = document.getElementById('location').value;
    const photoInput = document.getElementById('photo');

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Display photo
            document.getElementById('displayPhoto').src = e.target.result;
            
            // Display other data
            document.getElementById('displayName').textContent = name;
            document.getElementById('displayCollege').textContent = college;
            document.getElementById('displayLocation').textContent = location;

            // Hide the form and show the ID card
            document.getElementById('userForm').classList.add('hidden');
            document.getElementById('idCardContainer').classList.remove('hidden');
        }
        
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        alert("Please upload a photo.");
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const idCardElement = document.getElementById('idCard');
    const name = document.getElementById('name').value.trim().replace(/ /g, '_');

    html2canvas(idCardElement, {
        useCORS: true, // This helps if images are from other domains
        scale: 2 // Increase scale for better quality
    }).then(canvas => {
        // Create an "a" element to trigger the download
        const link = document.createElement('a');
        link.download = `ID-Card_${name}.png`;
        link.href = canvas.toDataURL('image/png');
        
        // Append link to the body, click it, and then remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(err => {
        console.error('Oops, something went wrong!', err);
        alert('Could not download the ID card. Please try again.');
    });
});