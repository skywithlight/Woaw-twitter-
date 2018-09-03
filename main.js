  // Initialize Firebase
var config = {
  apiKey: "AIzaSyA_7izQYDEcf_jjkd0HVlYiDZP5jXjZB6w",
  authDomain: "tselmegwoaw.firebaseapp.com",
  databaseURL: "https://tselmegwoaw.firebaseio.com",
  projectId: "tselmegwoaw",
  storageBucket: "",
  messagingSenderId: "463524821752"
};
firebase.initializeApp(config);

var db = firebase.database();
var auth = firebase.auth();
var count_2 = 0;  
var user, file;
var storageRef; 
var profileUrl = "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png";
var username, profilePic;

document.getElementById('btn').addEventListener('change', function(e){
  file = e.target.files[0];
});

document.getElementById('writePost').addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("sendPost").click();
  }
}); 

document.getElementById('signUp').style.display = "none";

db.ref('Tweet/' + 'Post').on('value', function(snapshot){
  var list = [];
  list = snapshot.val();
  var list_keys = Object.keys(list);
  var i = list_keys.length - 1;
  var count = 0;
  if (count_2 == 0){
    for (; i >= 0; i--){
      var j = list_keys[i];    
      var pImg = document.createElement("img");
      var postMsg = document.createElement('p');
      var username = document.createElement('p1'); 
      var postBox = document.createElement('div');
      var val = document.createTextNode(list[j].Post);
      // var dato = document.createTextNode("   " + list[j].Date);
      var name = document.createTextNode("Posted by " + list[j].User);

  
      pImg.src = list[j].photoURL;
      
      postMsg.appendChild(val);
      username.appendChild(name);
      // username.appendChild(dato);
      
      postBox.appendChild(pImg);
      postBox.appendChild(username);
      postBox.appendChild(postMsg);
      
      pImg.className = "profileImg";
      postBox.className='chatText';

      document.getElementById('posts').appendChild(postBox);
    } 
} else {    
    var j = list_keys[i];    
    var pImg = document.createElement("img");
    var postMsg = document.createElement('p');
    var username = document.createElement('p1'); 
    var postBox = document.createElement('div');
    var val = document.createTextNode(list[j].Post);
    // var dato = document.createTextNode("   " + list[j].Date);
    var name = document.createTextNode("Posted by " + list[j].User);


    pImg.src = list[j].photoURL;
    
    postMsg.appendChild(val);
    username.appendChild(name);
    // username.appendChild(dato);
    
    postBox.appendChild(pImg);
    postBox.appendChild(username);
    postBox.appendChild(postMsg);
    
    pImg.className = "profileImg";
    postBox.className='chatText';
    
    var list_2 = document.getElementById('posts');
    list_2.insertBefore(postBox, list_2.childNodes[0]);
  }
})

function sendPost(){
  count_2++;
  // var date = new Date();
  user = firebase.auth().currentUser;
  post = document.getElementById("writePost").value,
  document.getElementById("writePost").value = "";
  pushdata(post);
}

function pushdata(post){
  db.ref('Tweet/' + 'Post').push({
    Post : post,
    // Date : date,
    User : user.displayName,
    photoURL : user.photoURL
  });
}

function upload(){
  storageRef = firebase.storage().ref('userProfilePic/' + user.uid);

  storageRef.put(file);

  storageRef.getDownloadURL().then(function(url) {
    user.updateProfile({
      photoURL: url
    })
    document.getElementById('usrProfileImg').src = url;
    console.log(url);
    }).catch(function(error) {
      console.log(error.message);
  });

}

