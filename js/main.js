let cont = document.querySelector('#container');
let subtitle = document.querySelector('#subtitle');
let cadastrosArray = [];
let artistaNome = false;
let musicaNome = false;
let rank = "";
let pop, rock, trap = false;

document.querySelector('#play').addEventListener('click', (event) => {
    event.preventDefault();

    subtitle.innerHTML = 'Register';
    cont.innerHTML = `
    <form id="formCadastro">
        <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input class="form-control" id="nome" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Class</label>
            <input class="form-control" id="sala" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `;

    document.querySelector('#formCadastro').addEventListener('submit', (e) => {
        e.preventDefault();

        let name = document.querySelector('#nome').value;
        let sala = document.querySelector('#sala').value;

        let cadastro = {
            name: name,
            sala: sala,
            correct_score: 0,
            genre: ''
        };

        let storedCadastros = localStorage.getItem("cadastrosArray");
        if (storedCadastros) {
            cadastrosArray = JSON.parse(storedCadastros);
        }

        cadastrosArray.push(cadastro);
        localStorage.setItem("cadastrosArray", JSON.stringify(cadastrosArray));
        
        document.querySelector('#formCadastro').reset();
        subtitle.innerHTML = 'Which mode do you want to play?';
        cont.innerHTML =  `
            <div class="mode">
                <button id="songName" class="btn btn-primary m-2 col-4">Guess the song</button>
                <button id="artistName" class="btn btn-primary m-2 col-4">Guess the artist's</button>
            </div>
        `;
        
        artistaNome = document.querySelector('#artistName').addEventListener('click', () => {
            artistaNome = true;
            mostrarGeneros();
        });
        document.querySelector('#songName').addEventListener('click', () =>{
            musicaNome = true;
            mostrarGeneros();
        });
    });
});


document.querySelector('#ranking').addEventListener('click', () => {
    let storedCadastros = localStorage.getItem("cadastrosArray");
    subtitle.innerHTML = 'Ranking';
    html = '';
    if (storedCadastros) {
        let cadastrosArray = JSON.parse(storedCadastros);
        cadastrosArray.sort((a, b) => b.correct_score - a.correct_score);
        cadastrosArray.forEach((ranking, i) => {
            html += ` 
            <div class="ranking-item">
                <div class="ranking-position"><b>${i+1}°</b></div>
                <div class="ranking-details">
                    <p><strong>Name:</strong> ${ranking.name}</p>
                    <p><strong>Class:</strong> ${ranking.sala}</p>
                    <p><strong>Mode:</strong> ${artistaNome ? 'Artist Name' : 'Song Name'}</p>
                    <p><strong>Correct Score:</strong> ${ranking.correct_score}</p>
                    <p><strong>Genre:</strong> ${ranking.genre}</p>
                </div>
            </div>
            <hr>`;
        });
        cont.innerHTML = '';
        cont.innerHTML += `<div class="ranking">${html}</div>`; 
        
    } else {
        cont.innerHTML = `
        <p>Nenhum cadastro encontrado.</p>
        `;
    }
});


function mostrarGeneros() {
    let generos = () => [
        "Pop",
        "Trap",
        "Rock"
    ];

    let botoesGeneros = generos().map(genero => `
        <button id="${genero}" class="btn btn-primary container text-center mt-5 col-4">${genero}</button>
    `).join('');

    subtitle.innerHTML = 'Choose a musical genre';
    cont.innerHTML = `
        <div class="generos">
            ${botoesGeneros}
        </div>
    `;

    document.querySelector('#Pop').addEventListener('click', () => {
        cadastrosArray[cadastrosArray.length - 1].genre = "Pop";
        localStorage.setItem("cadastrosArray", JSON.stringify(cadastrosArray));
        mostrarMusicasPop();
    });
    
    document.querySelector('#Trap').addEventListener('click', () => {
        cadastrosArray[cadastrosArray.length - 1].genre = "Trap";
        localStorage.setItem("cadastrosArray", JSON.stringify(cadastrosArray));
        mostrarMusicasTrap();
    });
    
    document.querySelector('#Rock').addEventListener('click', () => {
        cadastrosArray[cadastrosArray.length - 1].genre = "Rock";
        localStorage.setItem("cadastrosArray", JSON.stringify(cadastrosArray));
        mostrarMusicaRock();
    });    
}

async function mostrarMusicasPop() {

    try {
        const response = await axios.get('data/musicasPop.json');
        const musicas_pop = response.data;
        if (artistaNome){
            mostrarMusicaArtista(musicas_pop, 0);
        } else{
            mostrarMusicaNome(musicas_pop, 0);
        }

    } catch (error) {
        console.error(error.message);
        cont.innerHTML = '<p>Erro ao carregar as músicas Pop.</p>';
    }
}


async function mostrarMusicasTrap() {
    ranking.genre = "Trap";
    try {
        const  response = await axios.get('data/musicasRap.json');
        const musicas_trap = response.data;
        if (artistaNome){
            mostrarMusicaArtista(musicas_trap, 0);
        }else{
            mostrarMusicaNome(musicas_trap, 0);
        }
    } catch (error){
        console.error(error.message);
        cont.innerHTML = '<p>Erro ao carregar as músicas Trap.</p>';
    }
}

async function mostrarMusicaRock (){
    ranking.genre = "Rock";
    try {
        const response = await axios.get('data/musicasRock.json');
        const musicas_rock = response.data;
        if (artistaNome){
            mostrarMusicaArtista(musicas_rock, 0);
        } else {
            mostrarMusicaNome(musicas_rock, 0)
        }
    } catch(error){
        console.error(error.message);
        cont.innerHTML = '<p>Erro ao carregar as músicas Rock.</p>';
    }
}

function mostrarMusicaArtista(musicas, index) {
    let storedCadastros = localStorage.getItem("cadastrosArray");
    let cadastrosArray = localStorage ? JSON.parse(storedCadastros) : [];

    let jogadorAtual = cadastrosArray[cadastrosArray.length - 1];
    if (index >= musicas.length) {
        subtitle.innerHTML = 'Result';
        cadastrosArray.sort((a, b) => b.correct_score - a.correct_score);
        cadastrosArray.slice(0, 5).forEach((ranking, i) => {
            rank += `
            <p>${i+1}º: ${ranking.name} - Pontuação: ${ranking.correct_score}</p>
            `;
        });
        cont.innerHTML = `
        <div class="final_score">
            <h3>Thank you very much for playing the quiz!</h3>
            <p>Your Score was: <b>${jogadorAtual.correct_score}/15</b></p>
            <div class="top5">
                ${rank}
            </div>
        </div>
        `;
    }
    
    let musicaSelecionada = musicas[index];

    subtitle.innerHTML = `Who is the artist of this song?`;
    cont.innerHTML = `
        <div class="score">
        <h4>Question ${index+1}/15</h4>
        </div>
        <audio controls>
            <source src="${musicaSelecionada.musica}" type="audio/mp3">
            Seu navegador não suporta o elemento de áudio.
        </audio>
        <div class="alternativas">
        <div class="artistas">
        ${musicaSelecionada.alternativas.map(artista => `
        <button class="btn btn-secondary m-2 col-4">${artista}</button>
        `).join('')}</br>
        </div>
            <button type="button" class="btn btn-secondary" id="submit" disabled>Submit</button>
        </div>

    `;

    document.querySelectorAll('.alternativas button').forEach(button => {
        button.addEventListener('click', (event) => {
            document.querySelectorAll('.alternativas button').forEach(btn => btn.disabled = true);
            let submit = document.querySelector('#submit');
            submit.disabled = false;
            submit.style.background = 'blue';
            if (event.target.textContent === musicaSelecionada.correta) {
                button.style.background = 'green';
                cont.innerHTML += `
                <div class="score neon" id="correct">
                    <h3>Correct!</h3>
                </div>
                `;
                jogadorAtual.correct_score += 1;
            } else {
                button.style.background = 'red';
                cont.innerHTML += `
                <div class="score" id="incorrect">
                    <h3>Incorrect! The correct answer was: ${musicaSelecionada.correta}</h3>
                </div>
                `;
            }

            cadastrosArray[cadastrosArray.length - 1] = jogadorAtual;
            localStorage.setItem("cadastrosArray", JSON.stringify(cadastrosArray));

            document.querySelector('#submit').addEventListener('click', (event)=>{
                event.preventDefault();
                mostrarMusicaArtista(musicas, index + 1);
            })
        });
    });
}

function mostrarMusicaNome(musicas, index) {
    let storedCadastros = localStorage.getItem("cadastrosArray");
    let cadastrosArray = localStorage ? JSON.parse(storedCadastros) : [];
    let jogadorAtual = cadastrosArray[cadastrosArray.length - 1];

    if (index >= musicas.length) {
        subtitle.innerHTML = '';
        subtitle.innerHTML = 'Result';
        cadastrosArray.sort((a, b) => b.correct_score - a.correct_score);
        cadastrosArray.slice(0, 5).forEach((ranking, i) => {
            rank += `
            <p>${i+1}º: ${ranking.name} - Pontuação: ${ranking.correct_score}</p>
            `;
        });
        cont.innerHTML = `
        <div class="final_score">
            <h3>Thank you very much for playing the quiz!</h3>
            <p>Your Score was: <b>${jogadorAtual.correct_score}/15</b></p>
            <div class="top5">
                ${rank}
            </div>
        </div>
        `;
    }
    
    let musicaSelecionada = musicas[index];

    subtitle.innerHTML = `what is the name of this song?`;
    cont.innerHTML = `
        <div class="score">
        <h4>Question ${index+1}/15</h4>
        </div>
        <audio controls>
            <source src="${musicaSelecionada.musica}" type="audio/mp3">
            Seu navegador não suporta o elemento de áudio.
        </audio>
        <div class="alternativas">
        <div class="nomes">
        ${musicaSelecionada.nomeMusicaAlternativas.map(nomes => `
        <button class="btn btn-secondary m-2 col-4">${nomes}</button>
        `).join('')}</br>
        </div>
            <button type="button" class="btn btn-secondary" id="submit" disabled>Submit</button>
        </div>

    `;

    document.querySelectorAll('.alternativas button').forEach(button => {
        button.addEventListener('click', (event) => {
            document.querySelectorAll('.alternativas button').forEach(btn => btn.disabled = true);
            let submit = document.querySelector('#submit');
            submit.disabled = false;
            submit.style.background = 'blue';
            if (event.target.textContent === musicaSelecionada.nomeMusicaCorreta) {
                button.style.background = 'green';
                cont.innerHTML += `
                <div class="score neon" id="correct">
                    <h3>Correct!</h3>
                </div>
                `;
                jogadorAtual.correct_score += 1;
            } else {
                button.style.background = 'red';
                cont.innerHTML += `
                <div class="score" id="incorrect">
                    <h3>Incorrect! The correct answer was: ${musicaSelecionada.nomeMusicaCorreta}</h3>
                </div>
                `;
            }

            cadastrosArray[cadastrosArray.length - 1] = jogadorAtual;
            localStorage.setItem("cadastrosArray", JSON.stringify(cadastrosArray));

            document.querySelector('#submit').addEventListener('click', (event)=>{
                event.preventDefault();
                mostrarMusicaNome(musicas, index + 1);
            })
        });
    });
}
