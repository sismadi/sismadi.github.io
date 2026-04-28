const pages = {
    home: [
        {
            section: 'hero',
            title: 'Sismadi Lab',
            tagline: 'Experimental Zone, tempat Framework Lahir Sebelum Jadi Produk',
            description: 'Dari lab ini sudah lahir Ktupad (2019), BayamJS (2023), dan DonatJS (2024) — ketiganya terdaftar sebagai Hak Cipta resmi. Yang sedang dimasak berikutnya ada di sini.',
            // img: 'sismadi-lab.svg',
            imgClass: 'di-sismadi',

            badges: ['Ktupad · 2019', 'BayamJS · 2023', 'DonatJS · 2024'],
            cta: { text: 'Lihat Ekosistem &raquo;', link: 'ekosistem' }
        },
        {
            section: 'features',
            items: [
                {
                    icon: 'di-code',
                    title: 'Framework Lab',
                    content: 'Ruang ngoprek terbuka. Setiap framework dan tools diuji di sini dulu — sebelum naik ke bahan ajar atau dikemas jadi produk.',
                    linkText: 'Lihat Ekosistem',
                    linkTarget: 'ekosistem'
                },
                {
                    icon: 'di-file',
                    title: 'Snippet & Docs',
                    content: 'Koleksi snippet, catatan teknis, dan dokumentasi dari hasil eksperimen nyata. Bukan tutorial — ini dev log yang jujur.',
                    linkText: 'Buka Snippets',
                    linkTarget: 'snippets'
                },
                {
                    icon: 'di-refresh',
                    title: 'Changelog',
                    content: 'Rekam jejak iterasi setiap framework. Label jelas: <strong>[STABLE]</strong>, <strong>[BETA]</strong>, <strong>[DEPRECATED]</strong>. Tidak ada yang tiba-tiba naik ke produksi.',
                    linkText: 'Lihat Changelog',
                    linkTarget: 'changelog'
                }
            ]
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'Pipeline Lab',
                lines: [
                    '### Alur Kerja',
                    '**sismadi.com** &mdash; ngoprek & proof of concept',
                    '**sismadi.sch.id** &mdash; dikurasi jadi bahan ajar',
                    '**sismadi.co.id** &mdash; produk jadi siap pakai',
                    '---',
                    'Tidak ada yang langsung ke produksi tanpa melewati lab.'
                ]
            },
            rightCol: {
                subtitle: 'Status Saat Ini',
                lines: [
                    'table:default'
                ],
                table: [
                    { 'Framework': 'Ktupad', 'Tipe': 'MVC PHP', 'Status': '[STABLE]', 'HKI': 'EC00201952487' },
                    { 'Framework': 'BayamJS', 'Tipe': 'MVC JS', 'Status': '[STABLE]', 'HKI': 'EC00202367008' },
                    { 'Framework': 'DonatJS', 'Tipe': 'JSON-Driven MVC', 'Status': '[AKTIF]', 'HKI': 'EC00202414144' },
                    { 'Framework': 'Next', 'Tipe': '?', 'Status': '[WIP]', 'HKI': '-' }
                ]
            }
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'Stack Lab',
                lines: [
                    'skill:PHP / MVC Architecture:80',
                    'skill:JavaScript / Node (Zero Dependency):85',
                    'skill:JSON-Driven UI System:80',
                    'skill:SVG Engineering:85',
                    'skill:WebAssembly (Research):60'
                ]
            },
            rightCol: {
                subtitle: 'Tentang Lab Ini',
                lines: [
                    '**Sismadi Lab** adalah ruang eksperimen milik **PT Sismadi Langit Solusi**.',
                    'Setiap framework yang lahir di sini dimulai dari satu pertanyaan sederhana: <em>kenapa solusi yang ada terlalu berat untuk kebutuhan kita?</em>',
                    '---',
                    'Dikelola oleh **Wawan Sismadi, M.Kom.** &mdash; Dosen, Peneliti, dan Software Architect.',
                    'link:wawan.sismadi.com:https://wawan.sismadi.com'
                ]
            }
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'Temukan di',
                lines: [
                    'contact:di-github|GitHub|github.com/sismadi|https://github.com/sismadi',
                    'contact:di-envelope|Email|wawan@sismadi.com|mailto:wawan@sismadi.com',
                    'contact:di-web|Produk|sismadi.co.id|https://sismadi.co.id',
                    'contact:di-geo|Lokasi|Jakarta Timur, Indonesia'
                ]
            },
            rightCol: {
                subtitle: 'Punya Ide Eksperimen?',
                lines: ['form:contact'],
                fields: [
                    { type: 'text', name: 'nama', label: 'Nama', placeholder: 'Nama Anda' },
                    { type: 'text', name: 'kontak', label: 'Email / GitHub', placeholder: 'email atau github.com/username' },
                    { type: 'text', name: 'perihal', label: 'Topik', placeholder: 'Misal: framework ringan untuk IoT' },
                    { type: 'textarea', name: 'pesan', label: 'Deskripsi', rows: 4, placeholder: 'Ceritakan idenya...' }
                ],
                submitText: 'Usulkan Eksperimen'
            }
        }
    ],

    ekosistem: [
        {
            section: 'titleHero',
            title: 'Ekosistem Framework',
            description: 'Tiga framework dengan Hak Cipta resmi — lahir dari satu lab, masing-masing menjawab kebutuhan berbeda. Bukan pengganti satu sama lain, tapi evolusi dari satu pola pikir yang sama: ringan, efisien, kontekstual.'
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'Ktupad · 2019',
                lines: [
                    '**Tipe**: MVC Framework berbasis PHP',
                    '**HKI**: EC00201952487',
                    '---',
                    'Framework pertama yang lahir dari kebutuhan pengajaran mata kuliah Pemrograman Web. Ringan, tanpa dependency eksternal, cocok untuk lingkungan kampus dengan infrastruktur terbatas.',
                    '---',
                    '**Status**: [STABLE] &mdash; dipakai di bahan ajar, tidak aktif dikembangkan.',
                    'link:Lihat HKI EC00202219047:https://pdki-indonesia.dgip.go.id'
                ]
            },
            rightCol: {
                subtitle: 'Kenapa Lahir?',
                lines: [
                    'Mahasiswa kesulitan memahami pola MVC karena framework populer (Laravel, CodeIgniter) terlalu banyak abstraksi untuk pemula.',
                    'Ktupad didesain sebagai <em>MVC yang bisa dibaca dari satu folder</em> — tidak ada magic, semua eksplisit.',
                    '---',
                    '**Yang diambil ke generasi berikutnya:**',
                    '&bull; Pola routing sederhana berbasis file',
                    '&bull; Pemisahan M-V-C yang ketat tanpa ORM berat'
                ]
            }
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'BayamJS · 2023',
                lines: [
                    '**Tipe**: MVC Framework berbasis JavaScript',
                    '**HKI**: EC00202367008',
                    '---',
                    'Iterasi kedua — pindah dari PHP ke JavaScript murni. Lahir dari kebutuhan aplikasi yang bisa berjalan di sisi klien tanpa server, cocok untuk lingkungan dengan koneksi tidak stabil.',
                    '---',
                    '**Status**: [STABLE] &mdash; aktif di beberapa proyek, tidak aktif dikembangkan.',
                ]
            },
            rightCol: {
                subtitle: 'Kenapa Lahir?',
                lines: [
                    'Ktupad butuh server PHP. Di lapangan, banyak institusi yang tidak punya hosting yang memadai.',
                    'BayamJS menjawab: <em>bagaimana kalau seluruh aplikasi bisa jalan dari file HTML statis?</em>',
                    '---',
                    '**Yang diambil ke generasi berikutnya:**',
                    '&bull; Client-side routing tanpa server',
                    '&bull; Zero dependency — tidak ada npm install',
                    '&bull; Struktur modular berbasis JS vanilla'
                ]
            }
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'DonatJS · 2024',
                lines: [
                    '**Tipe**: JSON-Driven MVC Framework',
                    '**HKI**: EC00202414144',
                    '**Paten**: S00202603129 (proses)',
                    '---',
                    'Iterasi ketiga — konten dan tampilan dipisahkan sepenuhnya. Developer menulis JSON, DonatJS yang merender HTML. Tidak ada template engine, tidak ada build step.',
                    '---',
                    '**Status**: [AKTIF] &mdash; dalam pengembangan aktif dan proses paten.',
                    'link:Lihat donatjs.id:https://donatjs.id'
                ]
            },
            rightCol: {
                subtitle: 'Kenapa Lahir?',
                lines: [
                    'BayamJS masih butuh developer menulis HTML. Di konteks pendidikan, konten berubah terus sementara struktur jarang berubah.',
                    'DonatJS menjawab: <em>bagaimana kalau konten cukup ditulis sebagai JSON, dan framework yang urus renderingnya?</em>',
                    '---',
                    '**Yang sedang dikembangkan:**',
                    '&bull; JSON&rarr;SVG pipeline (Paten Sederhana)',
                    '&bull; JSON&rarr;HTML pipeline (Paten Sederhana)',
                    '&bull; Modul POS, Presensi, Keuangan [BETA]',
                    '&bull; piawai.id sebagai produk LMS berbasis DonatJS'
                ]
            }
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'Next · ?',
                lines: [
                    '**Tipe**: Belum ditentukan',
                    '**Status**: [WIP]',
                    '---',
                    'Setiap framework lahir dari pertanyaan yang belum bisa dijawab oleh yang sebelumnya.',
                    'Pertanyaan aktif yang sedang dimasak di lab:',
                    '&bull; Bagaimana DonatJS bisa berjalan di edge (Cloudflare Workers)?',
                    '&bull; Apakah WebAssembly bisa menggantikan layer rendering?',
                    '&bull; Bagaimana schema JSON yang cukup ekspresif untuk multi-tenant?'
                ]
            },
            rightCol: {
                subtitle: 'Pola yang Konsisten',
                lines: [
                    'table:default'
                ],
                table: [
                    { 'Generasi': 'Ktupad', 'Masalah Lama': 'Tidak ada MVC sederhana', 'Solusi Baru': 'MVC PHP minimal' },
                    { 'Generasi': 'BayamJS', 'Masalah Lama': 'Butuh server PHP', 'Solusi Baru': 'Client-side JS murni' },
                    { 'Generasi': 'DonatJS', 'Masalah Lama': 'Masih tulis HTML', 'Solusi Baru': 'JSON-driven rendering' },
                    { 'Generasi': 'Next', 'Masalah Lama': '?', 'Solusi Baru': '?' }
                ]
            }
        }
    ],

    snippets: [
        {
            section: 'titleHero',
            title: 'Snippet & Dev Notes',
            description: 'Koleksi snippet dan catatan teknis dari hasil eksperimen di lab. Bukan tutorial yang dipoles — ini catatan jujur dari proses ngoprek, termasuk yang gagal dan kenapa.'
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'Kategori',
                lines: [
                    '&bull; <strong>Ktupad</strong> &mdash; routing, controller, view pattern',
                    '&bull; <strong>BayamJS</strong> &mdash; client-side MVC, module pattern',
                    '&bull; <strong>DonatJS</strong> &mdash; JSON schema, SVG pipeline, modul',
                    '&bull; <strong>Arsitektur</strong> &mdash; Microservices, API design',
                    '&bull; <strong>Infrastruktur</strong> &mdash; Cloudflare Workers, Pages',
                    '&bull; <strong>Riset</strong> &mdash; WebAssembly, edge computing'
                ]
            },
            rightCol: {
                subtitle: 'Catatan Penggunaan',
                lines: [
                    'Semua snippet di sini adalah hasil eksperimen aktif — bukan dokumentasi resmi.',
                    'Untuk versi stabil dan terdokumentasi:',
                    '&bull; Ktupad &rarr; lihat di GitHub',
                    '&bull; BayamJS &rarr; lihat di GitHub',
                    '&bull; DonatJS &rarr; donatjs.id',
                    '---',
                    'link:GitHub sismadi:https://github.com/sismadi'
                ]
            }
        }
    ],

    changelog: [
        {
            section: 'titleHero',
            title: 'Changelog',
            description: 'Rekam jejak iterasi ekosistem framework Sismadi. Setiap perubahan dicatat — termasuk keputusan untuk tidak melanjutkan sesuatu dan alasannya.'
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'DonatJS · Aktif',
                lines: [
                    '### v2.4 [STABLE]',
                    '&bull; Multi-color slot system (pipe-separated CSS vars)',
                    '&bull; Dynamic favicon via CSS tokens',
                    '&bull; HSL color variant (`--pLightColor` / `--pDarkColor`)',
                    '&bull; `router.link()` dengan external URL auto-detection',
                    '&bull; Button block onclick priority chain',
                    '&bull; POS module via virtual JSON pattern',
                    '---',
                    '### v2.2–2.3 [DEPRECATED]',
                    '&bull; Single-color slot &mdash; digantikan multi-color v2.4'
                ]
            },
            rightCol: {
                subtitle: 'Roadmap',
                lines: [
                    'table:default'
                ],
                table: [
                    { 'Target': 'DonatJS v2.5', 'Eksperimen': 'JSON→PDF pipeline', 'Status': '[WIP]' },
                    { 'Target': 'DonatJS v2.5', 'Eksperimen': 'Offline-first cache layer', 'Status': '[WIP]' },
                    { 'Target': 'DonatJS v3.0', 'Eksperimen': 'Edge rendering (CF Workers)', 'Status': '[RESEARCH]' },
                    { 'Target': 'DonatJS v3.0', 'Eksperimen': 'Multi-tenant JSON schema', 'Status': '[RESEARCH]' },
                    { 'Target': 'Next Framework', 'Eksperimen': 'WebAssembly layer', 'Status': '[RESEARCH]' }
                ]
            }
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'BayamJS · Stabil',
                lines: [
                    '### v1.x [STABLE]',
                    '&bull; Client-side MVC vanilla JS',
                    '&bull; Zero dependency',
                    '&bull; File-based routing',
                    '---',
                    '**Tidak aktif dikembangkan** &mdash; kebutuhan yang tidak bisa dipenuhi BayamJS dijawab oleh DonatJS.'
                ]
            },
            rightCol: {
                subtitle: 'Ktupad · Arsip',
                lines: [
                    '### v1.x [STABLE]',
                    '&bull; MVC PHP minimal',
                    '&bull; Zero dependency',
                    '&bull; Eksplisit, tanpa magic',
                    '---',
                    '**Tidak aktif dikembangkan** &mdash; diarsipkan sebagai referensi historis dan bahan ajar MVC dasar.'
                ]
            }
        }
    ]
};
