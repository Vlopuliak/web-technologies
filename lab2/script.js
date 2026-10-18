// === ЧАСТИНА 1: Об'єкти та конструктори (БЕЗ класів ES6) ===

// 1.2.3 Створення car1 через new Object()
let car1 = new Object();
car1.color = "black";
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = "Vadym Lopuliak";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;

// 1.2.4 Створення car2 через літерал об'єкта
let car2 = {
    color: "white",
    maxSpeed: 190,
    driver: {
        name: "Vadym Lopuliak",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};

// 1.2.5 - 1.2.6 Додавання та демонстрація методів drive
car1.drive = function() {
    console.log("I am not driving at night");
};
car1.drive();

car2.drive = function() {
    console.log("I can drive anytime");
};
car2.drive();

// 1.2.7, 1.2.9 Конструктор Truck з методом trip
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let nightText = this.driver.nightDriving ? "drives at night" : "does not drive at night";
            console.log(`Driver ${this.driver.name} ${nightText} and has ${this.driver.experience} years of experience`);
        }
    };
}

// 1.2.8 Метод AssignDriver через prototype
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

// 1.2.10 Створення 2 вантажівок та демонстрація
let truck1 = new Truck("red", 5000, 80.5, "Volvo", "FH16");
let truck2 = new Truck("blue", 4500, 85.0, "MAN", "TGX");

truck1.AssignDriver("Vadym Lopuliak", true, 5);
truck2.AssignDriver("Vadym Lopuliak", false, 3);

truck1.trip();
truck2.trip();


// === ЧАСТИНА 2: Класи ES6 ===

// 1.2.12 - 1.2.15 Клас Square
class Square {
    constructor(a) {
        this.a = a;
    }
    static help() {
        console.log("Квадрат — правильний чотирикутник, у якого всі сторони і кути рівні.");
    }
    length() {
        console.log("Периметр:", 4 * this.a);
    }
    square() {
        console.log("Площа:", this.a ** 2);
    }
    info() {
        console.log(`Сторони: ${this.a}, ${this.a}, ${this.a}, ${this.a} | Кути: 90°, 90°, 90°, 90° | Периметр: ${4 * this.a} | Площа: ${this.a ** 2}`);
    }
}

// 1.2.16 - 1.2.17 Клас Rectangle
class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }
    static help() {
        console.log("Прямокутник — чотирикутник, у якого всі кути прямі, а протилежні сторони рівні.");
    }
    length() {
        console.log("Периметр:", 2 * (this.a + this.b));
    }
    square() {
        console.log("Площа:", this.a * this.b);
    }
    info() {
        console.log(`Сторони: ${this.a}, ${this.b}, ${this.a}, ${this.b} | Кути: 90°, 90°, 90°, 90° | Периметр: ${2 * (this.a + this.b)} | Площа: ${this.a * this.b}`);
    }
}

// 1.2.18 - 1.2.19, 1.2.22 Клас Rhombus (з геттерами і сеттерами, бо Parallelogram успадковано від Rectangle)
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this._alpha = alpha;
        this._beta = beta;
    }
    get a() { return this._a; }
    set a(val) { this._a = val; }
    get alpha() { return this._alpha; }
    set alpha(val) { this._alpha = val; }
    get beta() { return this._beta; }
    set beta(val) { this._beta = val; }

    static help() {
        console.log("Ромб — паралелограм, у якого всі сторони рівні.");
    }
    length() {
        console.log("Периметр:", 4 * this.a);
    }
    square() {
        console.log("Площа:", (this.a ** 2) * Math.sin(this.beta * Math.PI / 180));
    }
    info() {
        let s = (this.a ** 2) * Math.sin(this.beta * Math.PI / 180);
        console.log(`Сторони: ${this.a}, ${this.a}, ${this.a}, ${this.a} | Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}° | Периметр: ${4 * this.a} | Площа: ${s}`);
    }
}

// 1.2.20 - 1.2.21 Клас Parallelogram (успадковано від Rectangle)
class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }
    static help() {
        console.log("Паралелограм — чотирикутник, у якого протилежні сторони попарно паралельні та рівні.");
    }
    length() {
        console.log("Периметр:", 2 * (this.a + this.b));
    }
    square() {
        console.log("Площа:", this.a * this.b * Math.sin(this.beta * Math.PI / 180));
    }
    info() {
        let s = this.a * this.b * Math.sin(this.beta * Math.PI / 180);
        console.log(`Сторони: ${this.a}, ${this.b}, ${this.a}, ${this.b} | Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}° | Периметр: ${2 * (this.a + this.b)} | Площа: ${s}`);
    }
}

// 1.2.23 Виклик статичних методів help
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// 1.2.24 Створення об'єктів та виклик info
let sq = new Square(5);
let rect = new Rectangle(4, 6);
let rhomb = new Rhombus(5, 120, 60);
let para = new Parallelogram(4, 6, 120, 60);

sq.info();
rect.info();
rhomb.info();
para.info();


// === ЧАСТИНА 3: Функції вищого порядку та замикання ===

// 1.2.25 - 1.2.26 Функція Triangular
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}
console.log(Triangular());
console.log(Triangular(6, 8, 10));
console.log(Triangular(5, 12, 13));

// 1.2.27 - 1.2.28 Функція PiMultiplier
function PiMultiplier(num) {
    return function() {
        return Math.PI * num;
    };
}
let mulPiBy2 = PiMultiplier(2);
let mulPiBy1_5 = PiMultiplier(3 / 2);
let divPiBy2 = PiMultiplier(1 / 2);

console.log(mulPiBy2());
console.log(mulPiBy1_5());
console.log(divPiBy2());

// 1.2.29 - 1.2.31 Функція Painter та тестування
function Painter(color) {
    return function(obj) {
        if (obj && obj.type) {
            console.log(`${color} ${obj.type}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");

let obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
let obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
let obj3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);