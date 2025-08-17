// ==============================================
// グローバル変数
// ==============================================
let websiteInitialized = false;
const app = {};
let currentTheme = 'cool';
let isMusicSectionActive = false;
let contents = [];
let lastChapterIndexVal = -1;

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

const themeToggle = document.getElementById('theme-checkbox');
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

function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    currentTheme = themeName;
    const stops = themeConfig[themeName].gradientStops;
    svgGradientStops.forEach((stop, index) => {
        stop.style.stopColor = stops[index];
    });

    // About text definitions
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

    if (themeName === 'cute') {
        contents[1] = cuteAbout[0];
        contents[2] = cuteAbout[1];
        contents[3] = cuteAbout[2];
    } else { // cool
        contents[1] = coolAbout[0];
        contents[2] = coolAbout[1];
        contents[3] = coolAbout[2];
    }
    
    lastChapterIndexVal = -1; // Force content refresh
    
    if (websiteInitialized) {
        app.createLayers();
        app.updateOnScroll(window.scrollY);
    }
}

document.querySelector('.theme-switch').addEventListener('click', (e) => {
    const nextTheme = !themeToggle.checked ? 'cute' : 'cool';
    createRipple(e, nextTheme);
});

themeToggle.addEventListener('change', () => {
    applyTheme(themeToggle.checked ? 'cute' : 'cool');
});

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
    themeToggle.checked = savedTheme === 'cute';
    applyTheme(savedTheme);

    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const percentageText = document.getElementById('loading-percentage');
    const interstitialScreen = document.getElementById('interstitial-screen');
    const skipButton = document.getElementById('skip-button');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress++;
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(async () => {
                loadingScreen.classList.add('hidden');
                interstitialScreen.classList.add('visible');
                
                const textEn = document.getElementById('text-en');
                const textJp = document.getElementById('text-jp');
                await typeWriter(textEn, "Link the beat, let it flow.", 80);
                await typeWriter(textJp, "つなげたビートは…もう止まらない。", 120);

                setTimeout(() => {
                    document.querySelectorAll('#text-en span, #text-jp span').forEach((span, index) => {
                        setTimeout(() => span.classList.add('gold-reveal'), index * 25);
                    });
                }, 500);

            }, 500);
        }
    }, 30);

    skipButton.addEventListener('click', () => {
        interstitialScreen.classList.remove('visible');
        setTimeout(() => {
            document.body.classList.add('scrollable');
            initializeWebsite();
        }, 1000);
    });
});

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

// ==============================================
// メインのウェブサイト機能
// ==============================================
function initializeWebsite() {
    websiteInitialized = true;
    
    feTurbulence = document.querySelector('#beat-noise-filter feTurbulence');
    feDisplacementMap = document.querySelector('#beat-noise-filter feDisplacementMap');

    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
            let x = Math.random() * innerWidth;
            let y = Math.random() * innerHeight;
            let dX = (Math.random() - 0.5) * 0.2;
            let dY = (Math.random() - 0.5) * 0.2;
            particlesArray.push(new Particle(x, y, dX, dY, size));
        }
    }
    function animateParticles() { requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight); particlesArray.forEach(p => p.update()); }
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
            item.speedY = item.baseSpeedY * speedMultiplier;
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
    const numLayers = 30;
    const mediaPositions = [
        { baseX: -60, baseY: -60 }, { baseX: 20,  baseY: 40  }, { baseX: 60,  baseY: -60 },
        { baseX: -20, baseY: 0   }, { baseX: -60, baseY: 60  }, { baseX: 65,  baseY: -55 },
        { baseX: -20, baseY: -40 }, { baseX: 25,  baseY: 45  }, { baseX: -55, baseY: 65  },
        { baseX: 60,  baseY: 0   }
    ];
    
    app.createLayers = function() {
        zoomContainer.innerHTML = '';
        layerData = [];
        let mediaPositionIndex = 0;
        const layerTypes = Array(numLayers).fill(0);
        const mediaCount = Math.floor(numLayers / 10); 
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
                if (mediaPositionIndex % 2 === 0) {
                    const img = document.createElement('img');
                    img.src = `https://placehold.co/${Math.round(size)}x${Math.round(size)}/2E3A24/F3F1EC?text=Media+${mediaPositionIndex + 1}`;
                    img.alt = "Media content";
                    img.loading = "lazy";
                    img.onerror = function() { this.src = `https://placehold.co/${Math.round(size)}x${Math.round(size)}/0B0D10/F3F1EC?text=Error`; };
                    layerEl.appendChild(img);
                } else {
                    const vid = document.createElement('video');
                    vid.src = `https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;
                    vid.autoplay = true; vid.muted = true; vid.loop = true; vid.playsInline = true;
                    layerEl.appendChild(vid);
                }
                const position = mediaPositions[mediaPositionIndex % mediaPositions.length];
                baseX = position.baseX;
                baseY = position.baseY;
                mediaPositionIndex++;
            } else {
                if (Math.random() < 0.1) continue;

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

    contents = [
        `<div class="title-wrapper"><h2 class="section-title">ABOUT</h2></div>`,
        `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">ChainFlow——<br>DAO発のキャラクタープロジェクト「クリプトニンジャ」から誕生し、<br>プロデューサー namakel の手で磨き上げられた、<br>AI時代のバーチャルミュージシャン。</p>`,
        `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">ビートで鼓動を打つDJ : コンガ、<br>艶やかな息遣いで夜を染めるVocal : 蛇ノ目、<br>深みと余韻を刻むRap : 岩爺——<br>三つの音が交わる瞬間、<br>都市は揺れ、光が解き放たれる。</p>`,
        `<p class="text-base md:text-lg leading-relaxed" style="font-family: var(--font-family-jp);">変幻する歌声、AIが紡ぐアレンジとメロディ。<br>その重なりが描く未来を、あなたも目撃してほしい。</p>`,
        `<div class="flex flex-col items-center justify-center"><img src="https://placehold.co/400x600/0B0D10/F3F1EC?text=ARTIST" alt="Artist Photo" class="rounded-lg shadow-2xl shadow-amethyst/20" style="border: 2px solid; border-image-slice: 1; max-height: 60vh;" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x600/0B0D10/F3F1EC?text=Error';"><h3 class="mt-6 primary-gradient-text" style="font-family: 'Marcellus', serif; font-size: 1.75rem; letter-spacing: 0.1em;">ChainFlow</h3></div>`,
        `<div class="title-wrapper"><h2 class="section-title">WORKS</h2></div>`,
        `<div class="music-player"><div class="track-info"><img src="https://placehold.co/100x100/1a1a2e/e0e0e0?text=Sakuya" alt="Album Art" class="album-art" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/100x100/1a1a2e/e0e0e0?text=Error';"><div><h3 class="title">Sakuya - 咲耶</h3><p class="artist">トップ曲</p><button class="follow-btn">フォローする</button></div></div><div class="controls"><span class="preview-tag">プレビュー</span><div class="flex items-center gap-4"><button class="control-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg></button><div class="play-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div><button class="control-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg></button></div></div><ul class="tracklist"><li class="track-item"><div class="track-details"><div class="relative w-5 h-5 flex items-center justify-center"><span class="track-number">1</span><svg class="track-play-icon absolute w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></div><div><div class="track-title">カタツムリの燐光に導かれた...</div><div class="track-artist">Sakuya - 咲耶</div></div></div><span class="track-duration">03:19</span></li><li class="track-item"><div class="track-details"><div class="relative w-5 h-5 flex items-center justify-center"><span class="track-number">2</span><svg class="track-play-icon absolute w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></div><div><div class="track-title">死の舞踏</div><div class="track-artist">Sakuya - 咲耶</div></div></div><span class="track-duration">03:18</span></li><li class="track-item"><div class="track-details"><div class="relative w-5 h-5 flex items-center justify-center"><span class="track-number">3</span><svg class="track-play-icon absolute w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></div><div><div class="track-title">動植綵絵</div><div class="track-artist">Sakuya - 咲耶</div></div></div><span class="track-duration">03:07</span></li><li class="track-item"><div class="track-details"><div class="relative w-5 h-5 flex items-center justify-center"><span class="track-number">4</span><svg class="track-play-icon absolute w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></div><div><div class="track-title">記憶の固執</div><div class="track-artist">Sakuya - 咲耶</div></div></div><span class="track-duration">03:55</span></li></ul><div class="cta-banner"><div class="icon">♫</div><p>全楽曲をフルで聴きたい方は</p><button class="cta-button">Sunoで無料配信中</button></div></div>`,
        `<div class="title-wrapper"><h2 class="section-title">LINKS</h2></div>`,
        `<div class="flex justify-center"><div class="links-grid"><a href="#" class="link-button"><svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6Z"/></svg><span>SUNO</span></a><a href="#" class="link-button"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4.5 14.5c-.2.3-.6.4-.9.2c-2.2-1.3-5-1.6-8.3-0.9c-.4 0.1-.7-.2-.8-.6c-.1-.4.2-.7.6-.8c3.7-0.8 6.8-0.4 9.3 1.1c.3.2.4.6.2.9zm1.2-2.7c-.3.4-.8.5-1.1.2c-2.5-1.5-6.3-2-9.8-1.1c-.5.1-.9-.2-1-.7c-.1-.5.2-.9.7-1c4-1 8.2-0.5 11.2 1.4c.4.2.5.8.2 1.2zm.1-2.9c-3-1.8-8-2.3-11.2-1.2c-.6.2-1.2-.2-1.4-.8c-.2-.6.2-1.2.8-1.4c3.8-1.2 9.4-0.6 13 1.5c.5.3.7.9.4 1.4c-.3.5-.9.7-1.4.4z"/></svg><span>SPOTIFY</span></a><a href="#" class="link-button"><svg viewBox="0 0 24 24"><path d="M15.21 2.3a1 1 0 0 0-1.42 0l-8 8a1 1 0 0 0 0 1.41l8 8a1 1 0 0 0 1.41-1.41L8.33 12l6.88-6.88a1 1 0 0 0 0-1.41Z" transform="scale(0.8) translate(3, 2)"/><path d="M17.65 3.82A9.82 9.82 0 0 0 12 2a10 10 0 1 0 10 10a9.82 9.82 0 0 0-1.82-5.65a1 1 0 0 0-1.53.85a7.83 7.83 0 0 1 1.2 4.3A8 8 0 1 1 12 4a7.83 7.83 0 0 1 4.3 1.2a1 1 0 0 0 .85-1.53Z"/></svg><span>APPLE MUSIC</span></a><a href="#" class="link-button"><svg viewBox="0 0 24 24"><path d="M21.58 7.19A2.19 2.19 0 0 0 20 5.5H4a2.19 2.19 0 0 0-1.58 1.69A24.44 24.44 0 0 0 2 12a24.44 24.44 0 0 0 .42 4.81A2.19 2.19 0 0 0 4 18.5h16a2.19 2.19 0 0 0 1.58-1.69A24.44 24.44 0 0 0 22 12a24.44 24.44 0 0 0-.42-4.81Z"/><path d="m10 14.5l5-2.5l-5-2.5Z"/></svg><span>YOUTUBE</span></a></div></div>`
    ];

    const scrollContainer = document.getElementById('scroll-container');
    const textContent = document.getElementById('text-content');
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');
    const bottomFade = document.getElementById('bottom-fade');
    const endingCurtain = document.getElementById('ending-curtain');
    
    const menuButton = document.querySelector('.menu-container');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    const scrollButton = document.getElementById('scroll-button');
    const scrollButtonIcon = document.getElementById('scroll-button-icon');
    const downArrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#primary-gradient-svg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m-7-7l7 7 7-7"/></svg>`;
    const upArrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#primary-gradient-svg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
    
    totalPagesEl.textContent = `/ ${String(contents.length + 1).padStart(2, '0')}`;
    
    const chapterHeight = window.innerHeight * 1.5;
    scrollContainer.style.height = `${chapterHeight * (contents.length + 1.5)}px`;
    document.body.style.height = scrollContainer.style.height;

    const sectionStartIndexes = [0, 5, 7, contents.length];

    lastChapterIndexVal = -1;
    let ticking = false;
    let mouse = { x: 0, y: 0 };

    app.updateOnScroll = function(scrollY) {
        layerData.forEach(item => {
            const { el, depth, baseX, baseY, rotationSpeedX, rotationSpeedY } = item;
            const totalDepth = numLayers * 100;
            let adjustedDepth = (depth - scrollY) % totalDepth;
            if (adjustedDepth < 0) adjustedDepth += totalDepth;
            const relativeZ = adjustedDepth;
            const scale = 1 / (relativeZ * 0.005 + 1);
            const opacity = Math.max(0, 1 - (relativeZ / (numLayers * 50)));
            const parallaxX = mouse.x * (depth / 100);
            const parallaxY = mouse.y * (depth / 100);
            const x = baseX * scale; 
            const y = baseY * scale;
            const rotX = scrollY * rotationSpeedX * 0.1; 
            const rotY = scrollY * rotationSpeedY * 0.1;
            el.style.transform = `translateX(calc(-50% + ${parallaxX}px)) translateY(calc(-50% + ${parallaxY}px)) translate3d(${x}vw, ${y}vh, 0) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            el.style.opacity = opacity;
        });

        // [MODIFIED] Use a more robust chapter index calculation for display and logic
        const currentChapterIndex = Math.floor(scrollY / chapterHeight);
        const visualChapterIndex = Math.floor(scrollY / chapterHeight);
        
        currentPageEl.textContent = String(Math.min(contents.length + 1, visualChapterIndex + 1)).padStart(2, '0');
        
        isMusicSectionActive = (visualChapterIndex === 6);

        const isEffectivelyLastPage = visualChapterIndex >= contents.length;
        scrollButtonIcon.innerHTML = isEffectivelyLastPage ? upArrowSVG : downArrowSVG;
        scrollButton.classList.add('visible');
        
        bottomFade.classList.toggle('visible', visualChapterIndex === contents.length - 1);
        
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
        }

        // [MODIFIED] Animation logic with dead zones to prevent content overlap
        const progressInChapter = (scrollY % chapterHeight) / chapterHeight;
        let opacity = 0, scale = 0.5;

        if (progressInChapter > 0.1 && progressInChapter <= 0.5) {
            // Phase 1: Fade in and scale from 0.5x to 1.0x
            const t = (progressInChapter - 0.1) / 0.4; // t goes from 0 to 1
            opacity = t;
            scale = 0.5 + t * 0.5;
        } else if (progressInChapter > 0.5 && progressInChapter < 0.9) {
            // Phase 2: Scale from 1.0x to 3.0x and fade out
            const t = (progressInChapter - 0.5) / 0.4; // t goes from 0 to 1
            opacity = 1 - t;
            scale = 1.0 + t * 2.0;
        }

        // Clamp values
        opacity = Math.max(0, Math.min(1, opacity));
        scale = Math.max(0, scale);

        textContent.style.opacity = opacity;
        textContent.style.transform = `translate(-50%, -50%) scale(${scale})`;
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

    menuButton.addEventListener('click', () => { menuOverlay.classList.add('visible'); document.body.classList.add('menu-open'); });
    closeMenuBtn.addEventListener('click', () => { menuOverlay.classList.remove('visible'); document.body.classList.remove('menu-open'); });
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const chapterIndex = parseInt(e.target.dataset.chapter, 10);
            // [MODIFIED] Scroll to the middle of the chapter for peak visibility
            const targetScroll = chapterIndex * chapterHeight + (chapterHeight / 2);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            setTimeout(() => {
                menuOverlay.classList.remove('visible');
                document.body.classList.remove('menu-open');
            }, 400);
        });
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
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        canvas.width = innerWidth; canvas.height = innerHeight;
        initParticles();
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            app.createLayers();
            document.body.style.height = `${chapterHeight * (contents.length + 1.5)}px`;
            scrollContainer.style.height = document.body.style.height;
            app.updateOnScroll(window.scrollY);
        }, 500);
    });

    app.createLayers();
    app.updateOnScroll(window.scrollY);
}
