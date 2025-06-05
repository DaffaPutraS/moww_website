document.addEventListener('DOMContentLoaded', function() {
    // Initial heart animation
    setTimeout(() => {
        document.querySelector('.heart-container').style.opacity = '0';
        document.getElementById('main-content').classList.remove('hidden');
        setTimeout(() => {
            document.querySelector('.heart-container').style.display = 'none';
            document.getElementById('main-content').classList.add('visible');
            animateReasons();
        }, 1000);
    }, 3000);
    
    // Animate reasons when they come into view
    function animateReasons() {
        const reasons = document.querySelectorAll('.reason');
        reasons.forEach((reason, index) => {
            setTimeout(() => {
                reason.style.opacity = '1';
                reason.style.transform = 'translateX(0)';
                reason.style.transition = 'all 0.5s ease-out';
            }, index * 300);
        });
    }
    
    // Photo polaroid click event
    const polaroids = document.querySelectorAll('.polaroid');
    const modal = document.getElementById('message-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');
    
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            modalMessage.textContent = message;
            modal.style.display = 'block';
        });
    });
    
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Music player functionality
    const playButton = document.getElementById('play-button');
    const progressBar = document.querySelector('.progress');
    let isPlaying = false;
    let progressInterval;
    
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            // Stop music (this is simulated since we don't have actual audio)
            isPlaying = false;
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            clearInterval(progressInterval);
        } else {
            // Play music (simulated)
            isPlaying = true;
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            
            // Simulate music progress
            let progress = 0;
            progressInterval = setInterval(() => {
                progress += 0.5;
                if (progress > 100) {
                    progress = 0;
                }
                progressBar.style.width = progress + '%';
            }, 100);
        }
    });
    
    // Special button click event
    const specialButton = document.getElementById('special-button');
    const surpriseModal = document.getElementById('surprise-modal');
    const closeSurprise = document.querySelector('.close-surprise');
    const flyingHeartsContainer = document.querySelector('.flying-hearts-container');
    
    specialButton.addEventListener('click', function() {
        surpriseModal.style.display = 'block';
        createFlyingHearts();
    });
    
    closeSurprise.addEventListener('click', function() {
        surpriseModal.style.display = 'none';
    });
    
    function createFlyingHearts() {
        flyingHeartsContainer.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('span');
                heart.innerHTML = '❤️';
                heart.style.position = 'absolute';
                heart.style.fontSize = Math.random() * 20 + 10 + 'px';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.opacity = '0';
                heart.style.transform = 'translateY(0)';
                heart.style.transition = 'all 2s ease-out';
                
                flyingHeartsContainer.appendChild(heart);
                
                setTimeout(() => {
                    heart.style.transform = 'translateY(-80px)';
                    heart.style.opacity = Math.random() * 0.5 + 0.5;
                }, 50);
                
                setTimeout(() => {
                    heart.remove();
                }, 2000);
            }, i * 200);
        }
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === surpriseModal) {
            surpriseModal.style.display = 'none';
        }
    });
    
    // Create floating animation for decorative elements
    function createFloatingEffect() {
        const elements = document.querySelectorAll('.flower');
        elements.forEach(element => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            const randomDelay = Math.random() * 2;
            const randomTime = Math.random() * 2 + 3;
            
            element.style.setProperty('--random-x', `${randomX}px`);
            element.style.setProperty('--random-y', `${randomY}px`);
            element.style.animation = `float ${randomTime}s ease-in-out ${randomDelay}s infinite`;
        });
    }
    
    createFloatingEffect();
    
    // Create scroll animation effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.message-section, .special-moment, .letter').forEach(element => {
        observer.observe(element);
    });
});