class CachingCRDT {
  constructor() {
    this.localData = {}; // Локальна копія даних у форматі об'єкта
    this.cache = {}; // Кеш для зберігання результатів обчислень
  }

  applyLocalChange(key, value) {
    // Обробка локальних змін у даних
    this.localData[key] = value;
    
    // Додавання результату в кеш
    this.cache[key] = value;
  }

  retrieveFromCache(key) {
    // Перевірка, чи результат є в кеші
    if (key in this.cache) {
      return this.cache[key];
    } else {
      // Якщо результату немає в кеші, обчислюємо його
      const result = this.calculateValue(key);
      // Зберігаємо результат у кеші
      this.cache[key] = result;
      return result;
    }
  }

  calculateValue(key) {
    // Симуляція обчислення значення за ключем
    return `Calculated value for ${key}`;
  }

  getCurrentData() {
    return this.localData;
  }
}

// Приклад використання
const replica = new CachingCRDT();

replica.applyLocalChange("user1", "data1");
replica.applyLocalChange("user2", "data2");

// Отримання даних з кешу
console.log("Data for user1:", replica.retrieveFromCache("user1")); // Обчислене значення для користувача 1
console.log("Data for user2:", replica.retrieveFromCache("user2")); // Обчислене значення для користувача 2