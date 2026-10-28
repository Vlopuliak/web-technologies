(function () {
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    console.log(" Основне завдання (перевірка за першою літерою 'J') ");
    for (var i = 0; i < names.length; i++) {
        var firstLetter = names[i].charAt(0).toLowerCase();

        if (firstLetter === 'j') {
            byeSpeaker.speak(names[i]);
        } else {
            helloSpeaker.speak(names[i]);
        }
    }

    console.log(" Додатковий функціонал: якщо ім'я закінчується на літеру 'a' — кажемо Hello, інакше — Good Bye ");
    for (var k = 0; k < names.length; k++) {
        var lastLetter = names[k].charAt(names[k].length - 1).toLowerCase();

        if (lastLetter === 'a') {
            helloSpeaker.speak(names[k]);
        } else {
            byeSpeaker.speak(names[k]);
        }
    }
})();