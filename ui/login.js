var login={
model:{
  // host:'http://localhost/donat/api/master/index.php',
host:'http://localhost/api/piawai/login.php',
apps : [
  {icon:"piawai",name:"Adminsssss",url:"/donat/admin"},
  {icon:"edu",name:"LMS",url:"/donat/lms"},
  {icon:"qrcode",name:"Presensi",url:"/donat/presensi"},
  {icon:"chart",name:"Inventory",url:"/donat/inventory"},
  {icon:"cart",name:"POS",url:"/donat/pos"},
  {icon:"envelope",name:"Finance",url:"/donat/finance"},
],

data:{email:'sa',pin:'123'},

signform:{
id:'signin',
input:{data:{email:'',pin:''},
tipe:[ {id:"pin",nama:"password",arr:'1,2'},],},

button:{data:[
{id:1,nama:"Sign in",icon:"person",url:"login.controller.signin()"},
]},},

regform:{
id:'regform',
input:{
data:{email:'',pin:''},
tipe:[ {id:"pin",nama:"password",arr:'1,2'},],},
button:{data:[
  {id:1,nama:"Sign up",icon:"person",url:"login.controller.signup()"},
]},},


}, //end model

view:{
  editform:function(arr){
  return `
  <div id="login" class="show row login">
  <h1>Login</h1>
  <div class="shadow">
  <div class="row"> ${d.view.input(arr.input)} </div>
  <div class="row"> ${d.view.button(arr.button)}
  </div>
  </div>
  </div>`;
  },

  signform:function(arr){
  return `
  <div id="login" class="show row login">
  <div class="shadow" >
  <h1>Sign in</h1>
  <div class="row"> ${d.view.input(arr.input)} </div>
  <div class="row"> ${d.view.button(arr.button)}
  </div>
  </div>
  </div>`;
  },

regform:function(arr){
return `
<div id="login" class="show row login">
<div class="shadow" >
<h1>Sign up</h1>
<div class="row"> ${d.view.input(arr.input)} </div>
<div class="row"> ${d.view.button(arr.button)} </div></div></div>`;
},

}, //end view



controller:{
editform:function(){
d.gebi('content').innerHTML=login.view.regform(login.model.regform);
},

signform:function(){
  d.gebi('content').innerHTML=login.view.signform(login.model.signform);

  },

regform:function(){
d.gebi('main').classList.add("login");
d.gebi('content').innerHTML=login.view.regform(login.model.regform);
},

login:function(){

loginstatus=login.controller.statlog(); // false
log(loginstatus)

  out=`
  <div class="row shadow">
  <div class=" kanan gButton">
  `;

  if (loginstatus === true){
    log(typeof loginstatus)

    datauser=d.getls('data');
    log(datauser)
    res=JSON.parse(datauser)


    log(res.email)

  out+=`
    <button id="appBtn" > <img data-src="menu/20">  apps</button>
    <button id="profileBtn" > <img data-src="menu/20"> ${res.email} </button>
    `;

  } else {
    out+=`


    <button id="appBtn" ><img data-src="menu/20"> </button>
    <button onclick="login.controller.signform()" > <img data-src="user/20"> Sign in</button>
    <button onclick="login.controller.regform()" > <img data-src="pen/20"> Sign up</button>
`;

  }

  out+=`
  </div></div>

  <div class="app-panel" id="appPanel">
    <div class="app-grid" id="appGrid"></div>
  </div>

  <div class="profile-panel" id="profilePanel"></div>
  `;

  d.gebi('topmenu').innerHTML=out;

  /* ===== TOGGLE ===== */
  var appBtn = document.getElementById('appBtn');
  var appPanel = document.getElementById('appPanel');
  var profileBtn = document.getElementById('profileBtn');
  var profilePanel = document.getElementById('profilePanel');

if (appBtn && appPanel) {
  appBtn.onclick = e=>{
    e.stopPropagation();
    appPanel.classList.toggle('active');
    profilePanel.classList.remove('active');
  };
}

if (profileBtn && profilePanel) {
  profileBtn.onclick = e=>{
    e.stopPropagation();
    profilePanel.classList.toggle('active');
    appPanel.classList.remove('active');
  };
}
  document.onclick = ()=>{
    appPanel.classList.remove('active');
    profilePanel.classList.remove('active');
  };

  // apps=login.model.apps;

  // const res = await fetch('data/login.json');
  // const apps = await res.json();




 apps=config.apps;


  var grid = document.getElementById('appGrid');

//   apps.forEach(app=>{
//     var el = document.createElement('div');
//     el.className = 'app-item';
//     el.innerHTML = `
//       <div class="app-icon"><img data-src="${app.icon}"></div>
//       <div class="app-name">${app.name}</div>
//     `;
//     el.onclick = ()=>
//
// if (app.url){
//     navigate(app.url);
//     // window.open(app.url,'_blank');
//     grid.appendChild(el);
// }
// if  (app.modal){
// d.modal(app.url)
// window[app.url];
//
// }
//
//   });



apps.forEach(app => {
     var el = document.createElement('div');
    el.className = 'app-item';
    el.innerHTML = `
      <div class="app-icon"><img data-src="${app.icon}" ></div>
      <div class="app-name">${app.name}</div>
    `;

    el.onclick = () => {
        if (app.url && !app.modal) {
            navigate(app.url);
        } else if (app.modal) {
            // d.modal(app.modal);
            // window[app.modal]('/al/templates/style-catalog.css');
            const [apps, func, param] = app.modal.split("/");
            window[apps].controller[func](param)
        }
    };

    grid.appendChild(el);
});



    var panel = document.getElementById('profilePanel');

      panel.innerHTML = `
        <div class="profile-header">
          <div class="profile-info">
            <strong>s</strong><br>
            <small>d</small>
          </div>
        </div>
        <div class="profile-actions gButton">
          <button onclick="login.controller.signout()">Sign out</button>
          <button onclick="login.controller.editform()">Edit</button>
        </div>
      `;


},

statlog:function(){
data=d.getls('data');
if(data) {return true} else { return false}
},


signin:function(){res=login.model.data;
email=d.gebi('email').value;
pin=d.gebi('pin').value;

d.service.host=login.model.host;
d.service.param={t:'master_users', mod:'signin',nama:{email:email,pin:pin}};
d.service.get(callback);

function callback(json){
res=JSON.parse(json);
if (res.status=='ok'){ d.setls('data',res);
login.controller.login();
}
else { d.info('Login Gagal');}
}




},

signup:function(i){
email=d.gebi('email').value;
pin=d.gebi('pin').value;
d.service.host=login.model.host;
d.service.param={t:'view_kursus', mod:'signup',nama:{email:email,pin:pin}};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
log(res)
}
},

signout:function(){
d.remls('data');
this.login();
},

}, //end controller

service:{
login:function(){data=d.getls('data');
if(data) {this.profile();} else { this.signform();}
},

signin:function(){   email=d.gebi('email').value;
pin=d.gebi('email').value;
param={mod:"login",data:{email:email,pin:pin}}
d.api.req(param,callback);
function callback(json){
// d.modal(json)

res=JSON.parse(json)

if (res.login.length>0){
d.setls('data',res);
d.login.login();
}
else {
d.info('Login Gagal')
}
// login.app.js.login();
}},

signout:function(){d.remls('data');this.login();},

signform:function(){
d.gebi('main').classList.add("login");
d.gebi('content').innerHTML=login.view.signform(login.model.signform);
},

}, //end service

}; // end login

login.controller.login(1);
