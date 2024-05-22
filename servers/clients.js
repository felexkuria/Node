const http=require("http")
const fs=require("fs")
 if (fs.existsSync('./views/index.html',(err)=>{
    console.log(err)
 })) {
    console.log( "...File exist..")
 } else {
    fs.writeFile('./views/index.html',"",(err)=>{
        console.log(err)
     })
 }
const server =http.createServer((req,res)=>{
    // console.log(req.url,req.method)
    //set header content type
    res.setHeader('Content-Type',"text/html")
    // res.write("<p>Hello World!</p>")
    // res.end()

    let path='./views/'
    switch (req.url) {
        case "/":
            path+="index.html";
            break
        case "/about":
            path+="about.html"
            break
        default :
            path+="404.html"
            break

            

    }
    // send html file
    fs.readFile(path,(err,data)=>{
        if (err) {
            console.log(err)
            res.end()
        }
       else{
        res.write(data)
        res.end()
       }
    })
});
server.listen(3000,"localhost",()=>{
    console.log("Listening to Port 3000")
})