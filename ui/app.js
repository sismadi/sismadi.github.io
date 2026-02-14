var ui = {
    states: {},
    rawBlocks: [],
    cache: {}, // Tambahan: Media penyimpanan data JSON
quizData: {}, // Penyimpanan lokal khusus data kuis yang sudah diacak
cacheCert: null, // Untuk menyimpan data CSV agar tidak fetch berulang

    renderPage: async function(api, targetId = 'content') {
        const container = document.getElementById(targetId);
        if (!container) return;

        // 1. Cek apakah yang diminta sama dengan yang sedang tampil (hindari render ulang DOM)
        if (container.getAttribute('data-active-api') === api && container.innerHTML.trim() !== "") {
            return;
        }

        this.states = {};

        try {
            let responseData;

            // 2. Logika Cache: Cek jika data API sudah pernah dimuat
            if (this.cache[api]) {
                responseData = this.cache[api];
            } else {
                const res = await fetch(api);
                if (!res.ok) throw new Error(`Gagal memuat JSON: ${res.status}`);
                responseData = await res.json();

                // Simpan ke cache untuk penggunaan berikutnya
                this.cache[api] = responseData;
            }

            this.rawBlocks = responseData.data || [];

            // Tandai kontainer dengan API yang sedang aktif
            container.setAttribute('data-active-api', api);

            this.refresh(targetId);
        } catch (err) {
            container.innerHTML = `<div class="p-4 shadow">Error: ${err.message}</div>`;
        }
    },

    // --- renderSide & renderSide1 tetap sama ---
    renderSide: async function(api, targetId = 'tes') {
        const container = document.getElementById(targetId);
        try {
            const res = await fetch(api);
            if (!res.ok) throw new Error(`Gagal: ${res.status}`);
            const responseData = await res.json();
            const sideBlocks = responseData.data || [];
            if (container) {
                container.innerHTML = sideBlocks.map((block, index) => {
                    return this.engine(block, `side_${index}`);
                }).join('');
            }
        } catch (err) {
            if (container) container.innerHTML = `<div class="p-2 text-red">Error Side: ${err.message}</div>`;
        }
    },

    renderSide1: async function(api) {
        try {
            let responseData;
            // Cek cache dulu (untuk data virtual dari web.js)
            if (this.cache[api]) {
                responseData = this.cache[api];
            } else {
                const res = await fetch(api);
                if (!res.ok) throw new Error(`Gagal: ${res.status}`);
                responseData = await res.json();
            }

            const sideBlocks = responseData.data || [];
            return sideBlocks.map((block, index) => {
                return this.engine(block, `side_${index}`);
            }).join('');
        } catch (err) {
            console.error("Error Side:", err);
            return `<div class="p-2 text-red">Error Side: ${err.message}</div>`;
        }
    },

    initState: function(sectionId, block) {
        if (!this.states[sectionId]) {
            const state = { search: '', page: 1, pageSize: 5 };
            if (block.control === 'multi' && block.filter) {
                state.filters = {};
                block.filter.split(',').forEach(f => state.filters[f.trim()] = []);
            } else {
                state.filter = 'all';
            }
            this.states[sectionId] = state;
        }
        return this.states[sectionId];
    },

    refresh: function(targetId = 'content') {
        const container = document.getElementById(targetId);
        if (!container) return;
        container.innerHTML = this.rawBlocks.map((block, index) => {
            const sectionId = block.caption ? block.caption.replace(/\s+/g, '_') : `section_${index}`;
            return `<div id="${sectionId}" class="section-container mb-10">${this.engine(block, sectionId)}</div>`;
        }).join('');
    },

    engine: function(block, sectionId) {
        const s = block.section;
        const c = Array.isArray(block.content) ? block.content : [];
        const cap = block.caption ? `<h2>${block.caption.replace(/_/g, ' ')}</h2>` : '';
        const controlType = block.control;

        switch(s) {
            case 'header': return ui.renderHeader(block.content);
            case 'progress': return `<div class="row shadow">${cap} ${ui.renderProgress(c, d.color ? d.color(c.length) : [])}</div>`;
            case 'kursus': return ui.renderKursus(block);
            case 'cert': return ui.renderCert(block);
            case 'csv': return ui.renderCsv(block);
            case 'mp4': return ui.renderMp4(block); // Tambahkan case ini
            case 'pdf': return ui.renderPdf(block);
            case 'side': return ui.renderSideContent(block);
            case 'stats':
            case 'table':
                const state = ui.initState(sectionId, block);
                const filteredData = controlType ? ui.applyLogic(c, state, controlType) : c;
                const controls = controlType ? ui.renderControls(sectionId, state, block) : '';
                const totalItems = controlType ? ui.getFilteredLength(c, state, controlType) : c.length;
                const pagination = controlType ? ui.renderPagination(sectionId, totalItems, state) : '';

                if (s === 'stats') {
                    return `${controls}<div class="row card-container">${ui.renderStats(filteredData)}</div>${pagination}`;
                } else {
                    return `${controls}<div class="row shadow">${cap}${ui.renderTable(filteredData)}</div>${pagination}`;
                }
            default: return `<div class="row">Section unknown</div>`;
        }
    },

    renderSideContent: function(block) {
        const buttons = Array.isArray(block.btn) ? block.btn : [];
        // const cap = block.caption ? `<div class="side-title mb-2"><strong>${block.caption}</strong></div>` : '';

        const btnHtml = buttons.map(b => `
            <div class="row artikel">
                <button class="row" onclick="navigate('${b.url}')" > ${b.icon ? `<img data-src="${b.icon}">` : ''}
                    <span>${b.text}</span>
                </button>
            </div>`).join('');

            // return `<div class="side-section p-2">${cap} ${btnHtml}</div>`;
            return `<div class="side-section p-2"> ${btnHtml}</div>`;
    },

    renderCert: function(block) {
            // Gunakan json_url dari profile.json (Data Kuis/Sertifikat)
            // const jsonUrl = block.json_url || "data/lms/cert/sertifikat.json";
            const jsonUrl = block.json_url || "data/cert/sertifikat.json";
            const uniqueId = `cert-container-${Math.floor(Math.random() * 10000)}`;

            // Ambil kredensial dari router, jika tidak ada baru gunakan default dari JSON atau null
            const targetID = ui.activeCredential || block.default_id || "202509080101";

            setTimeout(async () => {
                const container = document.getElementById(uniqueId);
                if (!container) return;

                try {
                    // Fetch data JSON (Kuis/Sertifikat)
                    if (!this.cache[jsonUrl]) {
                        const res = await fetch(jsonUrl);
                        this.cache[jsonUrl] = await res.json();
                    }

                    this.quizData[uniqueId] = this.cache[jsonUrl].data || [];

                    container.innerHTML = `
                        <div class="cert-verifier text-center p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <h3 class="mb-4 font-bold text-xl">${block.caption || 'Verifikasi Sertifikat'}</h3>
                            <div class="flex gap-2 justify-center mb-6">
                                <input type="text" id="input-${uniqueId}" class="input" value="${targetID}" style="max-width:300px;">
                                <button class="button-primary" onclick="ui.verifyCert('${uniqueId}')">Verifikasi</button>
                            </div>
                            <div id="result-${uniqueId}" class="flex justify-center"></div>
                        </div>
                    `;

                    // Langsung jalankan jika ada ID yang dituju
                    if (targetID) {
                        this.verifyCert(uniqueId);
                        // Bersihkan agar tidak mempengaruhi navigasi manual berikutnya
                        ui.activeCredential = null;
                    }

                } catch (err) {
                    console.error("Cert Error:", err);
                }
            }, 200);

            return `<div id="${uniqueId}">Memuat sistem verifikasi...</div>`;
        },


        verifyCert: function(id) {
            const inputVal = document.getElementById(`input-${id}`).value.trim();
            const resultDiv = document.getElementById(`result-${id}`);
            const data = this.quizData[id] || [];

            // Cari data di CSV
            const found = data.find(item => item.kredensial === inputVal);

            // Jika tidak ditemukan, kita buat objek dummy agar template tetap terisi kredensialnya
            const displayData = found || {
                kredensial: inputVal,
                peserta: "Nama Tidak Ditemukan",
                kursus: "Program Tidak Terdaftar",
                tanggal: "-"
            };

            console.log(found ? "Cert Log: Data ditemukan." : "Cert Log: Data tidak ditemukan, merender template default.");
            resultDiv.innerHTML = `
                <div class="cert-display animate-fade-in" style="
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                    aspect-ratio: 1.41 / 1;
                    background: url('${config.cert}') no-repeat center center;
                    background-size: cover;
                    padding: 40px;
                    color: #333;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    border: 1px solid #eee;
                ">
                    <div style="font-size: 0.7rem; color: #666; letter-spacing: 2px; margin-bottom: 10px;">
                        ${found ? '✓ VERIFIED DIGITAL CERTIFICATE' : '✗ UNVERIFIED CREDENTIAL'}
                    </div>
                    <div style="font-size: 1.1rem; font-weight: bold; color: #1a365d; margin-bottom: 15px;">
                        ${displayData.kursus}
                    </div>
                    <div style="font-size: 0.8rem; margin-bottom: 5px;">Diberikan Kepada:</div>
                    <div style="font-size: 1.8rem; font-weight: 900; color: #2c3e50; margin-bottom: 15px; font-family: serif;">
                        ${displayData.peserta}
                    </div>
                    <div style="font-size: 0.8rem;">
                        Menyelesaikan pelatihan pada tanggal:<br>
                        <strong>${displayData.tanggal}</strong>
                    </div>
                    <div style="position: absolute; bottom: 20px; width: 100%; left: 0; font-size: 0.7rem; font-family: monospace; color: #777;">
                        ID: ${displayData.kredensial}
                    </div>
                </div>
            `;
        },

        renderCsv: function(block) { // Tetap gunakan nama renderCsv agar tidak merubah profile.json
                const jsonUrl = block.json_url || block.url;
                const uniqueId = `quiz-${Math.floor(Math.random() * 10000)}`;

                setTimeout(async () => {
                    const container = document.getElementById(uniqueId);
                    if (!container) return;

                    try {
                        // Gunakan cache standar ui.cache
                        if (!this.cache[jsonUrl]) {
                            const res = await fetch(jsonUrl);
                            this.cache[jsonUrl] = await res.json();
                        }

                        const quizData = this.cache[jsonUrl].data || [];
                        console.log("Quiz Log: Load JSON success", quizData.length, "questions.");

                        // Simpan ke quizData lokal untuk logika penilaian
                        this.quizData[uniqueId] = quizData;

                        container.innerHTML = `
                            <div class="quiz-container p-6 bg-white rounded-lg shadow">
                                <h2 class="text-xl font-bold mb-6">${block.caption || 'Kuis Interaktif'}</h2>
                                <div id="questions-${uniqueId}">
                                    ${quizData.map((q, index) => `
                                        <div class="question-block mb-8 p-4 border-l-4 border-blue-500 bg-gray-50">
                                            <p class="font-semibold mb-3">${index + 1}. ${q.question}</p>
                                            <div class="options flex flex-col gap-2">
                                                ${['a', 'b', 'c', 'd'].map(opt => `
                                                    <label class="flex items-center gap-2 p-2 hover:bg-blue-100 rounded cursor-pointer transition">
                                                        <input type="radio" name="q${index}_${uniqueId}" value="${q['choice_'+opt]}">
                                                        <span>${q['choice_'+opt]}</span>
                                                    </label>
                                                `).join('')}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                <button class="button-primary w-full mt-4" onclick="ui.submitQuiz('${uniqueId}')">Kirim Jawaban</button>
                                <div id="score-${uniqueId}" class="mt-6"></div>
                            </div>
                        `;
                    } catch (err) {
                        console.error("Quiz Log Error:", err);
                        container.innerHTML = `<div class="p-4 text-red">Gagal memuat kuis.</div>`;
                    }
                }, 200);

                return `<div id="${uniqueId}">Memuat kuis...</div>`;
            },

            submitQuiz: function(id) {
                const questions = this.quizData[id];
                let score = 0;

                questions.forEach((q, index) => {
                    const selected = document.querySelector(`input[name="q${index}_${id}"]:checked`);
                    if (selected && selected.value === q.answer) {
                        score++;
                    }
                });

                const finalScore = Math.round((score / questions.length) * 100);
                const resultDiv = document.getElementById(`score-${id}`);

                resultDiv.innerHTML = `
                    <div class="p-4 bg-blue-900 text-white rounded-lg text-center animate-fade-in">
                        <p class="text-sm uppercase tracking-widest">Skor Akhir Anda</p>
                        <h1 class="text-5xl font-black my-2">${finalScore}</h1>
                        <p>${score} dari ${questions.length} Benar</p>
                    </div>
                `;

                console.log(`Quiz Log: User submitted score ${finalScore}%`);
            },


        displayQuiz: function(id, title) {
            const questions = this.quizData[id];
            const container = document.getElementById(id);

            let html = `<h2 class="mb-6 border-b pb-2">${title || 'Kuis Interaktif'}</h2>`;

            questions.forEach((q, index) => {
                html += `
                <div class="quiz-item mb-8 p-4 border rounded" data-q-index="${index}">
                    <p class="font-bold mb-3">${index + 1}. ${q.question}</p>
                    <div class="options grid gap-2">
                        ${['choice_a', 'choice_b', 'choice_c', 'choice_d'].map((key, i) => `
                            <label class="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer rounded border">
                                <input type="radio" name="q_${id}_${index}" value="${q[key]}">
                                <span>${q[key]}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>`;
            });

            html += `<button class="button-primary w-full p-4 mt-4" onclick="ui.checkQuiz('${id}')">Kirim Jawaban & Lihat Nilai</button>`;
            container.innerHTML = html;
        },

        checkQuiz: function(id) {
            const questions = this.quizData[id];
            const container = document.getElementById(id);
            let score = 0;

            questions.forEach((q, index) => {
                const selected = container.querySelector(`input[name="q_${id}_${index}"]:checked`);
                const quizItem = container.querySelector(`[data-q-index="${index}"]`);
                const val = selected ? selected.value : null;

                // Logika Review Jawaban
                if (val === q.answer || (q.answer === "1" && val === q.choice_a) || (q.answer === "2" && val === q.choice_b) || (q.answer === "3" && val === q.choice_c) || (q.answer === "4" && val === q.choice_d)) {
                    score++;
                    quizItem.classList.add('bg-green-50', 'border-green-500');
                    quizItem.innerHTML += `<div class="text-green-600 font-bold mt-2">✓ Benar</div>`;
                } else {
                    quizItem.classList.add('bg-red-50', 'border-red-500');
                    quizItem.innerHTML += `<div class="text-red-600 font-bold mt-2">✗ Salah. Jawaban benar: ${q.answer}</div>`;
                }
            });

            const finalScore = Math.round((score / questions.length) * 100);

            // Tampilkan Hasil Nilai di bagian atas
            const resultHeader = `
                <div class="result-box text-center p-6 mb-6 bg-blue-600 text-white rounded-lg">
                    <div class="text-xl">Skor Anda:</div>
                    <div class="text-6xl font-black">${finalScore}</div>
                    <p class="mt-2 text-sm">${score} dari ${questions.length} soal benar</p>
                    <button class="mt-4 bg-white text-blue-600 px-4 py-2 rounded" onclick="location.reload()">Ulangi Kuis</button>
                </div>
            `;
            container.insertAdjacentHTML('afterbegin', resultHeader);
            window.scrollTo({ top: container.offsetTop - 20, behavior: 'smooth' });
        },


    renderMp4: function(block) {
            const videoUrl = block.url || '';
            const uniqueId = `video-player-${Math.floor(Math.random() * 10000)}`;
            const buttons = Array.isArray(block.btn) ? block.btn : [];

            const btnHtml = buttons.map(b => `
                <button class="mr-2" onclick="${b.url ? `navigate('${b.url}')` : ''} ${b.modal ? `path('${b.modal}')` : ''}">
                    ${b.icon ? `<img data-src="${b.icon}"> ` : ''}${b.text}
                </button>`).join('');

            // Logika inisialisasi video setelah elemen terpasang di DOM
            setTimeout(() => {
                const videoElement = document.getElementById(uniqueId);
                if (videoElement) {
                    // Anda bisa menambahkan logic library pihak ketiga di sini (misal: Plyr.setup)
                    // Untuk saat ini kita pastikan video termuat dengan benar
                    console.log(`Video ${uniqueId} siap diputar.`);
                }
            }, 200);

            return `
                <div class="video-wrapper">
                    <div class="video-container" style="position: relative; width: 100%; padding-top: 56.25%; background: #000; border-radius: 8px; overflow: hidden;">
                        <video
                            id="${uniqueId}"
                            controls
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                            poster="${block.poster || ''}">
                            <source src="${videoUrl}" type="video/mp4">
                            Browser Anda tidak mendukung tag video.
                        </video>
                    </div>
                </div>
                <div class="gButton mt-4">${btnHtml}</div>`;
        },

    renderPdf: function(block) {
          const pdfUrl = block.pdfurl || '';
          // Membuat ID unik agar tidak terjadi konflik jika ada lebih dari satu PDF
          const uniqueId = `pdf-viewer-${Math.floor(Math.random() * 10000)}`;
          const buttons = Array.isArray(block.btn) ? block.btn : [];

          const btnHtml = buttons.map(b => `
              <button class="mr-2" onclick="${b.url ? `navigate('${b.url}')` : ''} ${b.modal ? `path('${b.modal}')` : ''}">
                  ${b.icon ? `<img data-src="${b.icon}"> ` : ''}${b.text}
              </button>`).join('');

          // Logic Integrasi EmbedPDF
          // Menggunakan setTimeout agar library mencari elemen setelah HTML di-inject ke DOM
          setTimeout(() => {
              const targetElement = document.getElementById(uniqueId);
              if (targetElement && typeof window.EmbedPDF !== 'undefined') {
                  window.EmbedPDF.init({
                      type: 'container',
                      target: targetElement,
                      src: pdfUrl,
                      theme: { preference: 'system' }
                  });
              } else if (!window.EmbedPDF) {
                  console.error("EmbedPDF library belum dimuat.");
              }
          }, 200); // Delay sedikit lebih lama untuk memastikan sinkronisasi DOM stabil

          return `
              <div class="pdf-wrapper">
                  <div id="${uniqueId}" style="width: 100%; height: 600px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                      <p class="p-4">Memuat viewer PDF...</p>
                  </div>
              </div>
              <div class="gButton mt-4">${btnHtml}</div>`;
      },

    // Logic filter, table, stats, progress tetap konsisten dengan kode asli...
    applyLogic: function(data, state, type) {
        return data.filter(item => {
            const haystack = JSON.stringify(item).toLowerCase();
            const matchSearch = haystack.includes(state.search.toLowerCase());
            let matchFilter = true;
            if (type === 'multi' && state.filters) {
                matchFilter = Object.keys(state.filters).every(key => {
                    const selectedValues = state.filters[key];
                    return selectedValues.length === 0 || selectedValues.includes(String(item[key]));
                });
            } else if (type === true || type === 'single') {
                matchFilter = state.filter === 'all' || item.category === state.filter;
            }
            return matchSearch && matchFilter;
        }).slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
    },

    getFilteredLength: function(data, state, type) {
        return data.filter(item => {
            const haystack = JSON.stringify(item).toLowerCase();
            const matchSearch = haystack.includes(state.search.toLowerCase());
            let matchFilter = true;
            if (type === 'multi' && state.filters) {
                matchFilter = Object.keys(state.filters).every(key => {
                    const selectedValues = state.filters[key];
                    return selectedValues.length === 0 || selectedValues.includes(String(item[key]));
                });
            } else if (type === true || type === 'single') {
                matchFilter = state.filter === 'all' || item.category === state.filter;
            }
            return matchSearch && matchFilter;
        }).length;
    },

    renderControls: function(id, state, block) {
        const type = block.control;
        let filterContent = '';
        if (type === 'multi' && block.filter) {
            const keys = block.filter.split(',');
            filterContent = `<div class="row shadow p-4 mb-4" style="display:flex; flex-wrap:wrap; gap:20px;">`;
            keys.forEach(key => {
                const k = key.trim();
                const options = [...new Set(block.content.map(item => item[k]).filter(Boolean))];
                filterContent += `
                <div style="flex:1; min-width:150px;">
                    <strong style="display:block; border-bottom:1px solid #ddd; margin-bottom:10px; text-transform:capitalize;">${k}:</strong>
                    ${options.map(opt => `
                        <label style="display:flex; align-items:center; gap:8px; margin-bottom:5px; cursor:pointer; font-size:14px;">
                            <input type="checkbox" ${state.filters[k].includes(String(opt)) ? 'checked' : ''} onchange="ui.toggleMulti('${id}', '${k}', '${opt}')">
                            ${opt}
                        </label>
                    `).join('')}
                </div>`;
            });
            filterContent += `</div>`;
        } else if (type === true || type === 'single') {
            const cats = [...new Set(block.content.map(i => i.category).filter(Boolean))];
            filterContent = `
            <select class="input" style="width:auto;" onchange="ui.updateState('${id}', 'filter', this.value)">
                <option value="all">Semua Kategori</option>
                ${cats.map(c => `<option value="${c}" ${state.filter === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>`;
        }
        return `
        <div class="form mb-4">
            <input type="text" class="input" placeholder="Cari data..." value="${state.search}" oninput="ui.updateState('${id}', 'search', this.value, event)">
            ${filterContent}
            <select class="input" style="width:auto;" onchange="ui.updateState('${id}', 'pageSize', this.value)">
                ${[5, 10, 25, 50].map(n => `<option value="${n}" ${state.pageSize == n ? 'selected' : ''}>${n} Baris</option>`).join('')}
            </select>
        </div>`;
    },

    toggleMulti: function(id, key, val) {
        const state = this.states[id];
        const idx = state.filters[key].indexOf(String(val));
        if (idx > -1) state.filters[key].splice(idx, 1);
        else state.filters[key].push(String(val));
        this.updateState(id, 'page', 1);
    },

    updateState: function(id, key, val, event) {
        this.states[id][key] = val;
        if (key !== 'page') this.states[id].page = 1;
        const block = this.rawBlocks.find(b => (b.caption || '').replace(/\s+/g, '_') === id || `section_${this.rawBlocks.indexOf(b)}` === id);
        const el = document.getElementById(id);
        if (el && block) {
            el.innerHTML = this.engine(block, id);
            if (event && event.type === 'input') {
                const input = el.querySelector('input[type="text"]');
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }
        }
    },

    renderPagination: function(id, total, state) {
        const totalPages = Math.ceil(total / state.pageSize);
        if (totalPages <= 1) return '';
        return `
        <div class="gPaging mt-4 shadow" style="display:flex; justify-content:space-between; align-items:center;">
            <div style="padding:10px;">Total <b>${total}</b> data</div>
            <div style="padding:10px; display:flex; gap:5px;">
                <button class="button" onclick="ui.updateState('${id}', 'page', ${state.page - 1})" ${state.page === 1 ? 'disabled' : ''}>Prev</button>
                <span class="shadow" style="padding:8px 15px;">Hal ${state.page} / ${totalPages}</span>
                <button class="button" onclick="ui.updateState('${id}', 'page', ${state.page + 1})" ${state.page === totalPages ? 'disabled' : ''}>Next</button>
            </div>
        </div>`;
    },

    renderHeader: function(user) {
        const ctas = user.cta || user.media || [];
        return `
${user.icon1 ? `<div class="parallax-layer icon-wa"><img data-src="${user.icon1}"></div>` : ''}

${user.icon2 ? `<div class="parallax-layer icon-fb"><img data-src="${user.icon2}"></div>` : ''}

${user.icon3 ? `<div class="parallax-layer icon-tw"><img data-src="${user.icon3}"></div>` : ''}




        <div class="row shadow">
            <div class="col-1-4">
            ${user.avatar ? `<div class="user-avatar"><img id="avatar" class="img" style="max-width:150px;" src="${user.avatar}" alt="${user.name || user.nama}" ></div>` : `<img class="img" style="max-width:150px;" data-src="${user.avatar || user.icon}">`}
            </div>
            <div class="col-3-4">
                <div class="artikel">
                    <h1>${user.name || user.nama}</h1>
                    <p><strong>${user.role || user.tagline}</strong></p>
                    <p>${user.bio || user.deskripsi}</p>
                </div>
                ${user.cta ? `<div class="artikel mt-4">
                    ${ctas.map(item => `<button class="mr-2"> <img data-src="${item.icon}" style="width:16px"> ${item.text}</button> `).join('')}
                </div>` : ''}
            </div>
        </div>`;
    },

    renderStats: function(items) {
        if (!Array.isArray(items) || items.length === 0) return '';
        let step = Math.min(Math.max(items.length, 1), 4);
        return items.map(item => `
        <div class="col-1-${step}">
            <div class="card shadow" onclick="${item.url ? `navigate('${item.url}')` : ''} ${item.modal ? `path('${item.modal}')` : ''}">
                ${item.icon ? `<img data-src="${item.icon}" >` : ''}
                ${item.img ? `<img class="img" src="${item.img}" alt="${item.nama || item.img}" >`:'' }
                <strong>${item.nama || item.title || item.name}</strong>
                <span>${item.kategori? item.kategori : ''}</span>

                <div class="artikel">${item.isi || item.desc || ''}</div>
            </div>
        </div>`).join('');
    },

    renderTable: function(data) {
        if (!data || data.length === 0) return "<p>Data tidak tersedia.</p>";
        const headers = Object.keys(data[0]);
        return `
        <table class="table w-full text-left">
            <thead><tr>${headers.map(h => `<th class="p-2 border-b">${h.toUpperCase()}</th>`).join('')}</tr></thead>
            <tbody>${data.map(row => `<tr>${headers.map(h => `<td class="p-2 border-b">${row[h]}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>`;
    },

    renderProgress: function(progressData, colors = []) {
        return progressData.map((p, i) => `
        <div class="mb-4">
            <p><span>${p.label}</span> <span>${p.value || p.percent + '%'}</span></p>
            <div class="progress-bar">
                <div style="background:${colors[i] || '#3498db'}; width:${p.percent}%; height:100%"></div>
            </div>
        </div>`).join('');
    },

    renderKursus: function(block) {
            const jsonUrl = block.url;
            const uniqueId = `kursus-${Math.floor(Math.random() * 10000)}`;
            const kursusName = block.caption || "Kursus";

            setTimeout(async () => {
                const container = document.getElementById(uniqueId);
                if (!container) return;

                try {
                    // Fetch data modul (misal: pbo-modul.json)
                    if (!this.cache[jsonUrl]) {
                        const res = await fetch(jsonUrl);
                        this.cache[jsonUrl] = await res.json();
                    }

                    const response = this.cache[jsonUrl];
                    const modules = response.data || [];
                    let step = Math.min(Math.max(modules.length, 1), 4);

                    container.innerHTML = `
                        <div class="row shadow">
                            <div class="row">
                                <h2 class="row">${response.nama || kursusName}</h2>
                                <span class="row">${modules.length} Modul</span>
                            </div>

                            <div class="row">
                                ${modules.map(m => `

                                  <div class="col-1-${step}">
                                      <div class="card shadow" onclick="${m.id ? `navigate('page/modul/${block.caption.toLowerCase()}-${m.id}')` : ''}">
                                          ${m.icon ? `<img data-src="${m.icon}" >` : ''}
                                          ${m.img ? `<img class="img" src="${m.img}" alt="${m.nama || m.img}" >`:'' }
                                          <strong>${m.nama || m.title || m.name}</strong>
                                          <div class="artikel">${m.isi || m.desc || ''}</div>
                                      </div>
                                  </div>


                                `).join('')}
                            </div>
                        </div>
                        `;
                } catch (err) {
                    container.innerHTML = `<div class="p-4 text-red">Gagal memuat modul kursus.</div>`;
                }
            }, 200);

            return `<div id="${uniqueId}" class="animate-fade-in text-center p-10">Memuat Kurikulum...</div>`;
        },

};
