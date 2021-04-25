db.createUser(
  {
    user: "tore",  
    pwd: "password",  
    roles:[
      {
        role: "readWrite",
        db:"postAPI"
      }]
  }
);