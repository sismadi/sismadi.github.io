log=console.log.bind(window.console);
log('donat');

url=function(){
var slug = window.location.search.replace("?", "").toLowerCase();
if(!slug) slug = "page/web/home"; // Default route
const [app, func, param] = slug.split("/");

// config.db=dbs;

try { if(window[app] && window[app].controller[func]) {

  // window[app].controller[func](param)
  window[app].controller[func](slug)

active=`${app}/${func}/${param}`;
      ActiveMenu(active)
      log(active)
    } else {
        d.gebi('page-title').innerText = "404 Not Found";
    }
} catch (e) {
    console.error("Routing Error:", e);
}

};

navigate=function(path) {
    window.history.pushState({}, "", "?" + path);
    url();
}

path=function(ids) {
  log(ids)
  const [app, func, param] = ids.split("/");
  window[app].controller[func](param)
}


async function ActiveMenu(targetMenu) {
      const currentActive = document.querySelector('#leftmenu li.active');
      if (currentActive) currentActive.classList.remove('active');
      const target = document.querySelector(`#leftmenu li[data-info="${targetMenu}"]`);
      if (target) target.classList.add('active');
}



window.onpopstate = () => url();
window.onload = () => url();
