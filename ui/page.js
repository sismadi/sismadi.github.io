var page = {
cache: {},

controller: {
web: function(id) { ui.renderPage(config.getdata(id)); },

verifikasi: function(id) {
    const [app, func, param] = id.split("/");
    if (!param) return;
    const parts = param.split("-");
    const pageName = parts[0]; // 'profile'
    const kredensial = parts[1]; // '202509080101'
    console.log(`Routing Log: Membuka halaman [${pageName}] untuk kredensial [${kredensial}]`);
    ui.activeCredential = kredensial;
    const urlJson = config.getdata(`page/web/${pageName}`);
    ui.renderPage(urlJson);
},


modul: async function(id) {
        // ID bisa berupa: lms/web/modul/pbo (untuk list) atau lms/web/modul/pbo-m01 (untuk item)
        const [app, func, param] = id.split("/");
        if (!param) return;
        const [kursusId, itemModulId] = param.split("-");
        if (itemModulId) {
          // const dbUrl = config.getdata(`kursus/kursus-${kursusId}`);
          const dbUrl = config.getdata(`kursus/${kursusId}-kursus`);
          log(dbUrl)
          log(kursusId)
            try {
                if (!ui.cache[dbUrl]) {
                    const res = await fetch(dbUrl);
                    ui.cache[dbUrl] = await res.json();
                }

                const db = ui.cache[dbUrl];
                const detailModul = db.data.find(m => m.id === itemModulId);

                if (detailModul) {
                    // Tentukan section berdasarkan kolom 'materi' (renderPdf -> pdf, renderMp4 -> mp4)
                    const sectionType = detailModul.materi === 'renderPdf' ? 'pdf' : 'mp4';

                    // Susun objek JSON halaman secara dinamis di memori
                    const dynamicPage = {
                        "data": [
                            {
                                "section": sectionType,
                                "caption": detailModul.desc,
                                "url": detailModul.url,     // Untuk MP4
                                "pdfurl": detailModul.url,  // Untuk PDF (sesuai engine ui.renderPdf)
                                "btn": [
                                    { "text": "Kembali ke Daftar Moduls", "url": `page/web/${kursusId}`, "icon": "?menu/16" },
                                    // { "text": "side", "modal": "lms/web/side/kursus", "icon": "?back/32" },
                                    { "text": " Daftar Isi Modul", "modal": `page/side/${kursusId}`, "icon": "?menu/24" }

                                ]
                            }
                        ]
                    };

                    // Gunakan ID virtual agar ui.renderPage bisa memprosesnya melalui cache
                    const virtualPath = `virtual/${kursusId}/${itemModulId}`;
                    ui.cache[virtualPath] = dynamicPage;
                    ui.renderPage(virtualPath);
                } else {
                    console.error("Modul tidak ditemukan di database.");
                }
            } catch (err) {
                console.error("Gagal memproses materi dinamis:", err);
            }

        } else {
            // JIKA HANYA KURSUS (pbo): Buka halaman kurikulum kursus biasa
            console.log(`LMS Log: Membuka Kurikulum [${kursusId}]`);
            const urlJson = config.getdata(`data/kursus/${kursusId}-kursus`);
            ui.renderPage(urlJson);
        }
    },


    side: async function(ids) {
        kursusId=ids;
        const targetId = 'panel-body';
        d.sidePanel("Daftar Modul", "Memuat data...");
        try {
            const dbUrl = config.getdata(`kursus/${kursusId}-kursus`);
            if (!ui.cache[dbUrl]) {
                const res = await fetch(dbUrl);
                ui.cache[dbUrl] = await res.json();
            }
            const db = ui.cache[dbUrl];
            const dynamicSideData = {
                "data": [
                    {
                        "section": "side",
                        "caption": db.nama || "Materi Kursus",
                        "btn": db.data.map(m => ({
                            "text": m.name,
                            "url": `page/modul/${kursusId}-${m.id}`,
                            // "icon": m.icon === "renderPdf" ? "?pdf/32" : "?video/32"
                            "icon": m.icon
                        }))
                    }
                ]
            };
            const virtualSidePath = `virtual/side/${kursusId}`;
            ui.cache[virtualSidePath] = dynamicSideData;
            const htmlContent = await ui.renderSide1(virtualSidePath);
            d.sidePanel(db.nama || "Materi", htmlContent);
        } catch (err) {
            console.error("Gagal memuat side panel dinamis:", err);
            d.sidePanel("Error", "Gagal memuat daftar modul.");
        }
    },

}
};
