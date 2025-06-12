document.addEventListener('DOMContentLoaded', function() {
    // Set initial styles for polaroid rotation
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(polaroid => {
        const randomRotation = (Math.random() - 0.5) * 20;
        polaroid.style.setProperty('--rotation', `${randomRotation}deg`);
    });
    
    // Days together calculation
    const startDate = new Date('2023-01-01'); // Replace with your anniversary date
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // document.getElementById('days-together').textContent = `${diffDays} beautiful days together`;
    
    // Custom Name
    const partnerNameElement = document.querySelector('.partner-name');
    
    // Replace with your name - you can modify this
    
    // Replace with your partner's name - you can modify this
    partnerNameElement.textContent = "Sayang"; 
    
    // Envelope Animation
    const envelope = document.getElementById('envelope');
    const content = document.getElementById('content');
    
    envelope.addEventListener('click', function() {
        envelope.classList.add('open');
        
        setTimeout(function() {
            content.classList.add('show');
            initializeElements();

            // --- AUTO PLAY MUSIC SETELAH AMBLOP DIBUKA ---
            if (!audio) {
                audio = new Audio('LANY - XXL (Official Lyric Video).mp3');
                audio.loop = true;
            }
            audio.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
            // ---------------------------------------------

            // --- CONFETTI OTOMATIS SETELAH AMBLOP DIBUKA ---
            const duration = 2 * 1000;
            const animationEnd = Date.now() + duration;
            (function frame() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return;
                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    particleCount: particleCount,
                    spread: 100,
                    origin: { y: 0.6 },
                    shapes: ['heart'],
                    colors: ['#e74c3c', '#ff7979', '#fab1a0', '#ffeaa7'],
                });
                confetti({
                    particleCount: particleCount,
                    spread: 100,
                    origin: { y: 0.6 },
                    shapes: ['star'],
                    colors: ['#ffeaa7', '#fdcb6e', '#e17055', '#e84393'],
                });
                requestAnimationFrame(frame);
            }());
            // ----------------------------------------------
        }, 1000);
    });
    
    // Initialize animations after content is shown
    function initializeElements() {
        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.setProperty('--i', index);
            
            // Create observer for timeline items
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.5
            });
            
            observer.observe(item);
        });
    }
    
    // Interactive floating hearts
    const floatingHearts = document.querySelectorAll('.floating-heart');
    const revealedMessage = document.getElementById('revealed-message');
    
    floatingHearts.forEach(heart => {
        heart.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            
            // Reset animation
            revealedMessage.classList.remove('show');
            
            setTimeout(function() {
                revealedMessage.textContent = message;
                revealedMessage.classList.add('show');
            }, 300);
            
            // Create mini heart burst
            createHeartBurst(heart);
        });
    });
    
    // Create mini heart burst animation
    function createHeartBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 10; i++) {
            const miniHeart = document.createElement('div');
            miniHeart.innerHTML = '❤️';
            miniHeart.style.position = 'fixed';
            miniHeart.style.fontSize = `${Math.random() * 10 + 10}px`;
            miniHeart.style.left = `${centerX}px`;
            miniHeart.style.top = `${centerY}px`;
            miniHeart.style.opacity = '1';
            miniHeart.style.zIndex = '9999';
            miniHeart.style.pointerEvents = 'none';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const xDestination = Math.cos(angle) * distance;
            const yDestination = Math.sin(angle) * distance;
            
            document.body.appendChild(miniHeart);
            
            miniHeart.animate([
                { 
                    transform: 'translate(0, 0) scale(0.5)',
                    opacity: 1
                },
                {
                    transform: `translate(${xDestination}px, ${yDestination}px) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)',
                fill: 'forwards'
            }).onfinish = function() {
                miniHeart.remove();
            };
        }
    }
    
    // Music player functionality
    const playButton = document.getElementById('play-button');
    let audio = null;
    let isPlaying = false;
    
    playButton.addEventListener('click', function() {
        // Create audio if it doesn't exist yet
        if (!audio) {
            // You need to provide your own audio URL here or use the web Audio API
            audio = new Audio('LANY - XXL (Official Lyric Video).mp3');
            // Loop the audio
            audio.loop = true;
        }
        
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            audio.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    });
    
    // Confetti animation
    const confettiButton = document.getElementById('confetti-button');
    
    confettiButton.addEventListener('click', function() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        (function frame() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return;
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Hearts
            confetti({
                particleCount: particleCount,
                spread: 100,
                origin: { y: 0.6 },
                shapes: ['heart'],
                colors: ['#e74c3c', '#ff7979', '#fab1a0', '#ffeaa7'],
            });
            
            // Stars
            confetti({
                particleCount: particleCount,
                spread: 100,
                origin: { y: 0.6 },
                shapes: ['star'],
                colors: ['#ffeaa7', '#fdcb6e', '#e17055', '#e84393'],
            });
            
            requestAnimationFrame(frame);
        }());
        
        // Full screen animation
        const colors = ['#e74c3c', '#ff7979', '#fab1a0', '#ffeaa7', '#fdcb6e', '#e17055', '#e84393'];
        
        for (let i = 0; i < 7; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                        x: Math.random(),
                        y: Math.random() - 0.2
                    },
                    colors: colors,
                    disableForReducedMotion: true
                });
            }, i * 700);
        }
    });
    
    // Create background floating hearts
    function createBackgroundHearts() {
        const container = document.querySelector('.floating-bg-hearts');
        const heartCount = 20;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.opacity = Math.random() * 0.3 + 0.1;
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            container.appendChild(heart);
        }
    }
    
    // Create sparkles
    function createSparkles() {
        const sparkleCount = 30;
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.classList.add('sparkle');
                sparkle.style.left = Math.random() * 100 + 'vw';
                sparkle.style.top = Math.random() * 100 + 'vh';
                sparkle.style.animationDelay = Math.random() * 3 + 's';
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 3000);
            }, i * 300);
        }
        
        setTimeout(createSparkles, 5000);
    }
    
    // Initialize background animations
    createBackgroundHearts();
    createSparkles();
});