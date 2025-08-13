// Variables del juego
let currentQuestion = 1;
const totalQuestions = 4;
let correctAnswers = 0;

// Respuestas correctas (en minúsculas para comparación)
const correctAnswers_data = {
    1: ["titanic"],
    2: ["tiramisu", "tiramisú"],
    3: ["14 de febrero"], // Pregunta especial - cualquier respuesta es "incorrecta"
    4: ["max y luna", "luna y max"]
};

// Función para iniciar el puzzle
function startPuzzle() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('puzzle-screen').classList.add('active');
    
    // Pequeña animación de entrada
    setTimeout(() => {
        document.getElementById('question-1').classList.add('active');
    }, 300);
}

// Función para verificar respuestas
function checkAnswer(questionNum) {
    const answerInput = document.getElementById(`answer-${questionNum}`);
    const feedback = document.getElementById(`feedback-${questionNum}`);
    const userAnswer = answerInput.value.trim().toLowerCase();
    
    // Limpiar feedback previo
    feedback.className = 'feedback';
    feedback.innerHTML = '';
    
    if (userAnswer === '') {
        feedback.className = 'feedback incorrect';
        feedback.innerHTML = '💭 Por favor, escribe una respuesta mi amor';
        return;
    }
    
    let isCorrect = false;
    
    // Verificar cada pregunta
    switch(questionNum) {
        case 1:
        case 2:
        case 4:
            isCorrect = correctAnswers_data[questionNum].includes(userAnswer);
            break;
        case 3:
            // Pregunta especial - siempre "incorrecta" pero permite continuar
            isCorrect = false;
            break;
    }
    
    // Mostrar feedback
    if (questionNum === 3) {
        // Caso especial para la pregunta 3
        feedback.className = 'feedback special';
        feedback.innerHTML = '❤️ Incorrecto, pero te dejo pasar porque te amo ❤️';
        correctAnswers++; // Contar como correcta para el progreso
        
        // Efectos especiales para esta pregunta única
        const questionElement = document.getElementById(`question-${questionNum}`);
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                addSparkleEffect(questionElement);
            }, i * 150);
        }
        
        setTimeout(() => {
            nextQuestion();
        }, 2500);
        
    } else if (isCorrect) {
        feedback.className = 'feedback correct';
        const correctMessages = [
            '✨ ¡Perfecto mi amor! ✨',
            '💕 ¡Exacto, mi vida! 💕',
            '🌟 ¡Correcto, mi cielo! 🌟',
            '💖 ¡Sí, mi corazón! 💖'
        ];
        feedback.innerHTML = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        correctAnswers++;
        
        // Efectos especiales para respuesta correcta
        enhanceCorrectAnswer(questionNum);
        
        setTimeout(() => {
            nextQuestion();
        }, 2000);
        
    } else {
        feedback.className = 'feedback incorrect';
        const incorrectMessages = [
            '💭 Mmm, no es esa mi amor. ¡Inténtalo de nuevo!',
            '🤔 Piénsalo un poquito más, mi vida',
            '💕 No es correcto, pero sé que puedes hacerlo',
            '🌹 Casi... ¡inténtalo otra vez!'
        ];
        feedback.innerHTML = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
        
        // Hacer vibrar sutilmente el input
        answerInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            answerInput.style.animation = '';
        }, 500);
    }
}

// Función para pasar a la siguiente pregunta
function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        // Ocultar pregunta actual
        document.getElementById(`question-${currentQuestion}`).classList.remove('active');
        
        // Actualizar contador
        currentQuestion++;
        document.getElementById('question-number').textContent = currentQuestion;
        
        // Actualizar barra de progreso
        const progressPercent = (currentQuestion / totalQuestions) * 100;
        document.getElementById('progress-bar').style.width = `${progressPercent}%`;
        
        // Mostrar siguiente pregunta
        setTimeout(() => {
            document.getElementById(`question-${currentQuestion}`).classList.add('active');
        }, 300);
        
    } else {
        // Todas las preguntas completadas
        showCongratulations();
    }
}

// Función para mostrar la pantalla de felicitaciones
function showCongratulations() {
    document.getElementById('puzzle-screen').classList.remove('active');
    
    setTimeout(() => {
        document.getElementById('congratulations-screen').classList.add('active');
        
        // Mostrar mensaje de carga del video
        showVideoLoadingMessage();
        
        // Inicializar el video con autoplay y controles
        const video = document.getElementById('love-video');
        video.controls = true;
        video.preload = 'auto';
        
        // Asegurar que el video tenga sonido habilitado
        video.muted = false;
        video.volume = 1.0;
        
        // Intentar reproducir automáticamente (algunos navegadores lo bloquean)
        video.play().catch(function(error) {
            console.log('Autoplay fue bloqueado, pero el usuario puede hacer clic para reproducir');
        });
        
        // Crear efecto de confeti
        createConfetti();
        
        // Crear más corazones flotantes para la celebración
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 300);
        }
        
    }, 500);
}

// Función para crear efecto de confeti
function createConfetti() {
    const colors = ['#ff69b4', '#ffd700', '#ff7f7f', '#ffb6c1', '#ffc0cb'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    
    document.body.appendChild(confetti);
    
    // Animar el confeti
    const animationDuration = Math.random() * 3000 + 2000;
    const horizontalMovement = (Math.random() - 0.5) * 200;
    
    confetti.animate([
        {
            transform: 'translateY(-10px) translateX(0px) rotate(0deg)',
            opacity: 1
        },
        {
            transform: `translateY(100vh) translateX(${horizontalMovement}px) rotate(720deg)`,
            opacity: 0
        }
    ], {
        duration: animationDuration,
        easing: 'cubic-bezier(0.5, 0, 0.5, 1)'
    });
    
    // Eliminar el confeti después de la animación
    setTimeout(() => {
        confetti.remove();
    }, animationDuration);
}

// Funciones adicionales para mejorar la experiencia
function addSparkleEffect(element) {
    const sparkle = document.createElement('span');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Mejorar la experiencia de respuestas correctas
function enhanceCorrectAnswer(questionNum) {
    const questionElement = document.getElementById(`question-${questionNum}`);
    const button = questionElement.querySelector('.btn-love');
    
    // Añadir efecto sparkle
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            addSparkleEffect(questionElement);
        }, i * 200);
    }
    
    // Cambiar temporalmente el botón
    const originalText = button.innerHTML;
    button.innerHTML = '¡Correcto! 💕';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Función para crear un corazón flotante ocasional
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatUp 4s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Mensaje de carga para el video
function showVideoLoadingMessage() {
    const videoContainer = document.querySelector('.video-container');
    const loadingMsg = document.createElement('div');
    loadingMsg.innerHTML = `
        <div style="text-align: center; margin: 20px 0; color: var(--love-pink); font-size: 1.2rem;">
            💕 Preparando tu regalo especial... 💕
            <div style="margin-top: 10px;">
                <div class="spinner" style="display: inline-block; width: 20px; height: 20px; border: 3px solid rgba(255, 105, 180, 0.3); border-radius: 50%; border-top: 3px solid var(--love-pink); animation: spin 1s linear infinite;"></div>
            </div>
        </div>
    `;
    
    videoContainer.insertBefore(loadingMsg, videoContainer.firstChild);
    
    // Remover mensaje cuando el video esté listo
    const video = document.getElementById('love-video');
    video.addEventListener('loadeddata', () => {
        loadingMsg.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            loadingMsg.remove();
        }, 500);
    });
}

// Permitir que Enter envíe la respuesta
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listeners para cada input
    for (let i = 1; i <= totalQuestions; i++) {
        const input = document.getElementById(`answer-${i}`);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkAnswer(i);
                }
            });
            
            // Limpiar feedback cuando el usuario empiece a escribir de nuevo
            input.addEventListener('input', function() {
                const feedback = document.getElementById(`feedback-${i}`);
                if (feedback.classList.contains('incorrect')) {
                    feedback.innerHTML = '';
                    feedback.className = 'feedback';
                }
            });
        }
    }
    
    // Crear corazones flotantes ocasionalmente
    setInterval(createFloatingHeart, 8000);
    
    // Agregar estilos adicionales dinámicamente
    addDynamicStyles();
});

// Función para agregar estilos dinámicos
function addDynamicStyles() {
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes sparkleEffect {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(dynamicStyles);
}