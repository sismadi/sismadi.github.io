log=console.log.bind(window.console);
log('donat');


const tabsData = [
    "Setting","Params","Pesan"
];

// const tabsBar = document.getElementById("tabsBar");
// const moreBtn = document.getElementById("moreBtn");
// const moreMenu = document.getElementById("moreMenu");
// const contentBox = document.getElementById("contentBox");

let visibleTabs = [];
let hiddenTabs = [];

function renderTabs() {
    tabsBar.innerHTML = "";
    moreMenu.innerHTML = "";
    visibleTabs.forEach((tab, i) => {
        const li = document.createElement("li");
        li.textContent = tab;
        li.onclick = () => activateTab(tab);
        if (tab === activeTab) li.classList.add("active");
        tabsBar.appendChild(li);
    });

    hiddenTabs.forEach(tab => {
        const item = document.createElement("div");
        item.textContent = tab;
        item.onclick = () => activateTab(tab);
        moreMenu.appendChild(item);
    });

    moreBtn.style.display = hiddenTabs.length > 0 ? "block" : "none";
}

let activeTab = tabsData[0];

function activateTab(tab) {
    activeTab = tab;
    renderTabs();
    // contentBox.innerHTML = "<h3>" + tab + "</h3>Content of " + tab;
    let nah = tab.toLowerCase();
    d.url(nah);

    moreMenu.style.display = "none";
}

function updateResponsiveTabs() {
     visibleTabs = [...tabsData];
    hiddenTabs = [];
    renderTabs();

    const maxWidth = document.querySelector(".tabs-wrapper").clientWidth - 60;
    let totalWidth = 0;

    const items = Array.from(tabsBar.children);

    for (let i = 0; i < items.length; i++) {
        totalWidth += items[i].offsetWidth;
        if (totalWidth > maxWidth) {
            hiddenTabs = visibleTabs.splice(i);
            break;
        }
    }

    renderTabs();
}



function getUrlParam(name) {
const params = new URLSearchParams(window.location.search);
return params.has(name) ? params.get(name) : null;
}


const u = getUrlParam("u");
if (u) { console.log("Ada parameter u:", u);}
else { console.log("Tidak ada parameter u");}


function toggleMenu(buttonElement) {
    // Cari elemen menu terdekat (yang merupakan sibling dari button)
    const menu = buttonElement.nextElementSibling;

    // Periksa apakah menu ini sudah terlihat
    const isVisible = menu.classList.contains('active');

    // Tutup semua menu yang sedang terbuka terlebih dahulu (UX terbaik)
    document.querySelectorAll('.kebab-menu.active').forEach(openMenu => {
        openMenu.classList.remove('active');
    });

    // Jika menu belum terlihat, tampilkan.
    if (!isVisible) {
        menu.classList.add('active');
    }
}

// Tambahkan event listener untuk menutup menu jika mengklik di luar
document.addEventListener('click', function(event) {
    const isKebab = event.target.closest('.kebab-container');

    // Jika klik tidak berada di dalam area kebab, tutup semua menu
    if (!isKebab) {
        document.querySelectorAll('.kebab-menu.active').forEach(openMenu => {
            openMenu.classList.remove('active');
        });
    }
});
