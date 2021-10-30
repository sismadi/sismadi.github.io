modal={
gebi:function(i){ return  document.getElementById(i);},
data:'<hr class="image"><hr><hr><hr>',
view:function() {
out='<div id="myModal" class="modal">\
<div class="modal-content">\
<div class="row"><i class="logo kecil"></i></div>\
<div class="row"><textarea> </textarea></div >\
<div class="row"><button>Kirim</button></div >\
<span class="close">&times;</span>';
// out+=this.data;
out+='</div></div>';
this.gebi('modal').innerHTML=out;
this.open('modal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function() { modal.close('modal')}
},

close:function(id){ var z=this.gebi(id);
z.className = z.className.replace('show', 'hide');
},

open:function(id){ var z=this.gebi(id);
z.className = z.className.replace('hide', 'show');
},

};
