// load module node-persist
const storage = require('node-persist');

// initiator
storage.init({
    dir: "users",
    expiredInterval: 10*1000
});

exports.getALLUserAsync = async() => {
    //get users from local storage
    var users = await storage.getItem("users");

    // if there are no user => return null
    if(typeof(users) === "undefined") {
        return [];
    }

    return users;
}

exports.getUserAsync = async(email) => {
    //get all user
    var users = await this.getALLUserAsync();

    // find out the chosen one
    var matchedUser = null;
    users.forEach(user => {
        if(user.email === email) {
            matchedUser = user;
        }
    });

    console.log(matchedUser);
    return matchedUser;
}

exports.addUserAsync = async(user) => {
    //get all user
    var users = await this.getALLUserAsync();

    users.push(user);

    // save to the local storage
    await storage.setItem('users', users);
}

exports.deleteUserAsync = async(email) => {
    //get all user
    var users = await this.getALLUserAsync();

    // delete the chosen one
    for(var i = 0; i < users.length; i++) {
        if(users[i].email === email) {
            users.splice(i, 1);
        }
    }

    // save to the local storage
    await storage.setItem('users', users);
}