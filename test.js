// var name="Mario";
// // console.log(name);

// const greet =(name)=>{
//     console.log("Hello" ,$,{name} )
// }
// greet(name);
// const name = "Mario";

// const greet = (name) => {
//   console.log(`Hello, ${name}!`);
// };

// greet(name);
// Accessing global properties
// console.log(global.process); // Process-related information
// console.log(global.Buffer); // Buffer class for handling binary data

const people = require('./people')
// const zyz= require('./people')
// console.log(zyz)
// console.log(people)
// const os=require("os")
// console.log(os.platform())
const fs =require("fs");
// fs.readFile('./people.txt',(err,data)=>{
//     if (err) {
//         console.log(err)
//     }
//     console.log(data.toString())
// });
// console.log("last line");
// fs.writeFile("./people.txt","Hello World Ninja",()=>{
//     console.log("success!!")
// })
if (!fs.existsSync("./assets")) {
    fs.mkdir("./assets",(err)=>{
        if (err) {
            console.log(err.message)
            
        }
        console.log("success!!") 
    })
}else{
    fs.rmdir("./assets",(err)=>{
        if (err) {
           console.log(err) 
        }
        console.log("deleted!!")
    })
}
