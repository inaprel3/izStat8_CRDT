class CustomCRDT {
  constructor() {
    this.localData = {}; // Локальна копія даних у форматі об'єкта
  }

  applyLocalChange(key, value) {
    // Обробка локальних змін у даних
    this.localData[key] = value;
  }

  async synchronizeAsync(otherCRDT) {
    // Асинхронний метод синхронізації локальних копій з іншими репліками
    for (const externalKey in otherCRDT.localData) {
      if (!(externalKey in this.localData)) {
        await this.applyExternalChange(externalKey, otherCRDT.localData[externalKey]);
      }
    }
  }

  async applyExternalChange(externalKey, value) {
    // Асинхронний метод застосування змін від іншої репліки
    if (!(externalKey in this.localData)) {
      this.localData[externalKey] = value;
    }
  }

  getCurrentData() {
    return this.localData;
  }
}

// Приклад використання
const replicaA = new CustomCRDT();
const replicaB = new CustomCRDT();

replicaA.applyLocalChange("user1", "data1");
replicaB.applyLocalChange("user2", "data2");

// Асинхронна синхронізація реплік
(async () => {
  await replicaA.synchronizeAsync(replicaB);
  await replicaB.synchronizeAsync(replicaA);

  // Обидві репліки містять обидві зміни
  console.log("Replica A data after synchronization:", replicaA.getCurrentData());
  console.log("Replica B data after synchronization:", replicaB.getCurrentData());
})();