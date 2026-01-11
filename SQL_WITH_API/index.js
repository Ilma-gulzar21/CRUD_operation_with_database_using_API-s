//require package
import mysql from 'mysql2/promise';
import  express from 'express';
import methodOverride from "method-override";
import{ v4 as uuidv4 } from 'uuid';
import path from 'path';

const app=express();
const port=4000;

// app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set("view engine","ejs"); 
 app.use(express.static("public"));

//create async function
async function insertdata() {
  
//try block
try {
 //create the connection from database
 const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dalta_app',
  password : "ilma@123",
}); 
console.log("database connected");

// creating home route
app.get("/",async(req,res)=>{

try {
   let q='select count(*) from temp';
const [result]=await connection.query(q);
let count=result[0]['count(*)'];
res.render("home.ejs",{count});
} 
catch (err) {
  console.log("some error in database query",err);
  res.status(500).send(" this is query error");
}
});

//show all users route
app.get("/users",async(req,res)=>{

try {
   let q='select * from temp';
const [result]=await connection.query(q);
res.render("users.ejs",{result});
} 
catch (err) {
  console.log("some error in database query",err);
  res.status(500).send(" this is query error");
}
});

//edit user route
app.get("/users/:id/edit",async(req,res)=>{
   let {id} = req.params;
try {
  let q=`select * from temp where id='${id}'`;
const [result]=await connection.query(q);
let user=result[0];
console.log(user);
res.render("form.ejs",{user});
} 
catch (err) {
  console.log("some error in database query",err);
  res.status(500).send(" this is query error");
}
});

// update user route
app.patch("/users/:id",async(req,res)=>{
   let {id} = req.params;
   let { password:formPassword,username:newusername}=req.body;
try {
  let q=`select * from temp where id='${id}'`;
const [result]=await connection.query(q);
let user=result[0];
if (formPassword !== user.password) {
  return res.render("wrong_pass_update.ejs", {
    userId: id
  });
} else {
  let q2=`update temp set username= '${newusername}' where id='${id}'`;
  const [result2]=await connection.query(q2);
  res.redirect("/users");
}
} 
catch (err) { 
  console.log("some error in database query",err);
  res.status(500).send(" this is query error");
}
});



//add user route
app.get("/users/add",(req,res)=>{
  res.render("add.ejs");
});
app.post("/users/add", async (req, res) => {
   const { username, email, password, confirmPassword } = req.body;
  const id = uuidv4();
  try {
     if (password !== confirmPassword) {
    res.render("wrong_pass_add.ejs");  
  } else {
        const query =
      "INSERT INTO temp (id, username, email, password) VALUES (?, ?, ?, ?)";
    const [result] = await connection.query(query, [id, username, email, password]);
    if (result.affectedRows > 0) {
      console.log("User added:", username);
      return res.redirect("/users"); 
    } else {
      return res.send("Failed to add user");
    }
  }

  } catch (err) {
    console.log("Error in database query:", err);
    return res.status(500).send("Database query error");
  }
});


//delete route
app.delete("/users/:id",async(req,res)=>{
  const {id}=req.params;
  try {
    const [result] = await connection.query('Delete from temp where id=?',[id]);
 res.redirect("/users");     
  } catch (err) {
    console.log("Error in database query:", err);
    return res.status(500).send("Database query error");
  }
});









app.listen(port,()=>{
  console.log("server is created at port",port);
});
// stop he connecion to database
}
catch(err) {
  console.log("database connection error",err);
}
// await connection.end();
}
insertdata();
//close the database connection
process.on("SIGINT", async () => {
  console.log("\nClosing database connection...");
  try {
    if (connection) {
      await connection.end(); 
      console.log("Database connection closed");
    }
  } catch (err) {
    console.error("Error closing connection:", err);
  }
  process.exit(0); // server stop
});
