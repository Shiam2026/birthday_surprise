// URL থেকে নাম ও ছবি চেক করা
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const photo = urlParams.get('photo');

    if (name) {
        startSurprise(name, photo);
    } else {
        document.getElementById('creator-screen').classList.add('active');
    }
};

// ১. লিঙ্ক জেনারেটর
function generateLink() {
    const nameInput = document.getElementById('name-input').value.trim();
    if (!nameInput) {
        alert("Please enter a name first! 🚀");
        return;
    }
    const baseUrl = window.location.href.split('?')[0];
    let finalLink = `${baseUrl}?name=${encodeURIComponent(nameInput)}`;

    document.getElementById('link-result').classList.remove('hidden');
    const linkBox = document.getElementById('share-link');
    linkBox.value = finalLink;
    linkBox.scrollIntoView({ behavior: 'smooth' });
}

function copyLink() {
    const copyText = document.getElementById("share-link");
    copyText.select();
    document.execCommand("copy"); // Mobile safe
    navigator.clipboard.writeText(copyText.value);
    alert("Link Copied! Now send it to the Birthday Boy! 🎉");
}

// ২. সারপ্রাইজ শুরু
function startSurprise(name, photoUrl) {
    const nameElements = document.querySelectorAll('.dynamic-name');
    nameElements.forEach(el => el.innerText = name);

    if (photoUrl) {
        document.getElementById('user-photo-display').src = photoUrl;
    }
    nextScreen('screen-welcome');
}

// ৩. স্ক্রিন পরিবর্তন
function nextScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    // পেজের উপরে স্ক্রল করা
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ৪. এনভেলপ খোলা
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    if (envelope.classList.contains('open')) return;

    envelope.classList.add('open');
    setTimeout(() => {
        nextScreen('screen-letter');
    }, 1500);
}

// ৫. কেক কাটা
function cutCake() {
    const cakeContainer = document.querySelector('.cake-container');
    const msg = document.getElementById('cake-msg');
    const nextBtn = document.getElementById('cake-next');

    if (cakeContainer.classList.contains('cut')) return;

    cakeContainer.classList.add('cut');
    
    setTimeout(() => {
        msg.innerHTML = "Yayy! Happy Birthday! 🍰✨";
        // কালার চেঞ্জ: নীল
        msg.style.color = "#1e88e5";
        nextBtn.classList.remove('hidden');
    }, 1000);
}

// ৬. মিউজিক প্লেয়ার
function toggleMusic() {
    const songAudio = document.getElementById('bg-music');     // মাঝের গান
    const bgAudio = document.getElementById('global-bg-music'); // গ্লোবাল মিউজিক
    const btn = document.querySelector('.play-btn');

    if (songAudio.paused) {
        // মাঝের গান চালু করলে
        songAudio.play();
        btn.innerHTML = "⏸️ Pause Music";
        
        // গ্লোবাল মিউজিক পজ করে দেওয়া
        if (bgAudio) {
            bgAudio.pause();
        }
    } else {
        // মাঝের গান বন্ধ করলে
        songAudio.pause();
        btn.innerHTML = "▶️ Play Music";
        
        // গ্লোবাল মিউজিক আবার চালু করে দেওয়া
        if (bgAudio) {
            bgAudio.play();
        }
    }
}

// ========================
// 7. FINAL SCREEN ACTIONS
// ========================

// ১. Experience Again বাটন (সবকিছু রিসেট করে শুরুতে নেওয়া)
// ১. Experience Again বাটন (সবকিছু রিসেট করে শুরুতে নেওয়া)
function restartExperience() {
    // এনভেলপ বন্ধ করা
    const envelope = document.getElementById('envelope');
    envelope.classList.remove('open');
    
    // কেক রিসেট করা
    const cakeContainer = document.querySelector('.cake-container');
    cakeContainer.classList.remove('cut');
    document.getElementById('cake-msg').innerHTML = "Tap the cake to cut it! ✂️";
    document.getElementById('cake-msg').style.color = "#546e7a"; 
    document.getElementById('cake-next').classList.add('hidden');

    // --- মিউজিক বন্ধ ও রিসেট করা (আপডেট করা হয়েছে) ---
    const songAudio = document.getElementById('bg-music');
    const bgAudio = document.getElementById('global-bg-music');
    const btn = document.querySelector('.play-btn');
    
    songAudio.pause();
    songAudio.currentTime = 0; // মাঝের গান শুরুতে নেওয়া
    btn.innerHTML = "▶️ Play Music";

    // গ্লোবাল মিউজিক আবার প্রথম থেকে চালু করা
    if (bgAudio) {
        bgAudio.currentTime = 0;
        bgAudio.play();
    }
    // ----------------------------------------------

    // কার্ডগুলো ফ্লিপ ব্যাক করা
    document.querySelectorAll('.flip-card').forEach(card => {
        card.classList.remove('flipped');
    });

    // ওয়েলকাম স্ক্রিনে ফিরে যাওয়া
    nextScreen('screen-welcome');
}
// ২. Send Loves বাটন (ইমোজি ভাসানো)
function sendLoves() {
    const emojis = ['❤️', '💖', '💙', '💚', '💛', '💜', '🧡', '💝', '🎉', '🎁', '🎈', '✨'];
    const container = document.body;

    // ৩০টি ইমোজি তৈরি হবে
    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement('div');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.classList.add('floating-emoji');
        
        // র‍্যান্ডম পজিশন, সাইজ এবং গতি
        emoji.style.left = Math.random() * 100 + 'vw'; // স্ক্রিনের যেকোনো জায়গায়
        emoji.style.fontSize = (Math.random() * 20 + 20) + 'px'; // ছোট-বড় সাইজ
        emoji.style.animationDuration = (Math.random() * 3 + 2) + 's'; // ২ থেকে ৫ সেকেন্ড
        emoji.style.animationDelay = Math.random() + 's'; // একটু আগে-পরে শুরু হবে
        
        container.appendChild(emoji);

        // অ্যানিমেশন শেষে এলিমেন্ট রিমুভ করা (মেমোরি ক্লিন রাখতে)
        setTimeout(() => {
            emoji.remove();
        }, 5000);
    }
}


// এই নতুন ফাংশনটি script.js এর শেষে বা যেকোনো জায়গায় যোগ করুন
function startJourney() {
    const globalAudio = document.getElementById('global-bg-music');
    
    // ব্যাকগ্রাউন্ড মিউজিক চালু করা
    if (globalAudio) {
        globalAudio.volume = 0.5; // ভলিউম ৫০% রাখা হয়েছে (ইচ্ছেমতো বদলাতে পারেন)
        globalAudio.play().catch(error => {
            console.log("Audio play failed: ", error);
        });
    }
    
    // পরের স্ক্রিনে যাওয়া
    nextScreen('screen-envelope');
}

// আগের toggleMusic() ফাংশনটি মুছে এই নতুন কোডটি বসান
function toggleMusic() {
    const songAudio = document.getElementById('bg-music');     // মেইন গান
    const bgAudio = document.getElementById('global-bg-music'); // ব্যাকগ্রাউন্ড মিউজিক
    const btn = document.querySelector('.play-btn');

    if (songAudio.paused) {
        // ১. মেইন গান বাজানো শুরু হলে
        songAudio.play();
        btn.innerHTML = "⏸️ Pause Music";
        
        // ২. ব্যাকগ্রাউন্ড মিউজিক বন্ধ করে দেওয়া
        if (bgAudio) {
            bgAudio.pause();
        }
    } else {
        // গান পজ করলে
        songAudio.pause();
        btn.innerHTML = "▶️ Play Music";
        
        // আপনি চাইলে এখানে ব্যাকগ্রাউন্ড মিউজিক আবার চালু করতে পারেন
        // bgAudio.play(); (এটা অপশনাল, এখন বন্ধই থাকবে)
    }
}