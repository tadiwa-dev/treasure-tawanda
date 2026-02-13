// Encapsulate everything in a safe function
document.addEventListener("DOMContentLoaded", function () {

    // --- Countdown Timer ---
    // Use ISO 8601 format for better cross-browser compatibility (e.g. Safari)
    // Date: February 28, 2026 at 16:00:00
    const targetDateStr = "2026-02-28T16:00:00";
    var countDownDate = new Date(targetDateStr).getTime();

    // Check if elements exist before verifying
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const countdownContainer = document.getElementById("countdown");

    if (daysEl && hoursEl && minutesEl && secondsEl && countdownContainer) {
        var countdownFunction = setInterval(function () {
            try {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the elements with id
                daysEl.innerHTML = days;
                hoursEl.innerHTML = hours;
                minutesEl.innerHTML = minutes;
                secondsEl.innerHTML = seconds;

                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(countdownFunction);
                    countdownContainer.innerHTML = "The Event Has Started!";
                }
            } catch (e) {
                console.error("Countdown error:", e);
                clearInterval(countdownFunction);
            }
        }, 1000);
    }


    // --- Animation & Music ---

    // Intersection Observer for Fade-in Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Music Control
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');
    const musicHint = document.getElementById('music-hint');
    let isPlaying = false;

    musicBtn.addEventListener('click', function () {
        toggleMusic();
    });

    // Auto-play on first interaction (scroll or click)
    const enableAudio = () => {
        if (!isPlaying) {
            toggleMusic();
        }
        // Remove listeners after first attempt
        window.removeEventListener('scroll', enableAudio);
        window.removeEventListener('click', enableAudio);
    };

    window.addEventListener('scroll', enableAudio, { once: true });
    // window.addEventListener('click', enableAudio, { once: true }); // Button handles click, global click might be annoying if they just want to read

    function toggleMusic() {
        if (isPlaying) {
            music.pause();
            musicIcon.innerHTML = "♪"; // Note icon
            musicBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            music.play().then(() => {
                musicIcon.innerHTML = "❚❚"; // Pause icon
                musicBtn.classList.add('playing');
                musicHint.classList.add('hidden'); // Hide hint once playing
                isPlaying = true;
            }).catch(error => {
                console.log("Audio playback failed (likely blocked):", error);
                // If blocked, we just stay in "paused" state
            });
        }
    }
});
