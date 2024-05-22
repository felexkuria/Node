const fs =require('fs')

fs.writeFile('./servers/about.html',"",(err,data)=>{
    try {
      console.log('...File Created ...')  
    } catch (error) {
      console.log(err)  
    }
})
// const readStream=fs.createReadStream('./people.txt',{encoding:"utf-8"})
// const writeStream=fs.createWriteStream('./assets/people.txt');
// readStream.on('data',(chuck)=>{
//     console.log("....NEW CHUNK...")
//     console.log(chuck)
//     writeStream.write("\nNew Chuck\n")
//     writeStream.write(chuck)
// })

// readStream.pipe(writeStream)
// const directoryPath="./servers"
// fs.mkdir(directoryPath,(err)=>{
//     try {
//        console.log("Successfully Created") 
//        fs.writeFile("./servers/clients.js","const server=require",(err)=>{
// if (err) {
//     console.log("....Error!!...${err}")
    
// }
// console.log("....Sucess!!...")

// //     })
//     } catch (err) {
//         console.log(err)
//     }
// })