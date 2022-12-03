#!/usr/bin/env node

let readline = require('readline-sync');                                                                                            // Permet d'obtenir un flux d'entree/sortie via la console
let score_r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                                                      // Initialise les scores des 21 rolls a 0
let score_f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                                                                                       // Initialise les scores des 10 frames a 0
let i = 0;                                                                                                                          // Initialise l'emplacement du roll
let s = ["|   ", "|   ", "|   ", "|   ", "|   ", "|   ", "|   ", "|   ", "|   ", "|   "];                                           // Ajuste les espaces entre le score total de chaque frame

function tableau() {                                                                                                                // Fonction pour l'affichage du tableau dans la console
    console.log(" __________________________________________________________________");
    console.log("|                                                                  |");
    console.log("| Frame       |   1|   2|   3|   4|   5|   6|   7|   8|   9|     10|");
    console.log("| Frame score |" + score_r[0] + "  " + score_r[1] + "|" + score_r[2] + "  " + score_r[3] + "|" + score_r[4] + "  " + score_r[5] + "|" + score_r[6] + "  " + score_r[7] + "|" + score_r[8] + "  " + score_r[9] + "|" + score_r[10] + "  " + score_r[11] + "|" + score_r[12] + "  " + score_r[13] + "|" + score_r[14] + "  " + score_r[15] + "|" + score_r[16] + "  " + score_r[17] + "|" + score_r[18] + "  " + score_r[19] + "  " + score_r[20] + "|");
    console.log("| Total score " + s[0] + score_f[0] + s[1] + score_f[1] + s[2] + score_f[2] + s[3] + score_f[3] + s[4] + score_f[4] + s[5] + score_f[5] + s[6] + score_f[6] + s[7] + score_f[7] + s[8] + score_f[8] + s[9] + "   " + score_f[9] + "|");
    console.log("|__________________________________________________________________|");
}

for (let frame = 0; frame < 10; frame++) {                                                                                          // Boucle pour chaque frame
    if (frame < 9) {                                                                                                                // Si on est avant la derniere frame
        for (let roll = 0; roll < 2; roll++) {                                                                                      // Boucle pour chaque roll
            console.log("Frame: " + (frame + 1) + " Roll: " + (roll + 1));                                                          // Indique a l'utilisateur la frame et le roll actuel
            score_r[i] = readline.question("Quilles abattues: ");                                                                   // L'utilisateur entre le nombre de quille abattue dans la console

            if (score_r[i] == "") {                                                                                                 // Si l'utilisateur n'entre aucune donnee, le score est de 0
                score_r[i] = 0;
            }

            if (roll == 0 && score_r[i] >= 0 && score_r[i] <= 10) {                                                                 // Si au premier roll et le score compris entre 0 et 10
                if (score_r[i] == 10) {                                                                                             // Si le score est de 10
                    score_r[i] = " ";
                    score_r[i + 1] = "X";
                    score_f[frame] += 10;

                    if (score_r[i - 1] == "X") {                                                                                    // Si Strike a 1 emplacement du roll precedent
                        score_f[frame] += 10;
                        score_f[frame - 1] += 10;

                        if (score_r[i - 3] == "X") {                                                                                // Si Strike a 3 emplacement du roll precedent
                            score_f[frame] += 10;
                            score_f[frame - 1] += 10;
                            score_f[frame - 2] += 10;
                        }
                    }
                    else if (score_r[i - 1] == "/") {                                                                               // Si Spare a 1 emplacement du roll precedent
                        score_f[frame] += 10;
                        score_f[frame - 1] += 10;
                    }

                    i++;                                                                                                            // Incremente l'emplacement du roll
                    roll++;                                                                                                         // Incremente le roll
                }
                else if (score_r[i - 1] == "/") {                                                                                   // Si Spare a 1 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 2;
                    score_f[frame - 1] += Number(score_r[i]);
                }
                else if (score_r[i - 1] == "X" && score_r[i - 3] == "X") {                                                          // Si Strike a 1 emplacement du roll precedent et a 3 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 3;
                    score_f[frame - 1] += Number(score_r[i]) * 2;
                    score_f[frame - 2] += Number(score_r[i]);
                }
                else if (score_r[i - 1] == "X" && score_r[i - 3] != "X") {                                                          // Si Strike a 1 emplacement du roll precedent et non a 3 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 2;
                    score_f[frame - 1] += Number(score_r[i]);
                }
                else {
                    score_f[frame] += Number(score_r[i]);                                                                           // Cumule les points a chaque roll
                }

                i++;                                                                                                                // Incremente l'emplacement du roll
                tableau();
            }
            else if (roll == 1 && (Number(score_r[i - 1]) + Number(score_r[i])) <= 10) {                                            // Si le score de la frame est inferieur ou egale a 10 au second roll
                if ((Number(score_r[i - 1]) + Number(score_r[i])) == 10) {                                                          // Si le score de la frame est de 10
                    score_f[frame] += Number(score_r[i]);

                    if (score_r[i - 2] == "X") {                                                                                    // Si Strike a 2 emplacement du roll precedent
                        score_f[frame] += Number(score_r[i]);
                        score_f[frame - 1] += Number(score_r[i]);
                    }

                    score_r[i] = "/";
                }
                else if (score_r[i - 2] == "X") {                                                                                   // Si Strike il y a 2 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 2;
                    score_f[frame - 1] += Number(score_r[i]);
                }
                else {
                    score_f[frame] += Number(score_r[i]);                                                                           // Cumule les points a chaque roll
                }

                i++;                                                                                                                // Incremente l'emplacement du roll
                tableau();                                                                          
            } 
            else {
                console.log("Erreur, reessayez: ");                                                                                 // Indique a l'utilisateur une erreur sur le nombre de quille abattue
                roll--;                                                                                                             // Le roll actuel ne compte pas
            }
        }
    }
    else if (frame == 9) {                                                                                                          // Si on est a la derniere frame
        for (let roll = 0; roll < 3; roll++) {                                                                                      // Boucle pour chaque roll
            console.log("Frame: " + (frame + 1) + " Roll: " + (roll + 1));                                                          // Indique a l'utilisateur la frame et le roll actuel
            score_r[i] = readline.question("Quilles abattues: ");                                                                   // L'utilisateur entre le nombre de quille abattue dans la console

            if (score_r[i] == "") {                                                                                                 // Si l'utilisateur n'entre aucune donnee, le score est de 0
                score_r[i] = 0;
            }

            if (roll == 0 && score_r[i] >= 0 && score_r[i] <= 10) {                                                                 // Si au premier roll et le score compris entre 0 et 10
                if (score_r[i] == 10) {                                                                                             // Si le score est de 10
                    score_r[i] = "X";
                    score_f[frame] += 10;

                    if (score_r[i - 1] == "X") {                                                                                    // Si Strike a 1 emplacement du roll precedent
                        score_f[frame] += 10;
                        score_f[frame - 1] += 10;

                        if (score_r[i - 3] == "X") {                                                                                // Si Strike a 3 emplacement du roll precedent
                            score_f[frame] += 10;
                            score_f[frame - 1] += 10;
                            score_f[frame - 2] += 10;
                        }
                    }
                    else if (score_r[i - 1] == "/") {                                                                               // Si Spare a 1 emplacement du roll precedent
                        score_f[frame] += 10;
                        score_f[frame - 1] += 10;
                    }
                }
                else if (score_r[i - 1] == "/") {                                                                                   // Si Spare a 1 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 2;
                    score_f[frame - 1] += Number(score_r[i]);
                }
                else if (score_r[i - 1] == "X" && score_r[i - 3] == "X") {                                                          // Si Strike a 1 emplacement du roll precedent et a 3 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 3;
                    score_f[frame - 1] += Number(score_r[i]) * 2;
                    score_f[frame - 2] += Number(score_r[i]);
                }
                else if (score_r[i - 1] == "X" && score_r[i - 3] != "X") {                                                          // Si Strike a 1 emplacement du roll precedent et non a 3 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 2;
                    score_f[frame - 1] += Number(score_r[i]);
                }
                else if (score_r[i - 1] == "X") {                                                                                   // Si Strike a 1 emplacement du roll precedent
                    score_f[frame - 1] += Number(score_r[i]);
                }
                else {
                    score_f[frame] += Number(score_r[i]);                                                                           // Cumule les points a chaque roll
                }

                i++;                                                                                                                // Incremente l'emplacement du roll
                tableau();
            }
            else if (roll == 1 && score_r[i] >= 0 && score_r[i] <= 10) {                                                            // Si au second roll et le score compris entre 0 et 10
                if (score_r[i] == 10 && score_r[i - 1] == "X") {                                                                    // Si le score est de 10 et Strike a 1 emplacement du roll precedent
                    score_r[i] = "X";
                    score_f[frame] += 10;

                    if (score_r[i - 2] == "X") {                                                                                    // Si Strike a 2 emplacement du roll precedent
                        score_f[frame] += 10;
                        score_f[frame - 1] += 10;
                        score_f[frame - 2] += 10;
                    }
                }
                else if ((Number(score_r[i - 1]) + Number(score_r[i])) == 10 && score_r[i - 1] != "X") {                            // Si l'addition des scores des deux premiers rolls est de 10 et pas de Strike a 1 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 2;
                    score_f[frame - 1] += Number(score_r[i]);
                    score_r[i] = "/";
                }
                else if (score_r[i - 1] == "X" && score_r[i - 3] == "X") {                                                          // Si Strike a 1 emplacement du roll precedent et a 3 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 3;
                    score_f[frame - 1] += Number(score_r[i]) * 2;
                    score_f[frame - 2] += Number(score_r[i]);
                }
                else if (score_r[i - 2] == "X") {                                                                                   // Si Strike a 2 emplacement du roll precedent
                    score_f[frame] += Number(score_r[i]) * 2;
                    score_f[frame - 1] += Number(score_r[i]);
                }
                else {
                    score_f[frame] += Number(score_r[i]);                                                                           // Cumule les points a chaque roll
                }

                if (score_r[i - 1] != "X" && score_r[i] != "X" && score_r[i] != "/") {                                              // Si il n'y a ni Spare ni Strike dans la derniere frame, passe le dernier roll
                    roll++;
                }

                i++;                                                                                                                // Incremente l'emplacement du roll
                tableau();
            }
            else if (roll == 2 && score_r[i] >= 0 && score_r[i] <= 10) {                                                            // Si au troisieme roll et le score compris entre 0 et 10
                if (score_r[i] == 10 && (score_r[i - 1] == "X" || score_r[i - 1] == "/")) {                                         // Si le score est de 10 et Strike ou Spare a 1 emplacement du roll precedent
                    score_f[frame] += 10;
                    score_r[i] = "X";
                }
                else if (score_r[i - 2] == "X" && score_r[i - 1] != "/" && (Number(score_r[i - 1]) + Number(score_r[i])) == 10) {   // Si Strike a 2 emplacement du roll precedent et pas de Spare a 1 emplacement du roll precedent et l'addition des scores du second et troisieme rolls est de 10
                    score_f[frame] += Number(score_r[i]);
                    score_r[i] = "/";
                }
                else {
                    score_f[frame] += Number(score_r[i]);                                                                           // Cumule les points a chaque roll
                }

                tableau();
            }
            else {
                console.log("Erreur, reessayez: ");                                                                                 // Indique a l'utilisateur une erreur sur nombre de quille abattue
                roll--;                                                                                                             // Le roll actuel ne compte pas
            }
        }
    }

    score_f[frame + 1] += score_f[frame];                                                                                           // Cumule les points a chaque frame

    if (score_f[frame] <= 9) {                                                                                                      // Si le score de la frame contient un chiffre
        s[frame] = "|   ";
    } 
    else if (score_f[frame] >= 10 && score_f[frame] <= 99) {                                                                        // Si le score de la frame contient 2 chiffres
        s[frame] = "|  ";
    }
    else if (score_f[frame] >= 100 && score_f[frame] <= 999) {                                                                      // Si le score de la frame contient 3 chiffres
        s[frame] = "| ";
    }
    
    if (score_f[frame - 1] <= 9) {                                                                                                  // Si le score de la frame precedente contient un chiffre
        s[frame - 1] = "|   ";
    } 
    else if (score_f[frame - 1] >= 10 && score_f[frame - 1] <= 99) {                                                                // Si le score de la frame precedente contient 2 chiffres
        s[frame - 1] = "|  ";
    }
    else if (score_f[frame - 1] >= 100 && score_f[frame - 1] <= 999) {                                                              // Si le score de la frame precedente contient 3 chiffres
        s[frame - 1] = "| ";
    }
}