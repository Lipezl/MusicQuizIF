let cont = document.querySelector('#container');
let subtitle = document.querySelector('#subtitle');
let cadastrosArray = [];


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
            correct_score: 0
        };

        let storedCadastros = localStorage.getItem("cadastrosArray");
        if (storedCadastros) {
            cadastrosArray = JSON.parse(storedCadastros);
        }

        cadastrosArray.push(cadastro);
        localStorage.setItem("cadastrosArray", JSON.stringify(cadastrosArray));
        
        document.querySelector('#formCadastro').reset();
        mostrarGeneros();
    });
});

document.querySelector('#ranking').addEventListener('click', () => {
    let storedCadastros = localStorage.getItem("cadastrosArray");
    subtitle.innerHTML = 'Ranking';
    if (storedCadastros) {
        let cadastrosArray = JSON.parse(storedCadastros);
        cadastrosArray.sort((a, b) => b.correct_score - a.correct_score);
        let html = ''; // Inicialize a variável html vazia

        cadastrosArray.forEach((ranking) => {
            html += ` 
            <p>Name: ${ranking.name} <br>
            Class: ${ranking.sala}<br>
            Correct Score: ${ranking.correct_score}<br>
            <hr>
            `;
        });

        cont.innerHTML = '';
        cont.innerHTML += `<div class="rank">${html}</div>`; 
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
        "Eletronic",
        "Rock"
    ];

    let botoesGeneros = generos().map(genero => `
        <button id="${genero}" class="btn btn-primary m-2 col-4">${genero}</button>
    `).join('');

    subtitle.innerHTML = 'Choose a musical genre';
    cont.innerHTML = `
        <div class="generos">
            ${botoesGeneros}
        </div>
    `;

    // Adicionar event listeners para cada gênero
    document.querySelector('#Pop').addEventListener('click', () => {
        mostrarMusicasPop();
    });

    document.querySelector('#Trap').addEventListener('click', () => {
        mostrarMusicasTrap();
    });

    document.querySelector('#Eletronic').addEventListener('click', () => {
        alert('Você escolheu o gênero Eletronic');
    });

    document.querySelector('#Rock').addEventListener('click', () => {
        mostrarMusicaRock();
    });
}

function mostrarMusicasPop() {
    let musicas_pop = () => [
        {
            musica: 'musicas/Pop/shakeItOff.mp3',
            alternativas: ['Taylor Swift', 'Ariana Grande', 'Katy Perry', 'Selena Gomez'],
            correta: 'Taylor Swift'
        },
        {
            musica: 'musicas/Pop/babyJustinBieber.mp3',
            alternativas: ['Drake', 'Justin Bieber', 'Ed Sheeran', 'Wiz Khalifa'],
            correta: 'Justin Bieber'
        },
        {
            musica: 'musicas/Pop/roarKatyPerry.mp3',
            alternativas: ['Katy Perry', 'Adele', 'Lady Gaga', 'Beyoncé'],
            correta: 'Katy Perry'
        },
        {
            musica: 'musicas/Pop/diamondsRihanna.mp3',
            alternativas:  ['Rihanna', 'Ariana Grande', 'Selena Gomez', 'Taylor Swift'],
            correta: 'Rihanna'
        },
        {
            musica: 'musicas/Pop/uptownFunk.mp3',
            alternativas:  ['Ed Sheeran', 'Justin Bieber', 'Bruno Mars', 'The Weeknd'],
            correta:  'Bruno Mars'
        },
        {
            musica: 'musicas/Pop/sugarMaroon5.mp3',
            alternativas: ['Akon', 'Bruno Mars', 'Ed Sheeran', 'Maroon 5'],
            correta: 'Maroon 5'
        },
        {
            musica: 'musicas/Pop/congratulationsPostMalone.mp3',
            alternativas:  ['Justin Bieber', 'Post Malone', 'Drake', 'Ariana Grande'],
            correta: 'Post Malone'
        },
        {
            musica: 'musicas/Pop/sideToSideAriana.mp3',
            alternativas: ['Cardi B', 'Katy Perry', 'Ariana Grande', 'Rihanna'],
            correta: 'Ariana Grande'
        },
        {
            musica: 'musicas/Pop/countingStarsOneRepublic.mp3',
            alternativas: ['OneRepublic', 'The Weeknd', 'Ed Sheeran', 'One Direction'],
            correta: 'OneRepublic'
        },
        {
            musica: 'musicas/Pop/wakaWakaShakira.mp3',
            alternativas: ['Jennifer Lopez', 'Shakira', 'Beyonce', 'Rihanna'],
            correta: 'Shakira'
        },
        {
            musica: 'musicas/Pop/iGottaFeeling.mp3',
            alternativas: ['David Guetta', 'LMFAO', 'Flo Rida', 'Black Eyed Peas'],
            correta: 'Black Eyed Peas'
        },
        {
            musica: 'musicas/Pop/oneKissDuaLipa.mp3',
            alternativas: ['Calvin Harris', 'Dua Lipa', 'Ellie Goulding', 'Rita Ora'],
            correta: 'Dua Lipa'
        },
        {
            musica: 'musicas/Pop/adventureColdplay.mp3',
            alternativas: ['Maroon 5', 'MAGIC!', 'Coldplay', 'Imagine Dragons'],
            correta: 'Coldplay'
        },
        {
            musica: 'musicas/Pop/justGivePink.mp3',
            alternativas: ['Kelly Clarkson', 'Alicia Keys', 'Pink', 'Lady Gaga'],
            correta: 'Pink'
        },
        {
            musica: 'musicas/Pop/theHills.mp3',
            alternativas: ['The Weeknd', 'Drake', 'Khalid', 'Post Malone'],
            correta: 'The Weeknd'
        }
    ];

    mostrarMusica(musicas_pop(), 0);
}

function mostrarMusicasTrap() {
    let musicas_rap = () => [
        {
            musica: 'musicas/Rap/godsplanDrake.mp3',
            alternativas: ['Kanye West', 'Kendrick Lamar', 'Drake', 'Travis Scott'],
            correta: 'Drake'
        },
        {
            musica: 'musicas/Rap/goosebumpsTravisScostt.mp3',
            alternativas: ['Travis Scott','Playboi Carti','21 Savage', 'Future'],
            correta:'Travis Scott'
        },
        {
            musica: 'musicas/Rap/heartlessKanyeWest.mp3',
            alternativas:['The Weekend','Frank Ocean','Kanye West','Ty Dolla Sign'],
            correta: 'Kanye West'
        },
        {
            musica: 'musicas/Rap/inDaClub50Cent.mp3',
            alternativas: ['Dr. Dre', '50 Cent', 'Pop Smoke', 'Notorious BIG'],
            correta: '50 Cent'
        },
        {
            musica: 'musicas/Rap/loveYourselfEminem.mp3',
            alternativas:  ['Eminem', 'Kanye West', 'Drake', 'Travis Scott'],
            correta: 'Eminem'
        },
        {
            musica: 'musicas/Rap/humbleKendrick.mp3',
            alternativas: ['50 Cent', 'Kendrick Lamar', 'Jay Z', 'Drake'],
            correta: 'Kendrick Lamar'
        },
        {
            musica: 'musicas/Rap/rockstarPostMalone.mp3',
            alternativas: ['Roddy Ricch', 'Lil Baby', 'Lil Wayne',  'Post Malone'],
            correta: 'Post Malone'
        },
        {
            musica: 'musicas/Rap/crankThatSouljaBoy.mp3',
            alternativas: ['Soulja Boy', 'Lil Wayne', '50 Cent', 'Eminem'],
            correta: 'Soulja Boy'
        },
        {
            musica: 'musicas/Rap/theBoxRoddy.mp3',
            alternativas: ['Gunna','Roddy Ricch', 'Lil Baby', 'Lil Wayne'],
            correta: 'Roddy Ricch'
        },
        {
            musica: 'musicas/Rap/ransomLilTecca.mp3',
            alternativas:  ['Lil Tecca', 'Lil Baby', 'Lil Wayne', 'Lil Durk'],
            correta: 'Lil Tecca'
        },
        {
            musica: 'musicas/Rap/allMyLife.mp3',
            alternativas: ['J. Cole', 'Lil Durk', 'Lil Uzi Vert', 'Young Thug'],
            correta: 'Lil Durk'
        },
        {
            musica: 'musicas/Rap/noRuleJCole.mp3',
            alternativas: ['Drake', 'Travis Scott', 'Lil Wayne', 'J. Cole'],
            correta: 'J. Cole'
        },
        {
            musica: 'musicas/Rap/maskOff.mp3',
            alternativas: ['Gunna', '21 Savage', 'Future', 'A$AP ROCKY'],
            correta: 'Future'
        },
        {
            musica: 'musicas/Rap/bankAccount21.mp3',
            alternativas: ['21 Savage', 'Future', 'Gunna', 'Lil Baby'],
            correta: '21 Savage'
        },
        {
            musica: 'musicas/Rap/shootaCarti.mp3',
            alternativas: ['Playboi Carti', 'Trippie Red', 'NLE Choppa', 'Roddy Ricch'],
            correta:  'Playboi Carti'
        }
        
    ];

    mostrarMusica(musicas_rap(), 0);
}

function mostrarMusicaRock (){
    let musicas_rock = ()=>[
        {
            musica:  'musicas/Rock/comeAsYouAre.mp3',
            alternativas: ['Red', 'Pearl Jam', 'Foo Fighters', 'Nirvana'],
            correta: 'Nirvana'
        },
        {
            musica: 'musicas/Rock/welcomeToTheJungle.mp3',
            alternativas: ['AC/DC', "Guns N' Roses", 'Queen', 'Led Ze'],
            correta: "Guns N' Roses"
        },
        {
            musica: 'musicas/Rock/demonsImagineDragons.mp3',
            alternativas: ['Coldplay', 'Twenty One Pilots', 'Imagine Dragons', 'The Weeknd'],
            correta: 'Imagine Dragons'
        },
        {
            musica: 'musicas/Rock/weWillRockYou.mp3',
            alternativas: ['Queen',  'AC/DC', "Guns N' Roses", 'Nirvana'],
            correta:  'Queen'
        },
        {
            musica: 'musicas/Rock/californication.mp3',
            alternativas:  ['Pearl Jam', 'Foo Fighters', 'Nirvana', 'Red Hot Chili Peppers'],
            correta: 'Red Hot Chili Peppers'
        },
        {
            musica: 'musicas/Rock/numbLinkinPark.mp3',
            alternativas: ['Twenty One Pilots',  'Linkin Park', 'The Weeknd', 'Imagine Dragons'],
            correta: 'Linkin Park'
        }
    ]
    mostrarMusica(musicas_rock(), 0)
}

function mostrarMusica(musicas, index) {
    let storedCadastros = localStorage.getItem("cadastrosArray");
    let cadastrosArray = localStorage ? JSON.parse(storedCadastros) : [];

    let jogadorAtual = cadastrosArray[cadastrosArray.length - 1];
    
    if (index >= musicas.length) {
        subtitle.innerHTML = 'Result';
        cont.innerHTML = `
        <div class="final_score">
            
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
                mostrarMusica(musicas, index + 1);
            })
        });
    });
}