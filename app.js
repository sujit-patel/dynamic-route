const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//main route
app.get('/', function(req, res) {
    const directoryPath = path.join(__dirname, 'files');
    
    // Log the directory path to ensure it's correct
    console.log("Directory path:", directoryPath);

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            console.error("Unable to scan directory:", err);
            res.status(500).send("Server Error");
        } else {
            // Log the files array to the console
            console.log("Files in directory:", files);
            res.render("index", { files: files });
        }
    });
});

//create data file
app.post('/create', function(req,res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/");
    });
});

//show file data
app.get('/files/:fileName', function(req,res) {
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", function(err, filedata){
        res.render("showfile", {filetitel: req.params.fileName, filedata});
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});