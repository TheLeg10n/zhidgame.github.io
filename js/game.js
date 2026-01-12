const container = document.getElementById('game-container');
const wolf = document.getElementById('wolf');
const scoreElement = document.getElementById('score');
const missedElement = document.getElementById('missed');

let score = 0;
let missed = 0;
let wolfPosition = 'left-up';

// Управление волком
function moveWolf(pos) {
    wolfPosition = pos;
    wolf.className = 'pos-' + pos;
}

// Создание яйца
function createEgg() {
    const egg = document.createElement('img');
    egg.src = 'egg.png'; // ТВОЯ КАРТИНКА ЯЙЦА
    egg.className = 'egg';

    // Выбираем случайный лоток (0-3)
    const routes = ['left-up', 'left-down', 'right-up', 'right-down'];
    const route = routes[Math.floor(Math.random() * routes.length)];

    let x = route.includes('left') ? 0 : 100;
    let y = route.includes('up') ? 20 : 50;

    egg.style.left = x + '%';
    egg.style.top = y + '%';
    container.appendChild(egg);

    let progress = 0;
    const speed = 1 + (score / 10); // Ускорение со временем

    const interval = setInterval(() => {
        progress += 0.5 * speed;

        // Движение яйца к центру
        if (route.includes('left')) {
            egg.style.left = progress + '%';
        } else {
            egg.style.left = (100 - progress) + '%';
        }
        egg.style.top = (y + progress * 0.3) + '%';

        // Проверка столкновения
        if (progress > 75) {
            if (wolfPosition === route) {
                score++;
                scoreElement.innerText = `Счет: ${score}`;
                clearInterval(interval);
                egg.remove();
            }
        }

        // Если упало
        if (progress > 90) {
            missed++;
            missedElement.innerText = `Пропущено: ${missed}`;
            clearInterval(interval);
            egg.remove();

            if (missed >= 3) {
                alert("Игра окончена! Ваш счет: " + score);
                location.reload();
            }
        }
    }, 30);
}

// Запуск появления яиц
setInterval(createEgg, 2000);