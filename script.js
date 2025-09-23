// ==============================================
// グローバル変数
// ==============================================
let websiteInitialized = false;
const app = {};
let currentTheme = 'cool';
let isMusicSectionActive = false;
let contents = [];
let lastChapterIndexVal = -1;
let musicPlayerInitialized = false;
let persistentPlayerDismissed = false;

const PLAYLIST_ALBUM_ART = {
    cool: {
        main: 'assets/playlists/cool.jpg',
        persistent: 'assets/playlists/cool.jpg'
    },
    cute: {
        main: 'assets/playlists/cute.jpg',
        persistent: 'assets/playlists/cute.jpg'
    }
};

const coolPlaylist = [
    { title: 'BlueMoon', artist: 'ChainFlow', file: 'works-cool/BlueMoon.mp3', cover: PLAYLIST_ALBUM_ART.cool.main },
    { title: 'ChainFlow', artist: 'ChainFlow', file: 'works-cool/ChainFlow.mp3', cover: PLAYLIST_ALBUM_ART.cool.main },
    { title: 'Fragments of…', artist: 'ChainFlow', file: 'works-cool/Fragments of….mp3', cover: PLAYLIST_ALBUM_ART.cool.main },
    { title: 'Inspect Before …', artist: 'ChainFlow', file: 'works-cool/Inspect Before … .mp3', cover: PLAYLIST_ALBUM_ART.cool.main },
    { title: 'Lilith’s Shadow', artist: 'ChainFlow', file: 'works-cool/Lilith’s Shadow .mp3', cover: PLAYLIST_ALBUM_ART.cool.main },
    { title: 'still', artist: 'ChainFlow', file: 'works-cool/still.mp3', cover: PLAYLIST_ALBUM_ART.cool.main },
    { title: 'Sync Now', artist: 'ChainFlow', file: 'works-cool/Sync Now.mp3', cover: PLAYLIST_ALBUM_ART.cool.main },
    { title: 'what if', artist: 'ChainFlow', file: 'works-cool/what if.mp3', cover: PLAYLIST_ALBUM_ART.cool.main }
];

const cutePlaylist = [
    { title: 'alt account', artist: 'ChainFlow', file: 'works-cute/alt account .mp3', cover: PLAYLIST_ALBUM_ART.cute.main },
    { title: 'Bittersweet Times', artist: 'ChainFlow', file: 'works-cute/Bittersweet Times.mp3', cover: PLAYLIST_ALBUM_ART.cute.main },
    { title: 'BUGしてる', artist: 'ChainFlow', file: 'works-cute/BUGしてる.mp3', cover: PLAYLIST_ALBUM_ART.cute.main },
    { title: 'Rhythm Eclipse', artist: 'ChainFlow', file: 'works-cute/Rhythm Eclipse.mp3', cover: PLAYLIST_ALBUM_ART.cute.main },
    { title: 'Show me', artist: 'ChainFlow', file: 'works-cute/Show me.mp3', cover: PLAYLIST_ALBUM_ART.cute.main },
    { title: 'ピエタの残響', artist: 'ChainFlow', file: 'works-cute/ピエタの残響.mp3', cover: PLAYLIST_ALBUM_ART.cute.main }
];


function getThemeAlbumArt(themeName = currentTheme) {
    const key = themeName && PLAYLIST_ALBUM_ART[themeName] ? themeName : 'cool';
    return PLAYLIST_ALBUM_ART[key];
}


const coolAbout = [
    `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">ChainFlow——<br>DAO発のキャラクタープロジェクト「クリプトニンジャ」から誕生し、<br>プロデューサー namakel の手で磨き上げられた、<br>AI時代のバーチャルミュージシャン。</p>`,
    `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">ビートで鼓動を打つDJ : コンガ、<br>艶やかな息遣いで夜を染めるVocal : 蛇ノ目、<br>深みと余韻を刻むRap : 岩爺——<br>三つの音が交わる瞬間、<br>都市は揺れ、光が解き放たれる。</p>`,
    `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">変幻する歌声、AIが紡ぐアレンジとメロディ。<br>その重なりが描く未来を、あなたも目撃してほしい。</p>`
];
const cuteAbout = [
    `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">ChainFlow——<br>「クリプトニンジャ」プロジェクトを起点とし、<br>プロデューサーnamakelと共に<br>世界へドキドキを届けるAIミュージックユニット</p>`,
    `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">DJ・コンガが刻む、わくわくさせるビート。<br>Vocal・蛇ノ目が放つ、キラキラと夢色の歌声。<br>Rap・岩爺が紡ぐ、心に寄り添うリリック。<br>三つの音が重なる瞬間、世界はよりカラフルに色づいていく。</p>`,
    `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">AIの魔法によって、万華鏡のように変化する歌声とメロディ。<br>幕を開けたばかりの未来を、共に楽しもう。</p>`
];

const coolMedia = {
    artist: 'chainflow/artist1.jpg',
    media: [
        'chainflow/media1.jpg',
        'chainflow/media2.jpg',
        'chainflow/media3.jpg',
        'chainflow/media4.jpg',
        'chainflow/media5.jpg'
    ]
};

const cuteMedia = {
    artist: 'chainflow/artist2.jpg',
    media: [
        'chainflow/media6.jpg',
        'chainflow/media7.jpg',
        'chainflow/media8.jpg',
        'chainflow/media9.jpg',
        'chainflow/media10.jpg'
    ]
};

const externalLinks = [
    {
        label: 'SUNO',
        url: 'https://suno.com/@namakel',
        embedUrl: 'https://suno.com/embed/@namakel',
        svg: `<svg viewBox="0 0 24 24" aria-hidden="true" width="42" height="42" fill="currentColor"><text x="12" y="18" text-anchor="middle" font-size="18" font-family="'Noto Sans JP', 'Poppins', sans-serif">♪</text></svg>`
    },
    {
        label: 'SPOTIFY',
        url: 'https://open.spotify.com/artist/YOUR-SPOTIFY-ID',
        embedUrl: 'https://open.spotify.com/embed/artist/YOUR-SPOTIFY-ID',
        svg: `<svg viewBox="0 0 64 64" aria-hidden="true" width="42" height="42" fill="currentColor"><path d="M32 6C17.088 6 5 18.088 5 33s12.088 27 27 27 27-12.088 27-27S46.912 6 32 6Zm12.452 32.784a2.5 2.5 0 0 1-3.43.812c-9.184-5.632-20.728-2.416-21.224-2.264a2.5 2.5 0 0 1-1.454-4.784c.53-.16 13.118-3.984 24.556 2.872a2.5 2.5 0 0 1 .552 3.364Zm2.248-7.36a2.8 2.8 0 0 1-3.828.908c-10.52-6.368-24.68-3.768-25.24-3.624a2.8 2.8 0 1 1-1.4-5.416c.64-.168 16.004-3.984 28.772 4.2a2.8 2.8 0 0 1 1.696 3.932Zm.36-7.456c-12.144-7.208-27.372-4.272-28.02-4.112a2.5 2.5 0 1 1-1.148-4.872c.68-.16 17.064-3.648 30.968 4.984a2.5 2.5 0 0 1-2.8 4Z"/></svg>`
    },
    {
        label: 'APPLE MUSIC',
        url: '#',
        embedUrl: '',
        svg: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" width="42" height="42"><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/></svg>`
    },
    {
        label: 'YOUTUBE',
        url: 'https://www.youtube.com/@dj-konga',
        embedUrl: '',
        svg: `<svg viewBox="0 0 1024 721" aria-hidden="true" fill="currentColor" width="42" height="42"><path d="M1007.9,285.1c-11-40.6-42.8-72.2-83.4-83.2C844,178.4,512,178.4,512,178.4s-332,0-412.5,23.5c-40.6,11-72.4,42.6-83.4,83.2C2.6,365.6,2.6,512,2.6,512s0,146.4,13.5,226.9c11,40.6,42.8,72.2,83.4,83.2C180,845.6,512,845.6,512,845.6s332,0,412.5-23.5c40.6-11,72.4-42.6,83.4-83.2C1021.4,658.4,1021.4,512,1021.4,512S1021.4,365.6,1007.9,285.1z M409.6,604.4V311.4L678.4,458L409.6,604.4z"/></svg>`
    },
    {
        label: 'TIKTOK',
        url: 'https://www.tiktok.com/@chainf1ow?_t=ZS-8zvSoO8hpVI&_r=1',
        embedUrl: '',
        svg: `<svg viewBox="0 0 24 24" aria-hidden="true" width="42" height="42" fill="currentColor"><path d="M15.75 2.25c.23 2.04 1.53 3.4 3.5 3.55V8.6c-1.36.1-2.54-.33-3.5-.97v6.79c0 3.34-2.43 5.83-5.91 5.83-3.2 0-5.84-2.59-5.84-5.79 0-3.21 2.52-5.79 5.84-5.79.4 0 .79.04 1.18.12v3.07a2.65 2.65 0 0 0-1.18-.27c-1.43 0-2.6 1.17-2.6 2.68 0 1.47 1.17 2.67 2.6 2.67 1.54 0 2.59-1.04 2.59-2.67V2.25h3.52Z"/></svg>`
    }
];

function buildLinksMarkup(links = externalLinks) {
    const buttons = links.map(({ label, url, svg, embedUrl }) => {
        const embedAttr = embedUrl ? ` data-embed-url="${embedUrl}"` : '';
        return `<a href="${url}" class="link-button" target="_blank" rel="noopener noreferrer"${embedAttr} aria-label="${label}">${svg}<span>${label}</span></a>`;
    }).join('');
    return `<div class="flex flex-col items-center justify-center text-center"><div class="links-grid">${buttons}</div><p class="mt-8 text-lg opacity-70">Coming Soon...</p></div>`;
}

let beatAnimationId = null;
let feTurbulence, feDisplacementMap;

// ==============================================
// テーマ管理
// ==============================================
const themeConfig = {
    cool: {
        particleColor: 'rgba(243, 241, 236, 0.05)',
        gradientStops: ['#BF953F', '#FCF6BA', '#B38728', '#FBF5B7', '#AA771C'],
        accentColor: '#6D4BAE'
    },
    cute: {
        particleColor: 'rgba(213, 109, 122, 0.15)',
        gradientStops: ['#C03E5D', '#D56D7A', '#B883A1', '#A6776A', '#C03E5D'],
        accentColor: '#D56D7A'
    }
};

// Segmented toggle instead of switch/text
const themeSegment = document.getElementById('theme-segment');
const svgGradientStops = document.querySelectorAll('#primary-gradient-svg stop');

function createRipple(event, nextTheme) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    const x = event.clientX;
    const y = event.clientY;
    const endSize = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) * 2;
    ripple.style.width = ripple.style.height = `${endSize}px`;
    ripple.style.left = `${x - endSize / 2}px`;
    ripple.style.top = `${y - endSize / 2}px`;
    ripple.style.backgroundColor = themeConfig[nextTheme].accentColor;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
}

function showThemeMorph(nextTheme) {
    try {
        const container = document.getElementById('theme-morph');
        if (!container) return;
        container.innerHTML = '';
        const makeIcon = (isHeart) => {
            const wrap = document.createElement('div');
            wrap.className = 'morph-icon';
            wrap.innerHTML = isHeart
                ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#primary-gradient-svg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5 5 0 0 0-7.1 0L12 6.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l1.7 1.7L12 21l7.1-7.6 1.7-1.7a5 5 0 0 0 0-7.1z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#primary-gradient-svg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l4-4h10l4 4-9 14-9-14z"/><path d="M3 7h18"/><path d="M7 7l5 14"/><path d="M17 7l-5 14"/></svg>';
            return wrap;
        };
        const isToCute = nextTheme === 'cute';
        const outIcon = makeIcon(currentTheme === 'cute');
        const inIcon = makeIcon(isToCute);
        outIcon.classList.add('out');
        inIcon.classList.add('in');
        container.appendChild(outIcon);
        container.appendChild(inIcon);
        container.classList.add('show');
        // trigger transition
        requestAnimationFrame(() => {
            container.classList.add('animate');
        });
        setTimeout(() => {
            container.classList.remove('animate');
            container.classList.remove('show');
            container.innerHTML = '';
        }, 340);
    } catch (e) { /* noop */ }
}

function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    currentTheme = themeName;
    const stops = themeConfig[themeName].gradientStops;
    svgGradientStops.forEach((stop, index) => {
        stop.style.stopColor = stops[index];
    });

    if (themeName === 'cute') {
        contents[1] = cuteAbout[0];
        contents[2] = cuteAbout[1];
        contents[3] = cuteAbout[2];
    } else { // cool
        contents[1] = coolAbout[0];
        contents[2] = coolAbout[1];
        contents[3] = coolAbout[2];
    }

    const artistImgSrc = (themeName === 'cute') ? cuteMedia.artist : coolMedia.artist;
    contents[4] = `<div class="flex flex-col items-center justify-center"><img src="${artistImgSrc}" alt="Artist Photo" class="rounded-lg shadow-2xl shadow-amethyst/20" style="border: 2px solid; border-image-slice: 1; max-height: 60vh;" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x600/0B0D10/F3F1EC?text=Error';"><h3 class="mt-6 primary-gradient-text" style="font-family: 'Marcellus', serif; font-size: 1.75rem; letter-spacing: 0.1em;">ChainFlow</h3></div>`;
    
    const playlist = (themeName === 'cute') ? cutePlaylist : coolPlaylist;
    contents[6] = createMusicPlayerHTML(playlist);
    contents[8] = buildLinksMarkup();

    if (musicEngine && musicEngine.audioPlayer) {
        try {
            musicEngine.audioPlayer.pause();
            musicEngine.audioPlayer.removeAttribute('src');
            musicEngine.audioPlayer.load();
        } catch (e) { console.warn('Audio reset failed', e); }
        musicEngine.isPlaying = false;
        const hasTracks = Array.isArray(musicEngine.playlist) && musicEngine.playlist.length > 0;
        musicEngine.currentTrackIndex = hasTracks ? 0 : -1;
        musicEngine.trackItems = [];
        musicEngine.durations = [];
        musicEngine.loadedTrackFile = null;
    }

    updateAlbumArtDisplays(getThemeAlbumArt(themeName).main);
    const persistentPlayer = document.getElementById('persistent-player');
    if (persistentPlayer) {
        const titleEl = persistentPlayer.querySelector('.title-persistent');
        const artistEl = persistentPlayer.querySelector('.artist-persistent');
        const progressEl = persistentPlayer.querySelector('.progress-bar-persistent');
        const currentTimeEl = persistentPlayer.querySelector('#current-time-persistent');
        const totalTimeEl = persistentPlayer.querySelector('#total-duration-persistent');
        const artEl = persistentPlayer.querySelector('.album-art-persistent');
        if (titleEl) titleEl.textContent = 'No Music Playing';
        if (artistEl) artistEl.textContent = '';
        if (progressEl) progressEl.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = '00:00';
        if (totalTimeEl) totalTimeEl.textContent = '00:00';
        if (artEl) artEl.src = getThemeAlbumArt(themeName).persistent;
        persistentPlayer.classList.remove('visible');
        if (!persistentPlayerDismissed) {
            persistentPlayer.classList.remove('dismissed');
        }
    }

    lastChapterIndexVal = -1; // Force content refresh
    musicPlayerInitialized = false; // Reset music player initialization flag when theme changes
    
    if (websiteInitialized) {
        app.createLayers();
        app.updateOnScroll(window.scrollY);
    }
}

function updateThemeSegmentActive() {
    if (!themeSegment) return;
    const items = themeSegment.querySelectorAll('.seg-item');
    items.forEach(btn => {
        const isActive = btn.dataset.theme === currentTheme;
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });
}

// ==============================================
// 初期化 & ローディング
// ==============================================
function typeWriter(element, text, speed) {
    return new Promise(resolve => {
        element.innerHTML = ''; 
        const chars = text.split('');
        let completedChars = 0;
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.innerHTML = (char === ' ') ? '&nbsp;' : char;
            element.appendChild(span);
            setTimeout(() => {
                span.classList.add('revealed');
                if (++completedChars === chars.length) resolve();
            }, index * speed);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'cool';
    applyTheme(savedTheme);
    updateThemeSegmentActive();

    // Persistent player dismissal preference
    const ppEl = document.getElementById('persistent-player');
    persistentPlayerDismissed = localStorage.getItem('playerDismissed') === '1';
    if (ppEl && persistentPlayerDismissed) {
        ppEl.classList.add('dismissed');
        ppEl.classList.remove('visible');
    }

    // Restore player button in header
    const restoreBtn = document.getElementById('restore-player-btn');
    if (restoreBtn) {
        // Show only if player is dismissed
        restoreBtn.style.display = persistentPlayerDismissed ? 'grid' : 'none';

        restoreBtn.addEventListener('click', () => {
            const p = document.getElementById('persistent-player');
            if (!p) return;
            p.classList.remove('dismissed');
            p.classList.add('visible');
            localStorage.removeItem('playerDismissed');
            persistentPlayerDismissed = false;
            restoreBtn.style.display = 'none';
        });
    }

    // One-time theme helper tip
    // One-time mini guide for segmented toggle
    const segTip = document.getElementById('theme-seg-tip');
    const segTipShown = localStorage.getItem('themeSegTipShown') === '1';
    if (segTip && !segTipShown) {
        segTip.classList.add('show');
        const hideSegTip = () => {
            segTip.classList.remove('show');
            localStorage.setItem('themeSegTipShown', '1');
            window.removeEventListener('scroll', hideSegTip);
        };
        setTimeout(hideSegTip, 6000);
        window.addEventListener('scroll', hideSegTip, { once: true });
        if (themeSegment) themeSegment.addEventListener('click', hideSegTip, { once: true });
    }

    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const percentageText = document.getElementById('loading-percentage');
    
    let progress = 0;
    // Fake a quick loading animation
    const interval = setInterval(() => {
        progress += 4; // Speed up the loading
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.classList.add('scrollable');
                initializeWebsite();
            }, 500); // A brief pause after loading
        }
    }, 50); // Faster interval
});

// Attach click handlers for segmented theme toggle (in global scope to work before init if needed)
if (themeSegment) {
    themeSegment.addEventListener('click', (e) => {
        const target = e.target.closest('.seg-item');
        if (!target) return;
        const chosen = target.dataset.theme;
        if (!chosen || chosen === currentTheme) return;
        showThemeMorph(chosen);
        createRipple(e, chosen);
        applyTheme(chosen);
        updateThemeSegmentActive();
        try {
            if (!window.__themeToastShownOnce) {
                showToast((chosen === 'cute') ? 'ＣＵＴＥ テーマに切替' : 'ＣＯＯＬ テーマに切替');
                window.__themeToastShownOnce = true;
            }
        } catch (err) {}
    });

    // Keyboard navigation: Left/Right to choose
    themeSegment.addEventListener('keydown', (e) => {
        const items = Array.from(themeSegment.querySelectorAll('.seg-item'));
        const activeIndex = items.findIndex(b => b.getAttribute('aria-selected') === 'true');
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (e.key === 'ArrowLeft') ? 0 : 1; // 0=cool, 1=cute
            const nextTheme = items[nextIndex].dataset.theme;
            if (nextTheme && nextTheme !== currentTheme) {
                showThemeMorph(nextTheme);
                applyTheme(nextTheme);
                updateThemeSegmentActive();
                items[nextIndex].focus();
            }
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const focused = document.activeElement.closest('.seg-item');
            if (focused) {
                const t = focused.dataset.theme;
                if (t && t !== currentTheme) {
                    showThemeMorph(t);
                    applyTheme(t);
                    updateThemeSegmentActive();
                }
            }
        }
    });
}

// ==============================================
// ビートアニメーション制御
// ==============================================
function startBeatAnimation() {
    if (beatAnimationId || !feTurbulence) return;

    let startTime = performance.now();
    function animateBeat(currentTime) {
        const elapsed = currentTime - startTime;
        
        const beat1 = Math.abs(Math.sin(elapsed * 0.008)) * 0.8;
        const beat2 = Math.abs(Math.sin(elapsed * 0.003)) * 0.2;
        const randomJitter = Math.random() * 0.1;
        const frequency = 0.2 + beat1 + beat2 + randomJitter;

        const scaleBeat = Math.pow(Math.abs(Math.sin(elapsed * 0.004)), 4);
        const scale = 5 + scaleBeat * 40 + Math.random() * 5;

        feTurbulence.setAttribute('baseFrequency', frequency.toFixed(4));
        feDisplacementMap.setAttribute('scale', scale.toFixed(2));

        beatAnimationId = requestAnimationFrame(animateBeat);
    }
    beatAnimationId = requestAnimationFrame(animateBeat);
}

function stopBeatAnimation() {
    if (beatAnimationId) {
        cancelAnimationFrame(beatAnimationId);
        beatAnimationId = null;
    }
}

// Helper: lightweight toast
function showToast(message) {
    try {
        const old = document.querySelector('.toast');
        if (old) old.remove();
        const el = document.createElement('div');
        el.className = 'toast';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.textContent = message;
        document.body.appendChild(el);
        requestAnimationFrame(() => el.classList.add('show'));
        setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => el.remove(), 300);
        }, 2800);
    } catch (e) { console.warn('Toast error', e); }
}

// ==============================================
// Music Player (Refactored for Persistent Player)
// ==============================================

// Holds the core audio logic and state
const musicEngine = {
    audioPlayer: null,
    currentTrackIndex: 0,
    isPlaying: false,
    isInitialized: false,
    playlist: [],
    trackItems: [], // The <li> elements from the main player
    durations: [],  // Cached durations for each track (seconds)
    metadataCache: new Map(),
    metadataPromises: new Map(),
    loadedTrackFile: null,
};

function createMusicPlayerHTML(playlist) {
    const workingPlaylist = playlist.map(track => ({ ...track }));
    musicEngine.playlist = workingPlaylist; // Store playlist for the engine
    const initialTrack = workingPlaylist.length > 0 ? workingPlaylist[0] : null;
    musicEngine.currentTrackIndex = initialTrack ? 0 : -1;
    const initialArt = resolveAlbumArt(initialTrack);

    const tracklistHTML = workingPlaylist.map((track, index) => `
        <li class="track-item" data-index="${index}">
            <div class="track-details">
                <div class="relative w-5 h-5 flex items-center justify-center">
                    <span class="track-number">${index + 1}</span>
                    <svg class="track-play-icon absolute w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                </div>
                <div>
                    <div class="track-title">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
            </div>
            <span class="track-duration"></span>
        </li>
    `).join('');

    return `
        <div class="music-player">
            <div class="track-info">
                <img src="${initialArt}" alt="Album Art" class="album-art" loading="lazy">
                <div>
                    <h3 class="title">${initialTrack ? initialTrack.title : '準備中'}</h3>
                    <p class="artist">${initialTrack ? initialTrack.artist : '曲の情報がありません'}</p>
                    <a class="follow-btn" href="https://suno.com/@namakel" target="_blank" rel="noopener noreferrer">フォローする</a>
                </div>
            </div>
            <div class="controls">
                 <div class="main-control-group">
                    <button class="control-btn" id="prev-track">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
                    </button>
                    <div class="play-btn" id="play-pause">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="play-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="pause-icon" style="display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    </div>
                    <button class="control-btn" id="next-track">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
                    </button>
                </div>
                <div class="volume-control">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    <input type="range" id="volume-slider" min="0" max="1" step="0.01" value="0.75" class="volume-slider">
                </div>
            </div>
            <div class="time-display flex justify-between text-xs mt-2 mb-1">
                <span id="current-time">00:00</span>
                <span id="total-duration">00:00</span>
            </div>
            <div class="progress-bar-container-player" id="progress-container">
                <div class="progress-bar-player" id="progress-bar-player"></div>
            </div>
            <ul class="tracklist">${tracklistHTML}</ul>
        </div>
    `;
}

function getMetadataClient() {
    if (typeof window !== 'undefined') {
        const direct = window.musicMetadata;
        if (direct && typeof direct.parseBlob === 'function') return direct;
        const alt = window.musicMetadataBrowser;
        if (alt && typeof alt.parseBlob === 'function') return alt;
    }
    if (typeof musicMetadata !== 'undefined' && typeof musicMetadata.parseBlob === 'function') {
        return musicMetadata;
    }
    return null;
}

function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
    });
}

function resolveAlbumArt(track, themeName = currentTheme) {
    const themeArt = getThemeAlbumArt(themeName);
    if (!track) return themeArt.main;
    const cached = musicEngine.metadataCache.get(track.file);
    if (cached && cached.artUrl) return cached.artUrl;
    if (track.cover) return track.cover;
    return themeArt.main;
}

function updateAlbumArtDisplays(artUrl) {
    const themeArt = getThemeAlbumArt();
    const resolvedMain = artUrl || themeArt.main;
    const resolvedPersistent = artUrl || themeArt.persistent;
    const mainArt = document.querySelector('.music-player .album-art');
    if (mainArt && mainArt.src !== resolvedMain) {
        mainArt.src = resolvedMain;
    }
    const persistentArt = document.querySelector('#persistent-player .album-art-persistent');
    if (persistentArt && persistentArt.src !== resolvedPersistent) {
        persistentArt.src = resolvedPersistent;
    }
}

async function ensureTrackMetadata(trackIndex) {
    const trackData = musicEngine.playlist[trackIndex];
    if (!trackData || !trackData.file) return null;

    const cached = musicEngine.metadataCache.get(trackData.file);
    if (cached) return cached;

    if (musicEngine.metadataPromises.has(trackData.file)) {
        return musicEngine.metadataPromises.get(trackData.file);
    }

    const metadataClient = getMetadataClient();
    if (!metadataClient) {
        const fallback = { artUrl: trackData.cover || '', duration: null };
        musicEngine.metadataCache.set(trackData.file, fallback);
        return fallback;
    }

    const promise = (async () => {
        try {
            const resourceUrl = encodeURI(trackData.file);
            const response = await fetch(resourceUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${trackData.file}: ${response.status}`);
            }
            const blob = await response.blob();
            const metadata = await metadataClient.parseBlob(blob);
            const picture = (metadata && metadata.common && Array.isArray(metadata.common.picture))
                ? metadata.common.picture[0]
                : null;
            let artUrl = trackData.cover || '';
            if (picture && picture.data) {
                const artBlob = new Blob([picture.data], { type: picture.format || 'image/jpeg' });
                artUrl = await blobToDataUrl(artBlob);
            }
            const duration = metadata && metadata.format ? metadata.format.duration || null : null;
            const result = { artUrl, duration };
            musicEngine.metadataCache.set(trackData.file, result);
            return result;
        } catch (error) {
            console.warn('Metadata extraction failed for', trackData.file, error);
            const fallback = { artUrl: trackData.cover || '', duration: null };
            musicEngine.metadataCache.set(trackData.file, fallback);
            return fallback;
        } finally {
            musicEngine.metadataPromises.delete(trackData.file);
        }
    })();

    musicEngine.metadataPromises.set(trackData.file, promise);
    return promise;
}

function applyDurationToUI(index, durationSeconds) {
    if (typeof durationSeconds !== 'number' || isNaN(durationSeconds)) return;
    musicEngine.durations[index] = durationSeconds;

    const item = musicEngine.trackItems[index];
    if (item) {
        const durationEl = item.querySelector('.track-duration');
        if (durationEl) durationEl.textContent = formatTime(durationSeconds);
    }

    if (musicEngine.currentTrackIndex === index) {
        const formatted = formatTime(durationSeconds);
        const mainPlayer = document.querySelector('.music-player');
        if (mainPlayer) {
            const totalEl = mainPlayer.querySelector('#total-duration');
            if (totalEl) totalEl.textContent = formatted;
        }
        const persistentPlayer = document.getElementById('persistent-player');
        if (persistentPlayer) {
            const totalEl = persistentPlayer.querySelector('#total-duration-persistent');
            if (totalEl) totalEl.textContent = formatted;
        }
    }
}

function initializeMusicEngine() {
    if (musicEngine.isInitialized) return;

    musicEngine.audioPlayer = document.getElementById('audio-player');
    if (musicEngine.audioPlayer) {
        musicEngine.audioPlayer.preload = 'metadata';
    }
    // Restore saved volume or default
    const savedVol = parseFloat(localStorage.getItem('playerVolume'));
    musicEngine.audioPlayer.volume = isNaN(savedVol) ? 0.75 : Math.min(1, Math.max(0, savedVol));

    // --- Get Persistent Player Elements ---
    const persistentPlayerPlayBtn = document.getElementById('play-pause-persistent');
    const persistentPlayerNextBtn = document.getElementById('next-track-persistent');
    const persistentPlayerPrevBtn = document.getElementById('prev-track-persistent');
    const persistentVolumeSlider = document.getElementById('volume-slider-persistent');
    const persistentProgressContainer = document.getElementById('progress-container-persistent');
    const dismissPersistentBtn = document.getElementById('dismiss-player-btn');

    if (dismissPersistentBtn) {
        dismissPersistentBtn.addEventListener('click', () => {
            const pp = document.getElementById('persistent-player');
            if (pp) {
                pp.classList.remove('visible');
                pp.classList.add('dismissed');
                localStorage.setItem('playerDismissed', '1');
                persistentPlayerDismissed = true;
                // Reveal restore button and pulse
                const rbtn = document.getElementById('restore-player-btn');
                if (rbtn) {
                    rbtn.style.display = 'grid';
                    rbtn.classList.remove('pulse-once');
                    // force reflow to retrigger
                    void rbtn.offsetWidth;
                    rbtn.classList.add('pulse-once');
                }
                // Show a brief toast tip
                showToast('プレイヤーを閉じました。右上のボタンから再表示できます');
            }
        });
    }

    // --- Core Audio Logic ---
    const playTrack = () => {
        if (!musicEngine.audioPlayer || musicEngine.playlist.length === 0) return;

        const currentTrack = musicEngine.playlist[musicEngine.currentTrackIndex];
        if (!currentTrack) return;

        if (musicEngine.loadedTrackFile !== currentTrack.file) {
            loadTrack(musicEngine.currentTrackIndex);
            return;
        }

        const needsSource = !(musicEngine.audioPlayer.currentSrc || musicEngine.audioPlayer.src);
        if (needsSource) {
            const fallbackIndex = (typeof musicEngine.currentTrackIndex === 'number' && musicEngine.currentTrackIndex >= 0)
                ? musicEngine.currentTrackIndex
                : 0;
            loadTrack(fallbackIndex);
            return;
        }

        const startPlayback = () => {
            const pp = document.getElementById('persistent-player');
            if (pp) {
                pp.classList.remove('dismissed');
                pp.classList.add('visible');
            }
            try {
                localStorage.removeItem('playerDismissed');
                persistentPlayerDismissed = false;
                const rbtn = document.getElementById('restore-player-btn');
                if (rbtn) rbtn.style.display = 'none';
            } catch (e) {}

            musicEngine.audioPlayer.play().then(() => {
                musicEngine.isPlaying = true;
                updateAllPlayerUIs();
                const el = document.getElementById('persistent-player');
                if (el) el.classList.add('visible');
                document.body.classList.add('persistent-player-visible');
            }).catch(e => console.error("Audio play error:", e));
        };

        startPlayback();
    };

    const pauseTrack = () => {
        musicEngine.audioPlayer.pause();
        musicEngine.isPlaying = false;
        updateAllPlayerUIs();
    };

    const loadTrack = (trackIndex) => {
        const trackData = musicEngine.playlist[trackIndex];
        if (!trackData) return;

        musicEngine.currentTrackIndex = trackIndex;
        updateAlbumArtDisplays(resolveAlbumArt(trackData));
        musicEngine.audioPlayer.src = encodeURI(trackData.file);
        musicEngine.audioPlayer.load();
        musicEngine.loadedTrackFile = trackData.file;
        ensureTrackMetadata(trackIndex)
            .then((meta) => {
                if (!meta) return;
                if (meta.duration) {
                    applyDurationToUI(trackIndex, meta.duration);
                }
                if (musicEngine.currentTrackIndex === trackIndex && meta.artUrl) {
                    updateAlbumArtDisplays(meta.artUrl);
                }
            })
            .catch((err) => console.warn('Metadata load failed:', err));
        playTrack(); 
    };

    const nextTrack = () => {
        const newIndex = (musicEngine.currentTrackIndex + 1) % musicEngine.playlist.length;
        loadTrack(newIndex);
    };

    const prevTrack = () => {
        const newIndex = (musicEngine.currentTrackIndex - 1 + musicEngine.playlist.length) % musicEngine.playlist.length;
        loadTrack(newIndex);
    };
    
    const setVolume = (volume) => {
        const v = Math.min(1, Math.max(0, parseFloat(volume)));
        musicEngine.audioPlayer.volume = v;
        try { localStorage.setItem('playerVolume', String(v)); } catch (e) {}
        updateAllPlayerUIs(); // To sync sliders
    }

    // --- Event Listeners for Audio Element ---
    musicEngine.audioPlayer.addEventListener('timeupdate', updateAllPlayerUIs);
    musicEngine.audioPlayer.addEventListener('loadedmetadata', updateAllPlayerUIs);
    musicEngine.audioPlayer.addEventListener('ended', nextTrack);
    musicEngine.audioPlayer.addEventListener('volumechange', () => {
        try { localStorage.setItem('playerVolume', String(musicEngine.audioPlayer.volume)); } catch (e) {}
    });

    // --- Wire up Persistent Player Controls ---
    persistentPlayerPlayBtn.addEventListener('click', () => {
        musicEngine.isPlaying ? pauseTrack() : playTrack();
    });
    persistentPlayerNextBtn.addEventListener('click', nextTrack);
    persistentPlayerPrevBtn.addEventListener('click', prevTrack);
    if (persistentVolumeSlider) {
        persistentVolumeSlider.value = musicEngine.audioPlayer.volume;
        persistentVolumeSlider.addEventListener('input', (e) => {
            setVolume(e.target.value);
        });
    }
    persistentProgressContainer.addEventListener('click', (e) => {
        const width = persistentProgressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = musicEngine.audioPlayer.duration;
        if (duration) {
            musicEngine.audioPlayer.currentTime = (clickX / width) * duration;
        }
    });


    // --- Expose control methods to the global scope for other parts of the app ---
    app.playTrack = playTrack;
    app.pauseTrack = pauseTrack;
    app.loadTrack = loadTrack;
    app.nextTrack = nextTrack;
    app.prevTrack = prevTrack;
    app.setVolume = setVolume;

    musicEngine.isInitialized = true;
    console.log('Music Engine Initialized');
}

// Preload and display track durations in the list (without starting playback)
function preloadTrackDurations() {
    if (!musicEngine.playlist || musicEngine.playlist.length === 0) return;
    musicEngine.durations = new Array(musicEngine.playlist.length).fill(null);
    musicEngine.playlist.forEach((track, index) => {
        try {
            const tempAudio = new Audio();
            tempAudio.preload = 'metadata';
            tempAudio.src = encodeURI(track.file);
            const onLoaded = () => {
                const d = tempAudio.duration;
                if (!isNaN(d)) {
                    musicEngine.durations[index] = d;
                    // Update UI if the element exists
                    const item = musicEngine.trackItems[index];
                    if (item) {
                        const durationEl = item.querySelector('.track-duration');
                        if (durationEl) durationEl.textContent = formatTime(d);
                    }
                }
                // Clean up
                tempAudio.removeEventListener('loadedmetadata', onLoaded);
            };
            tempAudio.addEventListener('loadedmetadata', onLoaded);
        } catch (e) {
            console.warn('Duration preload failed for', track.file, e);
        }
    });
}

function initializeMainPlayerUI() {
    const musicPlayer = document.querySelector('.music-player');
    if (!musicPlayer || musicPlayer.dataset.initialized === 'true') return;

    // --- Get UI Elements ---
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev-track');
    const nextBtn = document.getElementById('next-track');
    const trackItems = musicPlayer.querySelectorAll('.track-item');
    const progressContainer = document.getElementById('progress-container');
    const volumeSlider = document.getElementById('volume-slider');

    // --- Attach Event Listeners ---
    playPauseBtn.addEventListener('click', () => {
        musicEngine.isPlaying ? app.pauseTrack() : app.playTrack();
    });
    prevBtn.addEventListener('click', app.prevTrack);
    nextBtn.addEventListener('click', app.nextTrack);

    trackItems.forEach((track, index) => {
        track.addEventListener('click', () => {
            const audioEl = musicEngine.audioPlayer;
            const hasSource = audioEl && (audioEl.currentSrc || audioEl.src);
            if (musicEngine.currentTrackIndex === index && hasSource) {
                musicEngine.isPlaying ? app.pauseTrack() : app.playTrack();
            } else {
                app.loadTrack(index);
            }
        });
    });

    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = musicEngine.audioPlayer.duration;
        if (duration) {
            musicEngine.audioPlayer.currentTime = (clickX / width) * duration;
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        app.setVolume(e.target.value); // Use the new centralized function
    });
    // Set initial volume
    app.setVolume(volumeSlider.value);

    musicPlayer.dataset.initialized = 'true';
    musicEngine.trackItems = Array.from(trackItems); // Store for UI updates
    // Preload durations for all tracks so they are visible from the start
    preloadTrackDurations();
    console.log('Main Player UI Initialized');
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateAllPlayerUIs() {
    const { audioPlayer, isPlaying, currentTrackIndex, playlist } = musicEngine;
    const track = playlist[currentTrackIndex];
    if (!track) return;

    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercent = duration ? (currentTime / duration) * 100 : 0;
    const volume = audioPlayer.volume;

    updateAlbumArtDisplays(resolveAlbumArt(track));

    // --- Update Main Player ---
    const mainPlayer = document.querySelector('.music-player');
    if (mainPlayer) {
        mainPlayer.querySelector('.title').textContent = track.title;
        mainPlayer.querySelector('.artist').textContent = track.artist;
        mainPlayer.querySelector('.play-icon').style.display = isPlaying ? 'none' : 'block';
        mainPlayer.querySelector('.pause-icon').style.display = isPlaying ? 'block' : 'none';
        mainPlayer.querySelector('#current-time').textContent = formatTime(currentTime);
        mainPlayer.querySelector('#total-duration').textContent = formatTime(duration);
        mainPlayer.querySelector('#progress-bar-player').style.width = `${progressPercent}%`;
        mainPlayer.querySelector('#volume-slider').value = volume;
        
        musicEngine.trackItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentTrackIndex);
            const durationEl = item.querySelector('.track-duration');
            if (index === currentTrackIndex && duration) {
                durationEl.textContent = formatTime(duration);
            }
        });
    }

    // --- Update Persistent Player ---
    const persistentPlayer = document.getElementById('persistent-player');
    if (persistentPlayer) {
        persistentPlayer.querySelector('.title-persistent').textContent = track.title;
        persistentPlayer.querySelector('.artist-persistent').textContent = track.artist;
        persistentPlayer.querySelector('.play-icon-persistent').style.display = isPlaying ? 'none' : 'block';
        persistentPlayer.querySelector('.pause-icon-persistent').style.display = isPlaying ? 'block' : 'none';
        persistentPlayer.querySelector('.progress-bar-persistent').style.width = `${progressPercent}%`;
        persistentPlayer.querySelector('#current-time-persistent').textContent = formatTime(currentTime);
        persistentPlayer.querySelector('#total-duration-persistent').textContent = formatTime(duration);
        persistentPlayer.querySelector('#volume-slider-persistent').value = volume;
    }
}



// ==============================================
// メインのウェブサイト機能
// ==============================================
function initializeWebsite() {
    websiteInitialized = true;
    initializeMusicEngine(); // Initialize the core audio logic once.
    
    feTurbulence = document.querySelector('#beat-noise-filter feTurbulence');
    feDisplacementMap = document.querySelector('#beat-noise-filter feDisplacementMap');

    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    const initVW = (window.visualViewport && window.visualViewport.width) ? window.visualViewport.width : window.innerWidth;
    const initVH = (window.visualViewport && window.visualViewport.height) ? window.visualViewport.height : window.innerHeight;
    canvas.width = initVW;
    canvas.height = initVH;
    let particlesArray;
    const particleCount = 100;

    class Particle {
        constructor(x, y, dX, dY, size) { this.x = x; this.y = y; this.directionX = dX; this.directionY = dY; this.size = size; }
        draw() { 
            ctx.beginPath(); 
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); 
            ctx.fillStyle = themeConfig[currentTheme].particleColor; 
            ctx.fill(); 
        }
        update() {
            if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
            if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
            this.x += this.directionX; this.y += this.directionY;
            this.draw();
        }
    }
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < particleCount; i++) {
            let size = (Math.random() * 1.5) + 0.5;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let dX = (Math.random() - 0.5) * 0.2;
            let dY = (Math.random() - 0.5) * 0.2;
            particlesArray.push(new Particle(x, y, dX, dY, size));
        }
    }
    function animateParticles() {
        requestAnimationFrame(animateParticles);
        const vw = (window.visualViewport && window.visualViewport.width) ? window.visualViewport.width : innerWidth;
        const vh = (window.visualViewport && window.visualViewport.height) ? window.visualViewport.height : innerHeight;
        ctx.clearRect(0, 0, vw, vh);
        particlesArray.forEach(p => p.update());
    }
    initParticles();
    animateParticles();

    const musicContainer = document.getElementById('music-notes-container');
    const musicElements = [];
    const notes = ['♪', '♫', '♡', '☆', '♭', '♯'];
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.classList.add('music-element');
        el.textContent = notes[Math.floor(Math.random() * notes.length)];
        el.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        musicContainer.appendChild(el);
        musicElements.push({ el: el, x: Math.random() * innerWidth, y: Math.random() * innerHeight, speedX: (Math.random() - 0.5) * 0.5, speedY: (Math.random() - 0.5) * 0.5, baseSpeedX: (Math.random() - 0.5) * 0.5, baseSpeedY: (Math.random() - 0.5) * 0.5, rotation: Math.random() * 360, rotationSpeed: (Math.random() - 0.5) * 0.2 });
    }
    function animateMusicElements() {
        musicElements.forEach(item => {
            const speedMultiplier = isMusicSectionActive ? 3 : 1;
            item.speedX = item.baseSpeedX * speedMultiplier;
            item.speedY = item.speedY * speedMultiplier;
            item.el.style.opacity = isMusicSectionActive ? (currentTheme === 'cute' ? 0.4 : 0.2) : (currentTheme === 'cute' ? 0.2 : 0.1);

            item.x += item.speedX; item.y += item.speedY; item.rotation += item.rotationSpeed;
            if (item.x > innerWidth + 50) item.x = -50; if (item.x < -50) item.x = innerWidth + 50; if (item.y > innerHeight + 50) item.y = -50; if (item.y < -50) item.y = innerHeight + 50;
            item.el.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.rotation}deg)`;
        });
        requestAnimationFrame(animateMusicElements);
    }
    animateMusicElements();

    const zoomContainer = document.getElementById('zoom-container');
    let layerData = [];
    let numLayers = 30; // adjusted per theme in createLayers
    const mediaPositions = [
        { baseX: -60, baseY: -60 }, { baseX: 20,  baseY: 40  }, { baseX: 60,  baseY: -60 },
        { baseX: -20, baseY: 0   }, { baseX: -60, baseY: 60  }, { baseX: 65,  baseY: -55 },
        { baseX: -20, baseY: -40 }, { baseX: 25,  baseY: 45  }, { baseX: -55, baseY: 65  },
        { baseX: 60,  baseY: 0   }
    ];
    
    app.createLayers = function() {
        zoomContainer.innerHTML = '';
        layerData = [];
        // Increase decorative shape density for CUTE theme
        numLayers = (currentTheme === 'cute') ? 40 : 30;
        let mediaPositionIndex = 0;
        const layerTypes = Array(numLayers).fill(0);
        // Reduce number of illustration squares to about half
        const mediaCount = 5; 
        for(let i = 0; i < mediaCount; i++) { layerTypes[i] = 1; }
        for (let i = layerTypes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [layerTypes[i], layerTypes[j]] = [layerTypes[j], layerTypes[i]];
        }
        for (let i = 0; i < numLayers; i++) {
            const layerEl = document.createElement('div');
            layerEl.classList.add('zoom-layer');
            const depth = i * 100;
            let size, baseX, baseY;
            if (layerTypes[i] === 1) {
                size = Math.min(window.innerWidth * 0.6, 750); 
                layerEl.style.width = `${size}px`;
                layerEl.style.height = `${size}px`;
                layerEl.style.border = '1px solid rgba(128, 128, 128, 0.2)';
                const img = document.createElement('img');
                const currentMedia = currentTheme === 'cool' ? coolMedia.media : cuteMedia.media;
                img.src = currentMedia[mediaPositionIndex % currentMedia.length];
                img.alt = "Media content";
                img.loading = "lazy";
                img.onerror = function() { this.src = `https://placehold.co/${Math.round(size)}x${Math.round(size)}/0B0D10/F3F1EC?text=Error`; };
                layerEl.appendChild(img);
                const position = mediaPositions[mediaPositionIndex % mediaPositions.length];
                baseX = position.baseX;
                baseY = position.baseY;
                mediaPositionIndex++;
            } else {
                // Fewer skips on CUTE to show more frames
                const skipProb = (currentTheme === 'cute') ? 0.02 : 0.1;
                if (Math.random() < skipProb) continue;

                const baseSize = Math.min(window.innerWidth * 0.4, 200);
                size = (Math.random() > 0.5) ? baseSize * (1.8 + Math.random() * 0.4) : baseSize * (0.4 + Math.random() * 0.2);
                
                layerEl.style.width = `${size}px`;
                layerEl.style.height = `${size}px`;
                
                let deadZoneX = 30, deadZoneY = 30;

                if (currentTheme === 'cute') {
                    deadZoneX = 45; deadZoneY = 45;
                    const shapeType = ['heart', 'star', 'circle'][Math.floor(Math.random() * 3)];
                    const cuteColors = ['--cute-pink', '--cute-salmon', '--cute-mauve', '--cute-brown'];
                    const randomColorVar = cuteColors[Math.floor(Math.random() * cuteColors.length)];
                    const colorValue = getComputedStyle(document.documentElement).getPropertyValue(randomColorVar).trim();
                    
                    const svgNS = "http://www.w3.org/2000/svg";
                    const svg = document.createElementNS(svgNS, "svg");
                    svg.setAttribute("viewBox", "0 0 24 24");
                    svg.style.overflow = "visible";
                    svg.style.filter = `drop-shadow(0 0 8px ${colorValue}80)`;

                    let shape;
                    if (shapeType === 'heart') {
                        shape = document.createElementNS(svgNS, "path");
                        shape.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
                    } else if (shapeType === 'star') {
                        shape = document.createElementNS(svgNS, "path");
                        shape.setAttribute("d", "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z");
                    } else {
                        shape = document.createElementNS(svgNS, "circle");
                        shape.setAttribute("cx", "12"); shape.setAttribute("cy", "12"); shape.setAttribute("r", "10");
                    }
                    
                    shape.setAttribute("fill", "none"); shape.setAttribute("stroke", colorValue);
                    shape.setAttribute("stroke-width", "0.1"); shape.setAttribute("stroke-linecap", "round"); shape.setAttribute("stroke-linejoin", "round");
                    svg.appendChild(shape);
                    layerEl.appendChild(svg);
                } else {
                    const coolColors = ['--burgundy', '--jade', '--verm', '--olive', '--amethyst', '--plum'];
                    const randomColorVar = coolColors[Math.floor(Math.random() * coolColors.length)];
                    if (Math.random() > 0.7) {
                        layerEl.classList.add('primary-gradient-border');
                        layerEl.style.borderWidth = `${Math.random() * 2 + 2}px`;
                    } else {
                        const colorValue = getComputedStyle(document.documentElement).getPropertyValue(randomColorVar).trim();
                        layerEl.style.borderColor = colorValue;
                        layerEl.style.boxShadow = `0 0 20px ${colorValue}`;
                        layerEl.style.borderWidth = `${Math.random() * 2 + 1}px`;
                    }
                }
                
                const fullRangeX = 65, fullRangeY = 65;
                baseX = (Math.random() - 0.5) * 2 * fullRangeX;
                baseY = (Math.random() - 0.5) * 2 * fullRangeY;
                if (Math.abs(baseX) < deadZoneX) baseX = (baseX > 0 ? 1 : -1) * (deadZoneX + Math.random() * (fullRangeX - deadZoneX));
                if (Math.abs(baseY) < deadZoneY) baseY = (baseY > 0 ? 1 : -1) * (deadZoneY + Math.random() * (fullRangeY - deadZoneY));
            }
            zoomContainer.appendChild(layerEl);
            layerData.push({ el: layerEl, depth: depth, baseX: baseX, baseY: baseY, rotationSpeedX: (Math.random() - 0.5) * 0.5, rotationSpeedY: (Math.random() - 0.5) * 0.5 });
        }
    }

    // Initialize contents with current theme
    const aboutText1 = (currentTheme === 'cute') ? cuteAbout[0] : coolAbout[0];
    const aboutText2 = (currentTheme === 'cute') ? cuteAbout[1] : coolAbout[1];
    const aboutText3 = (currentTheme === 'cute') ? cuteAbout[2] : coolAbout[2];
    const artistImgSrc = (currentTheme === 'cute') ? cuteMedia.artist : coolMedia.artist;
    const playlist = (currentTheme === 'cute') ? cutePlaylist : coolPlaylist;

    contents = [
        `<div class="title-wrapper"><h2 class="section-title">ABOUT</h2></div>`,
        aboutText1,
        aboutText2,
        aboutText3,
        `<div class="flex flex-col items-center justify-center"><img src="${artistImgSrc}" alt="Artist Photo" class="rounded-lg shadow-2xl shadow-amethyst/20" style="border: 2px solid; border-image-slice: 1; max-height: 60vh;" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x600/0B0D10/F3F1EC?text=Error';"><h3 class="mt-6 primary-gradient-text" style="font-family: 'Marcellus', serif; font-size: 1.75rem; letter-spacing: 0.1em;">ChainFlow</h3></div>`,
        `<div class="title-wrapper"><h2 class="section-title">WORKS</h2></div>`,
        createMusicPlayerHTML(playlist),
        `<div class="title-wrapper"><h2 class="section-title">LINKS</h2></div>`,
        buildLinksMarkup()
    ];

    const scrollContainer = document.getElementById('scroll-container');
    const textContent = document.getElementById('text-content');
    const textDisplayArea = document.getElementById('text-display-area');
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');
    const bottomFade = document.getElementById('bottom-fade');
    const endingCurtain = document.getElementById('ending-curtain');
    
    const menuButton = document.querySelector('.menu-container');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const menuLinks = Array.from(document.querySelectorAll('.menu-link')); // Use Array.from for easier manipulation
    let lastFocusedElement; // For accessibility
    
    const scrollButton = document.getElementById('scroll-button');
    const scrollButtonIcon = document.getElementById('scroll-button-icon');
    const downArrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#primary-gradient-svg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m-7-7l7 7 7-7"/></svg>`;
    const upArrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#primary-gradient-svg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
    
    totalPagesEl.textContent = `/ ${String(contents.length + 1).padStart(2, '0')}`;

    // Viewport helpers to stabilize mobile URL bar behavior
    const getViewportHeight = () => (window.visualViewport && window.visualViewport.height) ? window.visualViewport.height : window.innerHeight;
    const getViewportWidth = () => (window.visualViewport && window.visualViewport.width) ? window.visualViewport.width : window.innerWidth;

    let chapterHeight = getViewportHeight() * 1.5;
    scrollContainer.style.height = `${chapterHeight * (contents.length + 1.5)}px`;
    document.body.style.height = scrollContainer.style.height;

    const sectionStartIndexes = [0, 5, 7, contents.length];

    lastChapterIndexVal = -1;
    let ticking = false;
    let mouse = { x: 0, y: 0 };

    app.updateOnScroll = function(scrollY) {
        const visualChapterIndex = Math.floor(scrollY / chapterHeight);
        const progressInChapter = (scrollY % chapterHeight) / chapterHeight;

        // Calculate text opacity and scale first
        let textOpacity = 0, textScale = 0.5;
        if (visualChapterIndex < contents.length) {
            // Fade in: 10% -> 30%
            if (progressInChapter > 0.1 && progressInChapter <= 0.3) {
                const t = (progressInChapter - 0.1) / 0.2;
                textOpacity = t;
                textScale = 0.5 + t * 0.5;
            } 
            // Fully visible: 30% -> 70%
            else if (progressInChapter > 0.3 && progressInChapter <= 0.7) {
                textOpacity = 1;
                textScale = 1.0;
            } 
            // Fade out: 70% -> 90%
            else if (progressInChapter > 0.7 && progressInChapter < 0.9) {
                const t = (progressInChapter - 0.7) / 0.2;
                textOpacity = 1 - t;
                textScale = 1.0 + t * 2.0;
            }
        }
        textOpacity = Math.max(0, Math.min(1, textOpacity));
        textScale = Math.max(0, textScale);

        // Update layers (background elements)
        // Pass 1: compute layout/opacity metrics and find the closest image layer
        const metrics = [];
        let closestImageIdx = -1;
        let closestImageZ = Infinity;
        layerData.forEach((item, idx) => {
            const { el, depth, baseX, baseY, rotationSpeedX, rotationSpeedY } = item;
            const totalDepth = numLayers * 100;
            let adjustedDepth = (depth - scrollY) % totalDepth;
            if (adjustedDepth < 0) adjustedDepth += totalDepth;

            const relativeZ = adjustedDepth;
            const scale = 1 / (relativeZ * 0.005 + 1);
            let layerOpacity = Math.max(0, 1 - (relativeZ / (numLayers * 50)));
            const isImageLayer = !!el.querySelector('img');
            if (isImageLayer && textOpacity > 0.1) {
                layerOpacity = layerOpacity * (1 - textOpacity * 0.9);
            }
            metrics[idx] = { el, depth, baseX, baseY, rotationSpeedX, rotationSpeedY, relativeZ, scale, layerOpacity, isImageLayer };

            if (isImageLayer && relativeZ < closestImageZ) {
                closestImageZ = relativeZ;
                closestImageIdx = idx;
            }
        });

        // Pass 2: apply transforms/opacities; in cute theme, keep only the closest image visible
        metrics.forEach((m, idx) => {
            const { el, depth, baseX, baseY, rotationSpeedX, rotationSpeedY, relativeZ, scale } = m;
            let { layerOpacity, isImageLayer } = m;

            if (currentTheme === 'cute' && isImageLayer && idx !== closestImageIdx) {
                layerOpacity = 0; // ensure at most one image visible at a time
            }

            const parallaxX = mouse.x * (depth / 100);
            const parallaxY = mouse.y * (depth / 100);
            const x = baseX * scale;
            const y = baseY * scale;
            const rotX = scrollY * rotationSpeedX * 0.1;
            const rotY = scrollY * rotationSpeedY * 0.1;

            el.style.transform = `translateX(calc(-50% + ${parallaxX}px)) translateY(calc(-50% + ${parallaxY}px)) translate3d(${x}vw, ${y}vh, 0) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            el.style.opacity = layerOpacity;
        });

        // Update page indicator and other UI elements
        currentPageEl.textContent = String(Math.min(contents.length + 1, visualChapterIndex + 1)).padStart(2, '0');
        
        const isNowMusicSection = (visualChapterIndex === 6);
        const isLinksSection = (visualChapterIndex === 8);
        isMusicSectionActive = isNowMusicSection;
        // Toggle stronger background muting when the music player is visible
        document.body.classList.toggle('music-mode', isNowMusicSection);
        // Enable pointer events only on the music section so controls are clickable
        if (textDisplayArea) {
            const shouldEnablePointerEvents = isNowMusicSection || isLinksSection;
            textDisplayArea.style.pointerEvents = shouldEnablePointerEvents ? 'auto' : 'none';
        }
        // Music section: show the player all at once (no gradual fade/scale)
        if (isNowMusicSection) {
            textOpacity = 1;
            textScale = 1.35; // fixed size for clarity
        }

        const isEffectivelyLastPage = visualChapterIndex >= contents.length;
        scrollButtonIcon.innerHTML = isEffectivelyLastPage ? upArrowSVG : downArrowSVG;
        scrollButton.classList.add('visible');
        bottomFade.classList.toggle('visible', visualChapterIndex === contents.length - 1);

        // Handle ending curtain
        const endThreshold = contents.length * chapterHeight;
        const isEndingVisible = scrollY >= endThreshold - window.innerHeight / 2;
        if (isEndingVisible) {
            if (!endingCurtain.classList.contains('visible')) {
                endingCurtain.classList.add('visible');
                startBeatAnimation();
            }
        } else {
            if (endingCurtain.classList.contains('visible')) {
                endingCurtain.classList.remove('visible');
                stopBeatAnimation();
            }
        }

        // Update text content
        if (visualChapterIndex >= contents.length) {
            textContent.style.opacity = '0';
            textContent.style.transform = 'scale(0.9)';
            return;
        }

        if (visualChapterIndex !== lastChapterIndexVal) {
            textContent.innerHTML = contents[visualChapterIndex];
            const artistImg = textContent.querySelector('img');
            if(artistImg) {
                artistImg.classList.add('primary-gradient-border');
            }
            lastChapterIndexVal = visualChapterIndex;

            // When the music section is scrolled into view, initialize its UI
            if (visualChapterIndex === 6) {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        initializeMainPlayerUI();
                    }, 50);
                });
            }

            // Links section microinteraction fallback (dim siblings and scale icons/text)
            const linksGrid = textContent.querySelector('.links-grid');
            if (linksGrid) {
                const buttons = Array.from(linksGrid.querySelectorAll('.link-button'));
                const setHover = (btn) => {
                    linksGrid.classList.add('hovering');
                    buttons.forEach(b => b.classList.toggle('is-hovered', b === btn));
                };
                const clearHover = () => {
                    linksGrid.classList.remove('hovering');
                    buttons.forEach(b => b.classList.remove('is-hovered'));
                };
                linksGrid.addEventListener('mouseover', (e) => {
                    const btn = e.target.closest('.link-button');
                    if (btn) setHover(btn);
                });
                linksGrid.addEventListener('focusin', (e) => {
                    const btn = e.target.closest('.link-button');
                    if (btn) setHover(btn);
                });
                linksGrid.addEventListener('mouseleave', clearHover);
                linksGrid.addEventListener('focusout', (e) => {
                    // If focus moves outside the grid, clear
                    if (!linksGrid.contains(document.activeElement)) clearHover();
                });
            }
        }

        textContent.style.opacity = textOpacity;
        textContent.style.transform = `translate(-50%, -50%) scale(${textScale})`;
        textContent.style.transformOrigin = 'center center';
    }
    
    function onScroll() {
        const currentScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                app.updateOnScroll(currentScrollY);
                ticking = false;
            });
            ticking = true;
        }
    }

    function openMenu() {
        lastFocusedElement = document.activeElement;
        menuOverlay.classList.add('visible');
        document.body.classList.add('menu-open');
        // Focus the first link in the menu after transition
        setTimeout(() => menuLinks[0] && menuLinks[0].focus(), 100);
    }

    function closeMenu() {
        menuOverlay.classList.remove('visible');
        document.body.classList.remove('menu-open');
        // Return focus to the element that opened the menu
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    menuButton.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const chapterIndex = parseInt(e.target.dataset.chapter, 10);
            const targetScroll = chapterIndex * chapterHeight + (chapterHeight / 2);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            setTimeout(closeMenu, 400);
        });
    });

    // Add keyboard accessibility to the menu (focus trapping and Escape to close)
    menuOverlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            return;
        }

        if (e.key === 'Tab') {
            const focusableElements = [closeMenuBtn, ...menuLinks];
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    // [MODIFIED] Updated scroll button logic to jump to sections accurately
    scrollButton.addEventListener('click', () => {
        const currentScrollY = window.scrollY;
        const visualChapterIndex = Math.floor((currentScrollY + chapterHeight * 0.4) / chapterHeight);

        if (visualChapterIndex >= contents.length) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        let nextSectionIndex = -1;
        for(const index of sectionStartIndexes) {
            if (index > visualChapterIndex) {
                nextSectionIndex = index;
                break;
            }
        }
        
        let targetScroll;
        if (nextSectionIndex !== -1) {
            if (nextSectionIndex === contents.length) {
                targetScroll = nextSectionIndex * chapterHeight;
            } else {
                targetScroll = nextSectionIndex * chapterHeight + (chapterHeight / 2);
            }
        } else {
            targetScroll = contents.length * chapterHeight;
        }
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / getViewportWidth()) * 2 - 1;
        mouse.y = -(event.clientY / getViewportHeight()) * 2 + 1;
    });
    window.addEventListener('touchmove', (event) => {
        if (!event.touches || event.touches.length === 0) return;
        const t = event.touches[0];
        mouse.x = (t.clientX / getViewportWidth()) * 2 - 1;
        mouse.y = -(t.clientY / getViewportHeight()) * 2 + 1;
    }, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    
    let resizeTimeout;
    function updateLayoutDimensions() {
        const vw = getViewportWidth();
        const vh = getViewportHeight();
        canvas.width = vw; canvas.height = vh;
        initParticles();
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            chapterHeight = vh * 1.5;
            app.createLayers();
            const totalH = chapterHeight * (contents.length + 1.5);
            document.body.style.height = `${totalH}px`;
            scrollContainer.style.height = `${totalH}px`;
            app.updateOnScroll(window.scrollY);
        }, 250);
    }
    window.addEventListener('resize', updateLayoutDimensions);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateLayoutDimensions);
    }

    app.createLayers();
    app.updateOnScroll(window.scrollY);

    // Show theme onboarding on first visit
    const seen = localStorage.getItem('themeOnboardingSeen') === '1';
    const overlay = document.getElementById('theme-onboarding');
    if (overlay && !seen) {
        const show = () => overlay.classList.add('show');
        setTimeout(show, 200); // small delay after init

        const close = () => {
            overlay.classList.remove('show');
            localStorage.setItem('themeOnboardingSeen', '1');
        };
        const choose = (theme) => {
            showThemeMorph(theme);
            applyTheme(theme);
            updateThemeSegmentActive();
            close();
        };
        const btnCool = document.getElementById('onboard-choose-cool');
        const btnCute = document.getElementById('onboard-choose-cute');
        const btnSkip = document.getElementById('onboard-skip');
        if (btnCool) btnCool.addEventListener('click', () => choose('cool'));
        if (btnCute) btnCute.addEventListener('click', () => choose('cute'));
        if (btnSkip) btnSkip.addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once: true });
    }
}
