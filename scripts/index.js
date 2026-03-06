const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLessons(data.data))
};

const loadWords = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) =>  {
            removeActive();
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);
            clickedBtn.classList.add("btn-active");
            displayLevelWords(data.data)
        });
            
};

const removeActive=() => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn => {
        btn.classList.remove("btn-active");
    });
}

const displayLevelWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `<div class="text-center col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
`;
        
    }

    words.forEach(word => {
        console.log(word);
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `<div class="bg-white rounded-xl shadow-sm py-20 px-5 text-center space-y-4">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যাচ্ছে না"}</h2>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <div class="font-medium text-2xl font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যাচ্ছে না"}/${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যাচ্ছে না"}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>`
        wordContainer.appendChild(wordDiv);

    })
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (const lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        `
        levelContainer.appendChild(btnDiv);
    }
}
loadLessons();