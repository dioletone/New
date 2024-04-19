import express from "express";
import  sqlite3  from "sqlite3";
 const app = express();
 const port = 3000;
 let countrys =[];

 const db = new sqlite3.Database("data.db");
 const result = `SELECT country FROM DatabyCountry`;

   const data = db.all(result,[],(err,rows)=>
   {
      if (err){ console.error(err.message);} else
      
      countrys = rows;
      console.log("🚀 ~ countrys:", countrys.length)
      });
 app.use(express.static(`./public`));
 app.get("/",async(req,res)=>{
   await getList();
    res.render("./pages/page.ejs",{
      countrys : countrys,
    })
 })
 app.listen(port , ()=>{
    console.log(`Listening on ${port}`);
 })
 async function getList(){
   const result = `SELECT country FROM DatabyCountry`;
   const data = db.run(result,[],(err,rows)=>
   {
      if (err){ console.error(err.message);}
      
      countrys = rows;
      });
      
   }
 