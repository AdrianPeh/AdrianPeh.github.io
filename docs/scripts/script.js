const skillButtons = document.querySelectorAll('.skill-btn');
const detailsCard = document.getElementById('skill-details-card');

skillButtons.forEach(button => {
    button.addEventListener('mouseenter', (event) => {
        const details = button.getAttribute('data-details');
        const image = button.getAttribute('data-image');
        detailsCard.innerHTML = `
            <img src="${image}" alt="Skill Image" style="width: 100%; border-radius: 5px; margin-bottom: 10px;">
            <p>${details}</p>
        `;
        detailsCard.style.display = 'block';
        detailsCard.style.left = `${event.pageX + 10}px`;
        detailsCard.style.top = `${event.pageY + 10}px`;
    });

    button.addEventListener('mousemove', (event) => {
        detailsCard.style.left = `${event.pageX + 10}px`;
        detailsCard.style.top = `${event.pageY + 10}px`;
    });

    button.addEventListener('mouseleave', () => {
        detailsCard.style.display = 'none';
    });
});