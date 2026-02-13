// Set the date we're counting down to
var countDownDate = new Date("Feb 28, 2026 16:00:00").getTime();

// Update the count down every 1 second
var countdownFunction = setInterval(function () {

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
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "The Event Has Started!";
    }
}, 1000);


// Intersection Observer for Fade-in Animation
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('lazy-bg')) {
                    entry.target.style.backgroundImage = `url('${entry.target.dataset.bg}')`;
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');
    lazyBackgrounds.forEach(el => {
        observer.observe(el);
    });

    // Music Control
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;

    musicBtn.addEventListener('click', function () {
        if (isPlaying) {
            music.pause();
            musicIcon.innerHTML = "♪"; // Note icon
            musicBtn.classList.remove('playing');
        } else {
            music.play().then(() => {
                musicIcon.innerHTML = "❚❚"; // Pause icon
                musicBtn.classList.add('playing');
            }).catch(error => {
                console.log("Audio playback failed:", error);
            });
        }
        isPlaying = !isPlaying;
    });
});
