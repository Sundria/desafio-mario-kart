const jogadores = [
    { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 },
    { NOME: "Luigi", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0 },
    { NOME: "Bowser", VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
    { NOME: "Peach", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0 },
    { NOME: "Yoshi", VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0 },
    { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 }
]

// const player1 = {
//     NOME: "Mario",
//     VELOCIDADE: 4,
//     MANOBRABILIDADE: 3,
//     PODER: 3,
//     PONTOS: 0,
// };

// const player2 = {
//     NOME: "Luigi",
//     VELOCIDADE: 3,
//     MANOBRABILIDADE: 4,
//     PODER: 4,
//     PONTOS: 0,
// };

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function logRoll(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function quemVaiJogar() {
    return Math.floor(Math.random() * 6);
}

async function bonus() {
    return Math.random()
}


async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
    }
    return result;
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRoll(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);

            await logRoll(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRoll(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);

            await logRoll(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }

        if (block === "CONFRONTO") {
            let bonus1 = await bonus();
            let bonus2 = await bonus();

            if (bonus1 <= 0.10) {
                console.log(`O corredor ${character1.NOME} obteve um bônus de poder inesperado! OOOOOOO`);
                character1.PODER++;
            }
            if (bonus2 <= 0.10) {
                console.log(`O corredor ${character2.NOME} obteve um bônus de poder inesperado! 00000000000`);
                character2.PODER++;
            }

            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`🥊 ${character1.NOME} confrontou ${character2.NOME}! 🥊`);

            await logRoll(character1.NOME, "Poder", diceResult1, character1.PODER);
            await logRoll(character2.NOME, "Poder", diceResult2, character2.PODER);

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto! 🐢`);

                character2.PONTOS--;
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto! 🐢`);
                character1.PONTOS--;
            }

            console.log(powerResult2 === powerResult1 ? "Confronto empatado, nenhum ponto foi perdido!" : "");
        }

        // verificando o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }


        console.log("----------------------------------------------------");
    }
}

async function declareWinner(jogador1, jogador2) {
    console.log(`Resultado final:`);
    console.log(`${jogador1.NOME}: ${jogador1.PONTOS} ponto(s)`);
    console.log(`${jogador2.NOME}: ${jogador2.PONTOS} ponto(s)`);

    if (jogador1.PONTOS > jogador2.PONTOS)
        console.log(`\n${jogador1.NOME} venceu a corrida! Parabéns 🏆`);
    else if (jogador2.PONTOS > jogador1.PONTOS)
        console.log(`\n${jogador2.NOME} venceu a corrida! Parabéns 🏆`);
    else
        console.log(`\nA corrida terminou empatada!`);
}
// posso randomizar quem vai participar das corridas
(async function main() {
    let jogador1 = await quemVaiJogar();
    let jogador2 = await quemVaiJogar();
    while (jogador2 == jogador1) {
        jogador2 = await quemVaiJogar();
    }

    console.log(`🏁🚨 Corrida entre ${jogadores[jogador1].NOME} e ${jogadores[jogador2].NOME} começando... 🏁🚨`);

    await playRaceEngine(jogadores[jogador1], jogadores[jogador2]); // await espera essa parte do código ser exucutada para prosseguir
    await declareWinner(jogadores[jogador1], jogadores[jogador2]);
})(); // função auto invocável, não precisa ser chamada para executar
