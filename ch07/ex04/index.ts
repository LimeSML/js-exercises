const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点
const totalMath = data.reduce((total, student) => total + student.math, 0);
console.log(totalMath); // 530

// クラスAのchemistryの平均点
const studentsInClassA = data.filter((student) => student.class === "A");
const totalChemistryInClassA = studentsInClassA.reduce(
  (total, student) => total + student.chemistry,
  0,
);
const averageChemistryInClassA =
  totalChemistryInClassA / studentsInClassA.length;
console.log(averageChemistryInClassA); // 45

// 3科目合計点のクラスC内での平均点
const studentsInClassC = data.filter((student) => student.class === "C");
const totalInClassC = studentsInClassC.reduce((total, student) => {
  return total + student.math + student.chemistry + student.geography;
}, 0);
const averageTotalInClassC = totalInClassC / studentsInClassC.length;
console.log(averageTotalInClassC); // 176.66666666666666

// 3科目合計点が最も高い人のname
const studentsWithTotal = data.map((student) => {
  return {
    name: student.name,
    class: student.class,
    total: student.math + student.chemistry + student.geography,
  };
});
const topStudentName = studentsWithTotal.reduce((max, current) =>
  current.total > max.total ? current : max,
).name;
console.log(topStudentName); // Frank

// 全体のgeographyの標準偏差
const averageGeography =
  data.reduce((sum, student) => sum + student.geography, 0) / data.length;
const varianceGeography =
  data.reduce(
    (sum, student) => sum + Math.pow(student.geography - averageGeography, 2),
    0,
  ) / data.length;
const stdDevGeography = Math.sqrt(varianceGeography);
console.log(stdDevGeography); // 22.3330569358242
