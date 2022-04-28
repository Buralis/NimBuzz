const express = require("express");
const app = express()

app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + "/public"))

var startNumber 
var endNumber
var results = []

app.get("/", (request, response) =>{
    response.render("index")
})

app.get("/results", (request, response) =>{
    if(results.length > 0){
        response.render("results", {startNumber: startNumber, endNumber: endNumber, results: results})
    }
    else{
        response.redirect("/")
    }
})

app.post("/NimSubmit", (request, response) =>{
    startNumber = request.body.startNumber
    endNumber = request.body.endNumber

    if(startNumber && endNumber){
        for(let index = startNumber; index <= endNumber; index++){
            if(index % 3 == 0 && index % 5 == 0){
                results.push({class: "nimbuzz-result", value: "NIM Buzz"})
            }
            else{
                if(index % 3 == 0){
                    results.push({class: "nim-result", value: "NIM"})
                }
                if(index % 5 == 0){
                    results.push({class: "buzz-result", value: "Buzz"})
                }
                else{
                    results.push({class: "number-result", value: index})
                }
            }
        }
        response.redirect("/results")
    }
    else{
        response.redirect("/")
    }

})

app.listen(3000)
