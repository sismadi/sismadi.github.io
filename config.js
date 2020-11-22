conf.isDb=1;
conf.akses=['c','r','u','d'];
document.title="Ktupad v2";
// conf.dataApp.host='https://blog.ktupad.com/';
conf.dataApp.host='http://localhost/web/';
conf.dataApp.model='database.php';
conf.home='modules/home/controller.js?home/view';
// if(conf.isSc==0){conf.loadController(conf.home);}

conf.loadController(conf.home);
// var url_string = window.location.href
// var url = new URL(url_string);
// var c = url.searchParams.get("c");

// conf.loadController(c)
// conf.info(c)
// console.log(c);

// if(conf.isSc==0){conf.loadController('modules/master/login/controller.js?login/view')}
// out  ='<a class="pLightColor" href="#" onclick="conf.loadController(conf.home)" id="home"><i class="ico ico-home"></i></a>';
out  ='<i class="ico ico-home" onclick="conf.loadController(conf.home)"></i>';
document.getElementById('li-kiri').innerHTML=out;
