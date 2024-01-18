import express from "express"
import cors from "cors"
import mongoose, { mongo } from "mongoose"

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/FILES").then(
    function(res){
        console.log("Connected")
    },
    function(req){
        console.log("Not Connected")
    }
)

const fileSchema = mongoose.Schema({
    Name : String,
    Size : Number
})

const files = mongoose.model('files', fileSchema)

app.post("/sendfiles",async function(req,res){
    const newProject = new files(
        {
            Name : req.body.Name,
            Size : req.body.Size
        }
    )
    await newProject.save()

    res.send({message : "saved"})
})

app.get("/getfiles",async function(req,res){
    res.send(await files.find({}))
})

app.get("/deleteall",async function(req,res){
    await files.deleteOne({_id:req.query.id})
})

app.listen(3005, function(err){
    console.log("Successfully Connected")
})