document.addEventListener('DOMContentLoaded', () => {
    const p = document.querySelector('p');

    function updateAnimation (text) {
        p.classList.remove('p-animated');
        p.classList.remove('p-before-animated');

        p.style.opacity = '';
        p.style.transform = '';

        void p.offsetWidth;

        p.textContent = text;

        p.classList.add('p-animated');
        p.classList.add('p-before-animated');
    }

    function calculateLeft (value) {
        const dateNow = new Date();
        const birthDate = new Date(value);
        
        console.log(value);
        console.log(dateNow.toLocaleDateString());
        const timeLived = dateNow - birthDate;
        const daysLived = Math.floor(timeLived / (1000*60*60*24));
        const avrgYears = 80;
        const daysRemaining = (avrgYears * 365.25) - daysLived;
    
        updateAnimation('Average people live 80 years');
        setTimeout(() => {
            updateAnimation("It's 29 200 days");
            setTimeout(() => {
                updateAnimation(`You have ${daysRemaining} days left`);
                createProgressBar(daysLived, avrgYears);
            }, 2500);
        }, 2500);
    }

    function createProgressBar (daysLived, avrgYears) {
        const progressBarWrapper = document.createElement('div');
        progressBarWrapper.classList.add('progress-bar-container');

        p.parentElement.append(progressBarWrapper);

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar-fill');

        progressBarWrapper.append(progressBar);

        void progressBar.offsetWidth;
        
        const width = `${(daysLived * 100)/(avrgYears * 365.25)}%`;
        progressBar.style.width = width;
    }

    if (localStorage.getItem('userBirthdate') === null) {
        
        const form = document.createElement('div');

        setTimeout(() => {
            updateAnimation('Enter your birthday');
    
            form.innerHTML = `<form id="dateForm">
                <input type="date">
                <button type="submit">OK</button>
            </form>`;
    
            p.parentElement.append(form);

            form.addEventListener('submit', (e) => {
                e.preventDefault();
        
                const input = form.querySelector('input');
                if (input.value == '') {
                    updateAnimation('Enter correct date');    
                } else {
                    form.remove();
        
                    localStorage.setItem('userBirthdate', input.value);

                    calculateLeft(input.value);
                }
            });
        }, 2000);
    } else {
        setTimeout(() => {
            calculateLeft(localStorage.getItem('userBirthdate'));
        }, 2000);
    }
});
