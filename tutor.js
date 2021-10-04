let str1 = "<Span class='my'>"
let regex = /<(([A-z]+)\s*([^>]*))>/

let result = str1.match(regex);
console.log(result[0])
console.log(result[1])
console.log(result[2])
console.log(result[3])
