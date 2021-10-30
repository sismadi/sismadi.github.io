blog={
gebi:function(i){ return  document.getElementById(i);},
page:{},
arr:[
{nama:'Satu',isi:'isi satu'},
{nama:'Dua',isi:'isi dua'},
{nama:'Tiga',isi:'isi tiga '},
{nama:'Empat',isi:'isi empat'},
{nama:'Lima',isi:'isi lima'},
{nama:'Akuntansi',isi:'isi enam'},
{nama:'Enam',isi:'isi tujuh'},
{nama:'Tujuh',isi:'isi delapan'},
{nama:'Delapan',isi:'isi delapan'},
],

view:function() {
this.gebi('ico').innerHTML=this.svg();
// this.gebi('img').innerHTML=this.svg();
// this.page.home= this.gebi('home').innerHTML;
// this.page.about= this.gebi('about').innerHTML;
// this.goPage('home');
this.home();
},

goPage:function(i) {
this.gebi('content').innerHTML=blog.page[i];
},

home:function() {
arr=this.arr;
// out='<div class= "row artikel judul">  Projects </div>';
out='';
for(i in arr){
out+='<i class="logo kecil"></i>Wawan sismadi\
<div class = "row"> \
<span onclick="blog.detail(\''+i+'\')">'+arr[i].nama+'</span>';

str=arr[i].isi;
if(str.length>5){ str=str.substring(0, 5) + ' <span onclick="blog.more(\''+i+'\')"> more...</span>' }

out+='<div id="content-'+i+'" >'+str+'</div>\
<hr class="image">\
<hr><hr><hr>\
</div>';
}
// this.gebi('content').innerHTML = arr[i].isi;
this.gebi('body').innerHTML = out;
},


more:function(i) {
arr=this.arr;
str=arr[i].isi;
this.gebi('content-'+i).innerHTML = str;
},

blog:function() {
arr=this.arr;
out='<div class= "row artikel judul">  Projects </div>';
for(i in arr){
out+='<div class = "col-1-3 artikel"> <span onclick="blog.detail(\''+i+'\')">'+arr[i].nama+'</span>\
<hr class="image">\
<hr><hr><hr>\
</div>';
}
// this.gebi('content').innerHTML = arr[i].isi;
this.gebi('content').innerHTML = out;
},

detail:function(i) {
arr=this.arr;
// this.gebi('content').innerHTML = arr[i].isi;
out='';
out+='<div class = "row artikel judul">'+arr[i].nama+'</div>';
out+='<div class = "row artikel"> '+arr[i].isi+'\
<hr class="image">\
<hr><hr><hr>\
</div>';
this.gebi('content').innerHTML = out;
},

svg:function(){
svg='<svg class="logok" viewbox="0 0 45 38">\
<g transform="translate(0,15) rotate(-45)">\
<g transform="translate(1,0)">\
<rect x="1" y="1" class="rect1"/><rect x="10" y="2" class="rect2"/>\
</g>\
<g transform="translate(0,11)">\
<rect x="1" y="1" class="rect2"/><rect x="12" y="0" class="rect1"/>\
<rect x="21" y="1" class="rect2"/>\
</g>\
<g transform="translate(1,20)">\
<rect x="1" y="1" class="rect1"/><rect x="10" y="2" class="rect2"/>\
<rect x="21" y="1" class="rect1"/>\
</g>\
</g>\
</svg>';
return svg;
},

scroll:function(){
  var m=document.getElementById('main');
  var z=document.getElementById('logo');
  var y=document.getElementById('latar');
  if (document.body.scrollTop > 420 || document.documentElement.scrollTop > 420) {
    this.gebi("navbar").style.display = "block";
  } else {
    this.gebi("navbar").style.display = "none";
  }

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        alert("top");          // User has scrolled to the bottom of the element
        }



},





};

window.onscroll = function() {blog.scroll()};
blog.view();
