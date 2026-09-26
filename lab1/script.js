// Виведення інструкції на початку виконання сценарію
console.log(`Інструкція з використання функції triangle():
Функція приймає 4 аргументи: значення та типи двох елементів трикутника.
Допустимі типи:
- "leg" (катет)
- "hypotenuse" (гіпотенуза)
- "adjacent angle" (прилеглий до катета кут)
- "opposite angle" (протилежний до катета кут)
- "angle" (один з двох гострих кутів, використовується тільки з гіпотенузою)
Приклад виклику: triangle(7, "leg", 18, "hypotenuse");`);

function triangle(val1, type1, val2, type2) {
    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    // Перевірка на те, чи введені допустимі типи, та чи немає помилок у словах
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Помилка: Неправильний тип аргументу. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    // Перевірка на від'ємні або нульові значення
    if (val1 <= 0 || val2 <= 0) {
        return "Zero or negative input";
    }

    let a = 0, b = 0, c = 0, alpha = 0, beta = 0;

    // Функції для конвертації, оскільки Math працює з радіанами, а вводимо градуси
    const degToRad = (deg) => deg * (Math.PI / 180);
    const radToDeg = (rad) => rad * (180 / Math.PI);

    // Допоміжні змінні для обробки різних порядків аргументів
    let types = [type1, type2];
    let values = [val1, val2];
    const has = (t) => types.includes(t);
    const getVal = (t) => values[types.indexOf(t)];

    // Блок обчислень залежно від переданої пари типів
    if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = radToDeg(Math.atan(a / b));
        beta = 90 - alpha;
    }
    else if (has("leg") && has("hypotenuse")) {
        let leg = getVal("leg");
        c = getVal("hypotenuse");
        // Перевірка на те, що катет не може бути більшим або рівним гіпотенузі
        if (leg >= c) return "Leg cannot be greater or equal to hypotenuse";
        a = leg;
        b = Math.sqrt(c * c - a * a);
        alpha = radToDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }
    else if (has("leg") && has("opposite angle")) {
        let leg = getVal("leg");
        let angle = getVal("opposite angle");
        // Перевірка на гострий кут
        if (angle >= 90) return "Angle must be acute";
        a = leg;
        alpha = angle;
        beta = 90 - alpha;
        c = a / Math.sin(degToRad(alpha));
        b = a / Math.tan(degToRad(alpha));
    }
    else if (has("leg") && has("adjacent angle")) {
        let leg = getVal("leg");
        let angle = getVal("adjacent angle");
        // Перевірка на гострий кут
        if (angle >= 90) return "Angle must be acute";
        a = leg;
        beta = angle;
        alpha = 90 - beta;
        c = a / Math.cos(degToRad(beta));
        b = a * Math.tan(degToRad(beta));
    }
    else if (has("hypotenuse") && has("angle")) {
        c = getVal("hypotenuse");
        let angle = getVal("angle");
        // Перевірка на гострий кут
        if (angle >= 90) return "Angle must be acute";
        alpha = angle;
        beta = 90 - alpha;
        a = c * Math.sin(degToRad(alpha));
        b = c * Math.cos(degToRad(alpha));
    }
    else {
        // Якщо передана несумісна пара (наприклад, два кути)
        console.log("Помилка: Несумісна пара типів. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    // Вивід результатів у консоль за класичними математичними позначеннями
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);

    return "success";
}