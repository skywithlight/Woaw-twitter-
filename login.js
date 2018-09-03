function signIn(){
    var password = document.getElementById("psw").value;
    var email = document.getElementById("email").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        document.getElementById("errorLogin").innerHTML = errorMessage;
        document.getElementById("errorLogin").style.display = "block";
    });
    console.log(auth.currentUser);
}
function signUp(){
    var password = document.getElementById("pswSignUp").value;
    var email = document.getElementById("emailSignUp").value;
    var username = document.getElementById("usernameSignUp").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        document.getElementById("errorSignUp").innerHTML = errorMessage;
        document.getElementById("errorSignUp").style.display = "block";
    }).then(function(){
        userP = firebase.auth().currentUser;
        userP.updateProfile({
            displayName : username,
            photoURL : "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png",
        }).catch(function(error){
            console.log(error.message);
        })
        
    });
   
}
function goToSignUp(){
    document.getElementById("login").style.display = "none";
    document.getElementById("signUp").style.display = "block";
}

function logout(){
    firebase.auth().signOut().then(function(user) {
        // console.log("hello");
        // Sign-out successful.
      }).catch(function(error) {
        console.log(error.message);
      });
}

function cancel(){
    document.getElementById("login").style.display = "block";
    document.getElementById("signUp").style.display = "none";  
} 

firebase.auth().onAuthStateChanged(function(user1) {
    if (user1) {
        user = auth.currentUser;
        userId = user.uid;
        // console.log(userId);
        document.getElementById('username').innerHTML = user.displayName;
        document.getElementById('login').style.display = "none";
        document.getElementById('signUp').style.display="none";
        document.getElementById("loader").style.display = "block";
        myVar = setTimeout(function showPage(){
            document.getElementById("loader").style.display = "none";
            document.getElementById('userProfile').style.display = "block";
            document.getElementById('writePost').style.display="block";
            document.getElementById('sendPost').style.display="block";
            document.getElementById("logout").style.display = "block";
            document.getElementById('usrProfileImg').src = user.photoURL;
            console.log(user);
        }, 2000);  
    } else {
        storageRef = null;
        document.getElementById('usrProfileImg').src = "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png";
        document.getElementById('userProfile').style.display = "none";
        document.getElementById('writePost').style.display="none";
        document.getElementById('sendPost').style.display="none ";
        document.getElementById("logout").style.display = "none";
        document.getElementById("loader").style.display = "block";
        myVar = setTimeout(function showPage(){
            document.getElementById("loader").style.display = "none";
            document.getElementById("login").style.display = "block";
        }, 2000); 
    }
  });
