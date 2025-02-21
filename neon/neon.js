document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('textInput');
    const neonText = document.getElementById('neonText');
    const colorPicker = document.getElementById('colorPicker');
    const animationSelect = document.getElementById('animationSelect');
    let animationInterval;

    textInput.addEventListener('input', function () {
        neonText.innerText = textInput.value || 'Neon Text';
    });

    colorPicker.addEventListener('input', function () {
        const color = colorPicker.value;
        neonText.style.color = color;
        neonText.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`;
    });

    function startAnimation(type) {
        clearInterval(animationInterval);
        if (type === 'pulse') {
            animationInterval = setInterval(() => {
                neonText.style.textShadow = `0 0 10px ${colorPicker.value}, 0 0 20px ${colorPicker.value}, 0 0 30px ${colorPicker.value}`;
                setTimeout(() => {
                    neonText.style.textShadow = `0 0 5px ${colorPicker.value}, 0 0 10px ${colorPicker.value}, 0 0 20px ${colorPicker.value}`;
                }, 500);
            }, 1000);
        } else if (type === 'wave') {
            let angle = 0;
            animationInterval = setInterval(() => {
                neonText.style.transform = `rotate(${Math.sin(angle) * 5}deg)`;
                angle += 0.2;
            }, 50);
        } else if (type === 'flicker') {
            animationInterval = setInterval(() => {
                neonText.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
            }, 200);
        }
    }

    animationSelect.addEventListener('change', function () {
        startAnimation(animationSelect.value);
    });

    startAnimation(animationSelect.value);
});