const DonatPreviewer = {
    update: function(jsonInput) {
        try {
            const parsedData = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;

            if (!parsedData.data) {
                console.error("Format JSON salah: Properti 'data' tidak ditemukan.");
                return;
            }

            // 1. Masukkan data ke dalam rawBlocks (Sesuai cara kerja app.js)
            ui.rawBlocks = parsedData.data;

            // 2. Tandai container dengan ID virtual agar tidak diblokir render ulang
            const container = document.getElementById('content');
            if (container) {
                container.setAttribute('data-active-api', 'preview-mode');

                // 3. Panggil fungsi refresh bawaan app.js
                ui.refresh('content');

                // 4. Trigger pemrosesan ulang ikon (donat.js/svg.js)
                if (window.svg && typeof window.svg.process === 'function') {
                    window.svg.process();
                }
            }

            console.log(`[Preview] Berhasil merender ${parsedData.data.length} section.`);
        } catch (e) {
            console.error("Kesalahan JSON:", e.message);
        }
    }
};


function toggleSidepanel() {
    const panel = document.getElementById('json-sidepanel');
    panel.classList.toggle('open');
}

// Fungsi untuk update realtime saat mengetik
document.getElementById('json-input').addEventListener('input', function(e) {
    applyJSON(e.target.value);
});

function applyJSON(input) {
    const val = input || document.getElementById('json-input').value;
    const status = document.getElementById('json-status');

    try {
        const parsed = JSON.parse(val);
        if (parsed.data) {
            // Sesuai dengan app.js: isi rawBlocks dan panggil refresh
            ui.rawBlocks = parsed.data;

            // Set API aktif ke dummy agar tidak bentrok dengan fetch renderPage
            document.getElementById('content').setAttribute('data-active-api', 'live-editor');

            ui.refresh('content');

            // Re-render SVG icons dari donat.js
            if (window.svg) window.svg.process();

            status.innerText = "✓ JSON Valid";
            status.style.color = "green";
        }
    } catch (e) {
        status.innerText = "✗ Invalid JSON";
        status.style.color = "red";
    }
}

/**
 * Fungsi untuk mendeteksi parameter URL dan memuat JSON ke editor
 */
async function loadJsonFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    // Mengambil semua kunci (misal: web/page/home)
    const pagePath = window.location.search.substring(1);

    if (pagePath && typeof config !== 'undefined' && config.getdata) {
        const jsonUrl = config.getdata(pagePath);
        const status = document.getElementById('json-status');
        const textarea = document.getElementById('json-input');

        try {
            status.innerText = "⏳ Memuat data...";

            // Fetch data asli dari server
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error("File JSON tidak ditemukan");

            const data = await response.json();

            // Masukkan ke textarea dengan format rapi (indentasi 2 spasi)
            textarea.value = JSON.stringify(data, null, 2);

            // Jalankan previewer agar tampilan sinkron
            applyJSON(textarea.value);

            status.innerText = "✓ Data dimuat dari URL";
            status.style.color = "skyblue";
        } catch (err) {
            console.error("Gagal load URL:", err);
            status.innerText = "✗ Gagal ambil JSON";
            status.style.color = "orange";
        }
    }
}

// Jalankan fungsi saat halaman selesai dimuat
window.addEventListener('DOMContentLoaded', loadJsonFromURL);

// Tambahkan juga listener agar saat klik menu kiri, editor terupdate
const originalNavigate = window.navigate; // Jika navigate adalah fungsi global
window.navigate = function(path) {
    if (typeof originalNavigate === 'function') originalNavigate(path);
    // Beri sedikit delay agar URL berubah dulu
    setTimeout(loadJsonFromURL, 100);
};
