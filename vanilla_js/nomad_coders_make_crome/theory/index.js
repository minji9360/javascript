const nicoInfo = {
  name: "Nicolas", 
  age: 55, 
  gender: "Male",
  isHandsome: true,
  favMovies: ["Along the gods", "LOTR", "Oldboy"],
  favFood: [
    {
      name: "Kimchi", 
      fatty: false
    },
    {
      name: "Cheese burger", 
      fatty: true
    }
  ]
};

console.log(nicoInfo.favFood[0].fatty);
