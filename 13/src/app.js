console.log("hello This is entry js");

// ES6
import sum from "./assets/vendor/sum";
console.log("sum(1, 118) = ", sum(1, 118));

// CommonJs
var minus = require("./assets/vendor/minus");
console.log("minus(1, 2) = ", minus(1, 2));

// AMD
require(["./assets/vendor/multi"], function(multi) {
  console.log("multi(1, 5) = ", multi(1, 5));
});
