var svg={
model:{
data:[],
  // host:'http://localhost/api/piawai/pesan.php',
host:'/ui/svg/data/pesan.json',
table:{id:'pesan',data:[
  {id:1,nama:"pesan1",isi:1},
  {id:2,nama:"pesan2",isi:2},
]},},

controller:{
  data:async function (){
    if (pesan.model.data.length > 0) return;
    const res = await fetch('/al/admin/data/pesan.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    const nah = await res.json();
    pesan.model.data = nah.data;
    },

view:async function (){
await pesan.controller.data();
table.data=pesan.model.data;
d.controller.view()
},


loadicons: async function () {
try {
const response = await fetch('svg/data.json');
const data = await response.json();
let out = "";
out = `<div class="row shadow" >`;

Object.entries(data).forEach(([name, path]) => {
  out += `<img data-src="${name}/60x60" alt="${name} Solid">`;
});
out += `</div>`;
d.gebi('content').innerHTML = out;

} catch (error) {
console.error("Gagal memuat ikon:", error);
}
}

},

};
