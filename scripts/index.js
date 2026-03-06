const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLessons(data.data))
};

const loadWords = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLevelWords(data.data))
}

const displayLevelWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach(word => {
        console.log(word);
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `<div class="bg-white rounded-xl shadow-sm py-20 px-5 text-center space-y-4">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <div class="font-medium text-2xl font-bangla">${word.meaning}/${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>`
        wordContainer.appendChild(wordDiv);

    })
}

const displayLessons =(lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for(const lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-circle-question"></i>Lesson ${lesson.level_no}  </button>
        `
        levelContainer.appendChild(btnDiv);
    }
}
loadLessons();