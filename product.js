

web={
gebi:function(id){ return document.getElementById(id) ;},
setPage:function(arr){
  // toggleMenu();

  web.gebi('content').innerHTML=arr;},

home:`
<div class="row striped-bg-both" id="page3">

<div class="col-2-3 artikel"><span class="judul2">Free Enterprise Resource Planning </span><br>
Gratis Program CMS, LMS, Presensi dan Akuntansi <br>
<a href="#">download</a>
</div>

<div class="col-1-3 artikel">
<i style="max-width:300px;" class="kanan img"> ${svg.icon('piawai')}</i>
</div>

</div>

<div class="row gading" >
<div class="col-1-3 artikel" >
<i class="simg">${svg.icon('save')} </i>
<span class="judul">Free</span><br>Sistem Informasi Akademik Sekolah bisa diunduh dan digunakan.
Maksimal produk yang bisa disimpan adalah 1000 item <br>
+ Live Demo <br>
+ download<br>
+ Download Desktop <br>
+ Download without Webserver</div>
<div class="col-1-3 artikel" >
<i class="simg">${svg.icon('person')}  </i>
<span class="judul">Unlimited</span> <br>
Harga Mulai 100.000, Program Komputer siap pakai, tersedia Aplikasi Inventory, Aplikasi Penjualan, Aplikasi Keuangan dan Aplikasi Dagang. <br>
+ Order </div>
<div class="col-1-3 artikel" >
<i class="simg"> ${svg.icon('setting')}</i>
<span class="judul">Customize</span> <br>
Harga Mulai 1.500.000, Program Komputer yang disesuaikan dengan kebutuhan anda. <br>
+ Hubungi Kami<br>
+ download <br>
+ Proposal</div>
</div>


<div class="row  striped-bg-both " id="page4">
<div class="col-1-3 artikel" id="page4-1">
<span class="judul">News & Events</span><br>
Sistem Informasi Dagang Berbasis Web <hr>
Kami siap membantu membuat program yang disesuaikan dengan kebutuhan usaha anda.
</div>

<div class="col-2-3 artikel" id="page4-2">

<span class="judul">Selamat Datang di Piawai</span><br>
Sistem Informasi Akademik Sekolah. <hr>
Program stokbarang adalah aplikasi database untuk distributor yang memiliki banyak supplier dan customer, dengan harga barang yang bervariasi,
harga sebuah barang yang sama dapat berbeda harganya bergantung pada kesepakatan harga.<br>
Dibuat menggunakan PHP  dan MySQL , dengan perintah SQL sehingga mampu menangani transaksi data yang besar. Stokbarang mendukung multi user dan Network.<hr>
<div class="s-12 l-6">
+ Cocok untuk banyak jenis usaha.<br>
+ Nominal Converter.<br>
+ Multi User.<br>
+ Barcode Ready.<br>
+ Laporan Keuangan Akuntansi Dagang dan Jasa.<br>
</div>
<div class="s-12 l-6">
+ Pengingat batas minimal persediaan.<br>
+ Pengingat barang kadaluarsa.<br>
+ Export-impor dalam format excel.<br>
+ Bisa Untuk Kasir.<br>
</div>
</div>
</div>
</div>

`,


payment:`

<div class="row  striped-bg-both " id="page3">

<div class="artikel"><span class="judul2">Payment</span></div>
 </div>

<div class="row  striped-bg-both " id="page4">
<div class="col-1-3 artikel">

<span class="judul">Payment Confirmation Form </span>
<hr>
Informasi<br>
Download aplikasi stokbarang free, Produk yang bisa disimpan palig banyak 10 item.<br>
Jika sesuai dengan yang anda butuhkan, anda bisa upgrade ke Paket Unlimited
<hr>
1. Lakukan Pembayaran <br>
Transfer Pembayaran ke<br>
BCA : 628 036 0048 <br>
a/n : Wawan Sismadi <br>
<hr>
2. Konfirmasi Pembayaran <br>
Kirim SMS ke 087885073737 <br>
atau email ke konfirmasi@sismadi.co.id<br>
dengan menyertakan nama pemilik rekening, email dan nama paket. <br>
Kode aktifasi dikirim melalui email setelah kami terima pembayaran.
</div>

<div class="col-2-3 artikel">
<span class="judul">Konfirmasi Pembayaran</span><hr>
Email *
<input type="text">
Jumlah Dibayarkan *
<input type="text">
<input type="submit" value="Submit">
</div>
</div>



`,


order:`
<div class="row  striped-bg-both " id="page3">


<div class="artikel"><span class="judul2">Order</span></div></div>

<div class="row  striped-bg-both " id="page4">
<div class="col-1-3 artikel">

<span class="judul">Order Paket Unlimited </span>
<hr>
Informasi<br>
Download aplikasi stokbarang free, Produk yang bisa disimpan palig banyak 10 item.<br>
Jika sesuai dengan yang anda butuhkan, anda bisa upgrade ke Paket Unlimited
<hr>
1. Lakukan Pembayaran<br>
Transfer Pembayaran ke <br>
BCA : 628 036 0048 <br>
a/n : Wawan Sismadi <br>
<hr>
2. Konfirmasi Pembayaran <br>
Kirim SMS ke 087885073237 <br>
atau email ke sales@sismadi.co.id <br>
dengan menyertakan nama pemilik rekening, email dan nama paket.<br>
Kode aktifasi dikirim melalui email setelah kami terima pembayaran.
</div>

<div class="col-2-3 artikel">

<span class="judul">Order Form</span><hr>
Nama *
<input type="text">
Email *
<input type="text">
Paket *
<input type="text">
Inventory
<input type="text">
Harga
<input type="text">
Kode Unik
<input type="text">
Jumlah Yang Dibayar *
<input type="text">
<input type="submit" value="submit">
'
`,

product:`
<div class="row  striped-bg-both " id="page3">
<div class="artikel"><span class="judul2">Product</span></div>

</div>

<div class="row  striped-bg-both " id="page4">
<div class="col-1-3 artikel">

<span class="judul">Paket Free Stokbarang</span><br>
Produk yang bisa disimpan maksimal 10 item <br>
Demo | Download | Manual Book | Video Tutorial |
<hr>
<span class="judul">Paket Unlimited</span><br>
Input data tidak dibatasi
Order
<hr>
<span class="judul">Paket Training</span><br>
Training aplikasi Stokbarang.<br>
Biaya: Rp75.000/jam/orang.<br>
Lama training: minimal 2 jam .<br>
Waktu dan tempat: disesuaikan.<br>
Peserta: minimal 2 Orang .<br>
Modul Training: Buku dan CD aplikasi
</div>

<div class="col-2-3 artikel">

<span class="judul">Harga dan Perbandingan Paket</span><br>
Modul Aplikasi yang tersedia pada masing masing Paket .
<hr>
<div class="table">
<table cellspacing="0">
<tr><th>Details</th>
<th>Inventory </th>
<th>Penjualan</th>
<th>Mini Market </th>
<th>Akuntansi</th>
</tr>

<td>Harga</td>
<td>Rp.100000 /user</td>
<td>Rp.150000 /user</td>
<td>Rp.200000 /user</td>
<td>Rp.250000 /user</td></tr>
<tr>
<td>Lokasi</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>
<tr class="even">
<td>Keluar</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>

<tr>
<td>Masuk</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>
<tr class="even">
<td>Laporan Distribusi </td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>
<tr class="even">
<td>Kontak</td>
<td>&nbsp;</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>

<tr>
<td>Beli</td>
<td>&nbsp;</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>

<tr>
<td>Jual</td>
<td>&nbsp;</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>

<tr>
<td>Tagihan</td>
<td>&nbsp;</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>

<tr>
<td>Laporan Transaksi </td>
<td>&nbsp;</td>
<td>Ya</td>
<td>Ya</td>
<td>Ya</td></tr>
<tr>
<td>Kasir</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>Ya</td>
<td>Ya</td></tr>
<tr>
<td>Akun</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>Ya</td></tr>

<tr>
<td>Persamaan</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>Ya</td></tr>

<tr>
<td>Posting</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>Ya</td></tr>

<tr>
<td>Jurnal</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>Ya</td></tr>

<tr>
<td>Buku Besar </td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>Ya</td></tr>

<tr>
<td>Laporan Keuangan </td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>Ya</td></tr>

<tr class="even"><td></td>
<td><input type="submit" value="order"></td>
<td><input type="submit" value="order"></td>
<td><input type="submit" value="order"></td>
<td><input type="submit" value="order"></td></tr>
</table>
</div>
'
`,

contact:`
<div class="row  striped-bg-both " id="page3">


 <div class="artikel"><span class="judul2">Contact</span></div></div>


 <div class="row  striped-bg-both " id="page4">
 <div class="col-1-3 artikel">

<span class="judul">Contact Info</span>n
<hr>
Wawan Sismadi <br>
Phone:087885073237 <br>
email: wawan@sismadi.co.id'
</div>

<div class="col-2-3 artikel">
<span class="judul">Contact Form</span> <br>
Jika ada pertanyaan atau informasi lain berhubungan dengan stokbarang,
kami siap membantu, bisa hubungi kami melalui telpon, email, messenger atau mengisi form berikut.
<hr>
Your Name *
<input type="text">
Your Email *
<input type="text">
Company Name
<input type="text">
Subject
<input type="text">
Message *
<input type="text">
<input type="submit" value="submit">
'
`,
};
// web.web();




const burger = document.getElementById('burgerBtn');
const nav = document.getElementById('navLinks');

// Toggle menu
burger.addEventListener('click', (e) => {
  nav.classList.toggle('active');
  e.stopPropagation(); // prevent event bubbling
});

// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && !nav.contains(e.target) && e.target !== burger) {
    nav.classList.remove('active');
  }
});

// Optional: Hide menu after clicking a menu link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});
