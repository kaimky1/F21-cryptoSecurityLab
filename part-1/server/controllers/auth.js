const bcrypt = require('bcryptjs');
const users = [];

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const existingPassword = bcrypt.compareSync(password, users[i].passwordHash)
            if(existingPassword){
              const cat = {...users[i]};
              delete cat.passwordHash;
              res.status(200).send(cat);
            }else{
          res.status(400).send("User not found.")
        }
      }
    }
      
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
          const{username, email, firstName, lastName, password} = req.body;

        //   for(let i = 0; i < users.length; i++){
        //     const existingPassword = bcrypt.compareSync(password, chats[i].password)
        //     if(existingPassword){
        //         users[i].username.push(username)
        //         let existingSecuredMessage = {...chats[i]}
        //         delete existingSecuredMessage.passwordHash
        //         return res.status(200).send(existingSecuredMessage)
        //     }
        // }

          const salt = bcrypt.genSaltSync(5);
          const passwordHash = bcrypt.hashSync(password, salt)

          // console.log('password = ' + password);
          // console.log('salt = ' + salt);
          // console.log('passwordHash = ' + passwordHash);
          
          const newUser = {
            username, 
            email, 
            firstName, 
            lastName, 
            passwordHash
        }

        users.push(newUser)
        console.log('This is the users array', users)
        
        let securedMessage = {...newUser}
        delete securedMessage.passwordHash;

        res.status(200).send(securedMessage)
    }
}