class ReplicatedDataStructure {
  constructor() {
    this.localData = {}; // Локальна копія даних у форматі об'єкта
  }

  applyLocalChange(key, value) {
    // Обробка локальних змін у даних
    this.localData[key] = value;
  }

  synchronizeWith(otherReplica) {
    // Метод синхронізації локальних копій даних інших реплік
    for (const externalKey in otherReplica.localData) {
      if (!(externalKey in this.localData)) {
        this.localData[externalKey] = otherReplica.localData[externalKey];
      }
    }
  }

  getCurrentData() {
    return this.localData;
  }
}

// Приклад використання
const replicaA = new ReplicatedDataStructure();
const replicaB = new ReplicatedDataStructure();

replicaA.applyLocalChange("user1", "data1");
replicaB.applyLocalChange("user2", "data2");

// Репліка A і репліка B мають різні оновлення
console.log("Replica A data:", replicaA.getCurrentData()); // { user1: 'data1' }
console.log("Replica B data:", replicaB.getCurrentData()); // { user2: 'data2' }

// Синхронізація реплік
replicaA.synchronizeWith(replicaB);
replicaB.synchronizeWith(replicaA);

// Тепер обидві репліки мають обидва оновлення
console.log("Replica A data after synchronization:", replicaA.getCurrentData()); // { user1: 'data1', user2: 'data2' }
console.log("Replica B data after synchronization:", replicaB.getCurrentData()); // { user1: 'data1', user2: 'data2' }