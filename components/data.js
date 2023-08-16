const muscleEnums = {
  barbell: "barbell",
  dumbbells: "dumbbells",
  cable: "cable",
  kettlebell: "kettlebell",
  bodyweight: "bodyweight",
  machine: "machine",
  other: "other",
  hamstrings: "hamstrings",
  quadriceps: "quadriceps",
  biceps: "biceps",
  triceps: "triceps",
  glutes: "glutes",
  chest: "chest",
  core: "core",
  back: "back",
  calves: "calves",
};
const muscle = [
  muscleEnums.hamstrings,
  muscleEnums.quadriceps,
  muscleEnums.biceps,
  muscleEnums.triceps,
  muscleEnums.glutes,
  muscleEnums.chest,
  muscleEnums.core,
  muscleEnums.back,
  muscleEnums.calves,
];
const equipment = [
  muscleEnums.barbell,
  muscleEnums.dumbbells,
  muscleEnums.cable,
  muscleEnums.kettlebell,
  muscleEnums.bodyweight,
  muscleEnums.machine,
  muscleEnums.other,
];
const exerciseList = [
  {
    name: "Squat (Barbell)",
    muscle: "quadriceps",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Deadlift (Barbell)",
    muscle: "hamstrings",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Romanian Deadlift (Barbell)",
    muscle: "hamstrings",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Good Morning (Barbell)",
    muscle: "hamstrings",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Romanian Deadlift (Dumbbells)",
    muscle: "hamstrings",
    equipment: muscleEnums.dumbbells,
  },
  {
    name: "Deadlift (Dumbbells)",
    muscle: "hamstrings",
    equipment: muscleEnums.dumbbells,
  },
  {
    name: "Bicep Curl (Barbell)",
    muscle: "biceps",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Bench Press (Barbell)",
    muscle: "chest",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Hip Thrust (Barbell)",
    muscle: "glutes",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Overhead Shoulder Press (Barbell)",
    muscle: "shoulders",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Front Squat (Barbell)",
    muscle: "quadriceps",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Lat Pulldown (Cable)",
    muscle: "back",
    equipment: "cable",
  },
  {
    name: "Bulgarian Split Squat (Barbell)",
    muscle: "quadriceps",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Box Squat (Barbell)",
    muscle: "quadriceps",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Reverse Lunge (Barbell)",
    muscle: "quadriceps",
    equipment: muscleEnums.barbell,
  },
  {
    name: "Bench Press (Dumbbells)",
    muscle: "chest",
    equipment: muscleEnums.dumbbells,
  },
  {
    name: "Seated Leg Curl (Machine)",
    muscle: "hamstrings",
    equipment: "Machine",
  },
  {
    name: "Back Extension",
    muscle: "back",
    equipment: "other",
  },
  {
    name: "Push-ups",
    muscle: "chest",
    equipment: "bodyweight",
  },
];

const mainData = [
  {
    id: "bench press barbell",
    title: "Bench Press (Barbell)",
  },
  {
    id: "bench press dumbbells",
    title: "Bench Press (Dumbbells)",
  },
  {
    id: "squat barbell",
    title: "Squat (Barbell)",
  },
  {
    id: "squat dumbbells",
    title: "Squat (Dumbbells)",
  },
];

const sortedExerciseList = exerciseList.sort((a, b) =>
  a.name.localeCompare(b.name)
);

export { muscle, equipment, sortedExerciseList, mainData };
