#!/usr/bin/env node

let rl = require('readline-sync');                                                              // Permet d'obtenir un flux d'entree/sortie via la console
let score_l = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                  // 21 lancers
let score_m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                                                   // 10 manches
let i = 0;                                                                                      // Numero de lancer
let lancer_max = 2;                                                                             // Lancer max pour dernière manche
let s = ["|   ", "|   ", "|   ", "|   ", "|   ", "|   ", "|   ", "|   ", "|   ", "|   "];       // Ajuste les espaces entre les scores de chaque manche

function tableau() {                                                                            // Fonction pour l'affichage du tableau dans la console
    console.log(" __________________________________________________________________");
    console.log("|                                                                  |");
    console.log("| Frame       |   1|   2|   3|   4|   5|   6|   7|   8|   9|     10|");
    console.log("| Frame score |" + score_l[0] + "  " + score_l[1] + "|" + score_l[2] + "  " + score_l[3] + "|" + score_l[4] + "  " + score_l[5] + "|" + score_l[6] + "  " + score_l[7] + "|" + score_l[8] + "  " + score_l[9] + "|" + score_l[10] + "  " + score_l[11] + "|" + score_l[12] + "  " + score_l[13] + "|" + score_l[14] + "  " + score_l[15] + "|" + score_l[16] + "  " + score_l[17] + "|" + score_l[18] + "  " + score_l[19] + "  " + score_l[20] + "|");
    console.log("| Total score " + s[0] + score_m[0] + s[1] + score_m[1] + s[2] + score_m[2] + s[3] + score_m[3] + s[4] + score_m[4] + s[5] + score_m[5] + s[6] + score_m[6] + s[7] + score_m[7] + s[8] + score_m[8] + s[9] + " " + score_m[9] + "|");
    console.log("|__________________________________________________________________|");
}

for (let manche = 0; manche < 10; manche++) {                                                   // Boucle pour chaque manche
    if (manche == 9) {                                                                          // A la dernière manche, le lancer max est de 3 (normalement en cas de spare ou de strike)
        lancer_max = 3;
    }

    for (let lancer = 0; lancer < lancer_max; lancer++) {                                       // Boucle pour chaque lancer
        console.log("Manche: " + (manche + 1) + " Lancer: " + (lancer + 1));
        score_l[i] = rl.question("Quilles abattues entre 0 et 10: ");                           // L'utilisateur entre le nb de quille abattue dans la console

        if ((score_l[i] >= 0 && score_l[i] <= 10 && lancer == 0 && manche < 9)                  // Si le nb de quille est compris entre 0 et 10 au premier lancer de chaque manche (sauf la derniere)
        || (score_l[i] >= 0 && score_l[i] <= 10 && lancer < 3 && manche == 9)                   // OU Si le nb de quille est compris entre 0 et 10 a tous les lancers de la derniere manche
        || ((Number(score_l[i - 1]) + Number(score_l[i])) <= 10 && lancer > 0)) {               // OU Si le nb de quille est compris entre 0 et 10 au second et troisieme lancer

            if (score_l[i] == 10 && lancer == 0) {                                              // Si le score est de 10 au premier lancer sur toutes les manches
                if (manche < 9) { 
                    score_l[i] = " ";
                    score_l[i + 1] = "X";
                    score_m[manche] += 10;

                    if (score_l[i - 1] == "X") {                                                // Si Strike au lancer precedent
                        score_m[manche] += 10;
                        score_m[manche - 1] += 10;

                        if (score_l[i - 3] == "X") {                                            // Si Strike il y a 2 lancer precedemment
                            score_m[manche] += 10;
                            score_m[manche - 1] += 10;
                            score_m[manche - 2] += 10;
                        }
                    }
                    else if (score_l[i - 1] == "/") {                                           // Si Spare au lancer precedent
                        score_m[manche] += 10;
                        score_m[manche - 1] += 10;
                    }

                    i++;
                    lancer++;
                }
                else if (manche == 9 && lancer == 0){
                    score_l[i] = "X";
                    score_m[manche] += 10;

                    if (score_l[i - 1] == "X") {                                                // Si Strike au lancer precedent
                        score_m[manche] += 10;
                        score_m[manche - 1] += 10;

                        if (score_l[i - 3] == "X") {                                            // Si Strike il y a 2 lancer precedemment
                            score_m[manche] += 10;
                            score_m[manche - 1] += 10;
                            score_m[manche - 2] += 10;
                        }
                    }
                    else if (score_l[i - 1] == "/") {                                           // Si Spare au lancer precedent
                        score_m[manche - 1] += 10;
                    }
                }
                else if (manche == 9 && lancer == 1){
                    score_l[i] = "X";
                    score_m[manche] += 10;

                    if (score_l[i - 2] == "X") {                                                // Si Strike il y a 2 lancer precedemment
                        score_m[manche] += 10;
                        score_m[manche - 2] += 10;
                    } 
                }
                else if (manche == 9 && lancer == 2){
                    score_l[i] = "X";
                    score_m[manche] += 10;
                }
            }
            else if ((Number(score_l[i - 1]) + Number(score_l[i])) == 10 && lancer == 1) {      // Si le score est de 10 au second lancer
                score_m[manche] += Number(score_l[i]);

                if (score_l[i - 2] == "X") {                                                    // Si Strike au lancer precedent
                    score_m[manche] += Number(score_l[i]);
                    score_m[manche - 1] += Number(score_l[i]);
                }

                score_l[i] = "/";
            }
            else if (score_l[i - 1] == "/" && manche < 9) {                                     // Si Spare au lancer precedent sur toutes les manches
                score_m[manche] += Number(score_l[i]) * 2;
                score_m[manche - 1] += Number(score_l[i]);
            }
            else if (score_l[i - 1] == "/" && manche == 9) {                                    // Si Spare au lancer precedent pendant la derniere manche
                score_m[manche] += Number(score_l[i]) * 2;
            }
            else if (score_l[i - 1] == "X" && score_l[i - 3] == "X") {                          // Si il y a enchainement Strike au 2 lancers precedent
                score_m[manche] += Number(score_l[i]) * 3;
                score_m[manche - 1] += Number(score_l[i]) * 2;
                score_m[manche - 2] += Number(score_l[i]);
            }
            else if (score_l[i - 1] == "X" && score_l[i - 3] != "X") {                          // Si il n'y a pas enchainement Strike au 2 lancers precedent
                score_m[manche] += Number(score_l[i]) * 2;
                score_m[manche - 1] += Number(score_l[i]);
            }
            else if (score_l[i - 2] == "X" && manche < 9) {                                     // Si Strike il y a 2 lancer precedemment
                score_m[manche] += Number(score_l[i]) * 2;
                score_m[manche - 1] += Number(score_l[i]);
            }
            else if (score_l[i - 1] == "X" && manche == 9) {                                     // Si Strike il y a 2 lancer precedemment
                score_m[manche - 1] += Number(score_l[i]);
            }
            else if (score_l[i] == 10 && manche == 9) {                                         // Si le score est de 10 a la derniere manche
                score_m[manche] += 10;
                score_l[i] = "X";
            }
            else if ((Number(score_l[i - 1]) + Number(score_l[i])) < 10 && lancer == 1) {       // Si le score est de 10 a la derniere manche
                lancer++;
            }
            else {
                score_m[manche] += Number(score_l[i]);                                          // Cumule les points a chaque lancer
            }

            i++;                                                                                // Incremente le numero du lancer
            tableau();                                                                          // Affiche le tableau de la fonction dans la console
        }
        else {
            console.log("Erreur, reessayez: ");
            lancer--;
        }
    }

    score_m[manche + 1] += score_m[manche];                                                     // Cumule les points a chaque manche

    if (score_m[manche] <= 9) {
        s[manche] = "|   ";
    } 
    else if (score_m[manche] >= 10 && score_m[manche] <= 99) {
        s[manche] = "|  ";
    }
    else if (score_m[manche] >= 100 && score_m[manche] <= 999) {
        s[manche] = "| ";
    }
    
    if (score_m[manche - 1] <= 9) {
        s[manche - 1] = "|   ";
    } 
    else if (score_m[manche - 1] >= 10 && score_m[manche - 1] <= 99) {
        s[manche - 1] = "|  ";
    }
    else if (score_m[manche - 1] >= 100 && score_m[manche - 1] <= 999) {
        s[manche - 1] = "| ";
    }

    if (score_m[manche - 2] <= 9) {
        s[manche - 2] = "|   ";
    } 
    else if (score_m[manche - 2] >= 10 && score_m[manche - 2] <= 99) {
        s[manche - 2] = "|  ";
    }
    else if (score_m[manche - 2] >= 100 && score_m[manche - 2] <= 999) {
        s[manche - 2] = "| ";
    }
}