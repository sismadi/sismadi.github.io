var web = {
cache: {},
controller: {
page: function(id) { ui.renderPage(config.getdata(id)); },

layout: function(id) {

  out=`
     <button onclick="switchStyleSheet('/al/templates/style-catalog.css');" > <img data-src="code/20"> catalog</button>
     <button onclick="switchStyleSheet('/al/templates/style-web.css');" > <img data-src="code/20"> web</button>
     <button onclick="switchStyleSheet('/al/templates/style-blog.css');" > <img data-src="code/20"> blog</button>
     <button onclick="switchStyleSheet('/al/templates/style-admin.css');" > <img data-src="code/20"> admin</button>
     <hr>
     <button onclick="switchStyle('dark-forest');" > <img data-src="code/20"> color1</button>
     <button onclick="switchStyle('green-forest');" > <img data-src="code/20"> color1</button>
     <button onclick="switchStyle('blue-forest');" > <img data-src="code/20"> color1</button>
     <button onclick="switchStyle('pastel-forest');" > <img data-src="code/20"> color1</button>
     `;
  d.sidePanel('Layout',out);

  // Tambahkan ini di controller switchStyle kamu
  switchStyle= function(themeType) {
      const root = document.documentElement;

      if (themeType === 'dark-forest') {
          root.style.setProperty('--pColor', '#840032');
          root.style.setProperty('--pLightColor', '#e59500');
          root.style.setProperty('--pDarkColor', '#002642');
      }

      if (themeType === 'green-forest') {
          root.style.setProperty('--pColor', '#6a994e');
          root.style.setProperty('--pLightColor', '#a7c957');
          root.style.setProperty('--pDarkColor', '#386641');
      }
      if (themeType === 'blue-forest') {
          root.style.setProperty('--pColor', '#1f7a8c');
          root.style.setProperty('--pLightColor', '#bfdbf7');
          root.style.setProperty('--pDarkColor', '#022b3a');
      }
      if (themeType === 'pastel-forest') {
          root.style.setProperty('--pColor', '#ffba08');
          root.style.setProperty('--pLightColor', '#e4572e');
          root.style.setProperty('--pDarkColor', '#d00000');
      }








      // PAKSA RE-RENDER (Opsional jika browser lambat merespon)
      // Kadang mengganti class di body membantu memicu sinkronisasi CSS
      document.body.classList.add('theme-updating');
      setTimeout(() => document.body.classList.remove('theme-updating'), 10);
  };


},

color: function(id) {




}



}
};
