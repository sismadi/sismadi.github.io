(function() {
    let cachedData = {};
    let isFetching = false;

    // Fungsi ini sekarang hanya digunakan sebagai pengaman (fallback)
    const getCSSVarValue = (varName) => {
        if (!varName) return '#0C5175';
        if (varName.includes('var(')) {
            const match = varName.match(/\(([^)]+)\)/);
            if (match && match[1]) {
                const cleanVarName = match[1].trim();
                const value = getComputedStyle(document.body).getPropertyValue(cleanVarName).trim();
                return value || (cleanVarName === '--pColor' ? '#0C5175' : '#47B4ED');
            }
        }
        return varName;
    };

    const generateSVGElement = (id, config, size = "24x24", colorParam = "", opacityParam = "", animation = null) => {
        let svgContent = '';
        let viewBox = config.viewBox || "0 0 24 24";
        const gradId = `g-${id}-${Math.random().toString(36).substr(2, 4)}`;

        // Variabel default menggunakan string var() agar reaktif
        const defaultColor = 'var(--pColor)';
        const defaultColorEnd = 'var(--pLightColor)';
        const activeColor = colorParam || defaultColor;

        // Pecah warna berdasarkan '-' yang memisahkan dua variabel CSS atau HEX
        const parts = activeColor.split(/-(?=var|#)/);
        const isGradient = parts.length >= 2;

        let fillValue;
        let defs = "";

        if (isGradient) {
            fillValue = `url('#${gradId}')`;
            const c1 = parts[0].trim();
            const c2 = parts[1].trim();

            // Perubahan Utama: Gunakan variabel CSS langsung di stop-color
            // Ini membuat gradien ikut berubah saat tema berubah di browser modern
            defs = `<defs><linearGradient id="${gradId}" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stop-color="${c1}"/>
                <stop offset="100%" stop-color="${c2}"/>
            </linearGradient></defs>`;
        } else {
            // Solid reaktif
            fillValue = activeColor;
        }

        const [width, height] = String(size).includes('x') ? size.split('x') : [size, size];

        if (typeof config === 'string') {
            svgContent = `<path class="svg-p layer-main" d="${config}" fill="${fillValue}" opacity="${opacityParam || "1"}" />`;
        } else if (config.layers) {
            const layers = Array.isArray(config.layers) ? config.layers : Object.values(config.layers);
            layers.forEach((l, index) => {
                const d = l.ref ? (typeof cachedData[l.ref] === 'string' ? cachedData[l.ref] : null) : l.path;
                const tr = `translate(${l.pos || '0 0'}) scale(${l.scale || 1})`;
                const isMain = l.main === true || (index === 0 && !config.layers.some(lay => lay.main));
                const layerClass = isMain ? 'svg-p layer-main' : 'svg-p';
                const finalFill = isMain ? fillValue : (l.fill || "#ccc");
                const finalOpacity = (isMain && opacityParam) ? opacityParam : (l.opacity || "1");

                if (d) {
                    svgContent += `<g transform="${tr}" opacity="${finalOpacity}"><path class="${layerClass}" d="${d}" fill="${finalFill}" /></g>`;
                }
            });
        }

        const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" class="di-svg">${defs}<g class="${animation || ''}">${svgContent}</g></svg>`;

        return new DOMParser().parseFromString(svgStr, 'image/svg+xml').documentElement;
    };

    // Fungsi pendukung lainnya (processImage, loadSVGLibraries, refreshIcons, init)
    const processImage = (img) => {
        if (!img || img.getAttribute('data-loaded')) return;
        const raw = img.getAttribute('data-src');
        if (!raw) return;

        const parts = raw.split('/');
        const id = parts[0];
        const szRaw = parts[1] || "24x24";
        const col = parts[2] || "";
        const opa = parts[3] || "";
        const anim = parts[4] || "";

        if (cachedData[id]) {
            const svg = generateSVGElement(id, cachedData[id], szRaw, col, opa, anim);
            if (img.id) svg.id = img.id;
            svg.setAttribute('class', (img.className ? img.className + ' ' : '') + `di-svg loaded svg-${id}`);
            img.setAttribute('data-loaded', 'true');
            img.replaceWith(svg);
        }
    };

    window.loadSVGLibraries = async (urls) => {
        isFetching = true;
        for (const url of urls) {
            try {
                const res = await fetch(url);
                const data = await res.json();
                Object.keys(data).forEach(key => {
                    if (typeof data[key] === 'object' && key !== 'versi') {
                        Object.assign(cachedData, data[key]);
                    }
                });
            } catch (e) { console.error("Gagal memuat:", url); }
        }
        isFetching = false;
        refreshIcons();
    };

    const refreshIcons = () => {
        document.querySelectorAll('img[data-src]:not([data-loaded])').forEach(img => processImage(img));
    };

    const init = () => {
        refreshIcons();
        const observer = new MutationObserver(() => refreshIcons());
        observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
