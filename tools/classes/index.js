import editJsonFile from 'edit-json-file'
import readline from 'readline'
import {oraPromise} from "ora";
import {ChatGPTAPI} from "chatgpt";
import APIKeys from '../ignored/APIKeys.js';

class Step {
    constructor(name, description, parent1, parent2) {
        this.name = name;
        this.description = description;
        this.parent1 = parent1;
        this.parent2 = parent2;
    }
}

let stepOneJson = editJsonFile('./stepOne.json');
let stepTwoJson = editJsonFile('./stepTwo.json');
let stepThreeJson = editJsonFile('./stepThree.json');
let stepForeJson = editJsonFile('./stepFore.json');

const baseArray = [
    {name: "Chevalier", description: "Un combattant noble et robuste, spécialisé dans les armes et l'art de la guerre. Ils excellent dans les combats rapprochés et la défense."},
    {name: "Mage", description: "Un utilisateur de la magie élémentaire, capable de lancer des sorts puissants."},
    {name: "Voleur", description: "Un maître de l'agilité et de la furtivité, en lien avec les ténèbres et les ombres, spécialisé dans le vol, la désactivation de pièges et les attaques surprises."},
    {name: "Prêtre", description: "Un adepte des pouvoirs divins, capable de soigner les blessures, de protéger contre le mal et de repousser les forces démoniaques."},
    {name: "Archer", description: "Un tireur d'élite qui excelle dans l'arc et la précision à distance, capable d'abattre les ennemis avant qu'ils n'approchent."},
    {name: "Sorcier", description: "Un utilisateur de la magie non-élémentaires, capable de lancer des sorts puissants."},
    {name: "Barbare", description: "Un guerrier sauvage et impétueux, en lien avec le sang, qui se bat avec une fureur incontrôlable, infligeant des dégâts brutaux et ignorant la douleur."},
    {name: "Moine", description: "Un maître martial qui canalise l'énergie intérieure pour des attaques rapides et puissantes."},
    {name: "Invocateur", description: "Un utilisateur de la magie d'invocation, capable d'appeler des monstre précédemment capturé pour combattre à ses côtés."},
    {name: "Spiritualiste", description: "Le Spiritualiste est un expert des énergies spirituelles, capable de communiquer avec les esprits et de canaliser leur pouvoir."},
];

const baseClasses = {
    "Chevalier": {name: "Chevalier", description: "Un combattant noble et robuste, spécialisé dans les armes et l'art de la guerre. Ils excellent dans les combats rapprochés et la défense."},
    "Mage": {name: "Mage", description: "Un utilisateur de la magie élémentaire, capable de lancer des sorts puissants."},
    "Voleur": {name: "Voleur", description: "Un maître de l'agilité et de la furtivité, en lien avec les ténèbres et les ombres, spécialisé dans le vol, la désactivation de pièges et les attaques surprises."},
    "Prêtre": {name: "Prêtre", description: "Un adepte des pouvoirs divins, capable de soigner les blessures, de protéger contre le mal et de repousser les forces démoniaques."},
    "Archer": {name: "Archer", description: "Un tireur d'élite qui excelle dans l'arc et la précision à distance, capable d'abattre les ennemis avant qu'ils n'approchent."},
    "Sorcier": {name: "Sorcier", description: "Un utilisateur de la magie non-élémentaires, capable de lancer des sorts puissants."},
    "Barbare": {name: "Barbare", description: "Un guerrier sauvage et impétueux, en lien avec le sang, qui se bat avec une fureur incontrôlable, infligeant des dégâts brutaux et ignorant la douleur."},
    "Moine": {name: "Moine", description: "Un maître martial qui canalise l'énergie intérieure pour des attaques rapides et puissantes."},
    "Invocateur": {name: "Invocateur", description: "Un utilisateur de la magie d'invocation, capable d'appeler des monstre précédemment capturé pour combattre à ses côtés."},
    "Spiritualiste": {name: "Spiritualiste", description: "Le Spiritualiste est un expert des énergies spirituelles, capable de communiquer avec les esprits et de canaliser leur pouvoir."},
};

const stepOneClasses = stepOneJson.get();
const stepTwoClasses = {};
const stepThreeClasses = {};
const stepForeClasses = {};

let tmpStepOneClasses = stepOneJson.get();
let tmpStepTwoClasses = {};
let tmpStepThreeClasses = {};
let tmpStepForeClasses = {};

const api = new ChatGPTAPI({
    apiKey: APIKeys.OpenAIKey
})

const prompt = 'Bonjour';

let res = await oraPromise(api.sendMessage(prompt, {conversationId: "346becc7-0298-40ec-8b04-8a702e677b1e", parentMessageId: "21c79764-e098-4d4d-b8af-644c44ce96d1"}), {
    text: prompt
})

function generateCombinations(arr, length) {
    const result = [];

    function recurse(current, start) {
        if (current.length === length) {
            result.push(current.slice());
            return;
        }

        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            recurse(current, i + 1);
            current.pop();
        }
    }

    recurse([], 0);
    return result;
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

function promptMaker(parent1, parent2) {
    return 'Ignore toutes les instructions avant celle-ci.' +
        '\n' +
        '\n' +
        'Voici la description de la classe ' + parent1.name + ' :\n' + parent1.description +
        '\n' +
        '\n' +
        'Voici la description de la classe ' + parent2.name + ' :\n' + parent2.description +
        '\n' +
        '\n' +
        'Génère-moi en un array JSON, 5 idées de Nom de Classe ("name") et une Description d\'une phrase maximum ("description") pour la combinaison de ces deux classes.'
}

function splitArray(array) {
    const first = array.slice(0, array.length / 2);
    const seconde = array.slice(array.length / 2);

    const parent1 = []
    const parent2 = []

    for (const firstElement of first) {
        if (typeof firstElement === "object")
            parent1.push(firstElement.name);
        else parent1.push(firstElement)
    }
    for (const secondeElement of seconde) {
        if (typeof secondeElement === "object")
            parent2.push(secondeElement.name);
        else parent2.push(secondeElement)
    }
    return [parent1.join("/"), parent2.join("/")]
}

async function step(combinaisons) {
    let parent1 = {};
    let parent2 = {};
    const json = combinaisons[0].length === 2 ? stepOneJson : combinaisons[0].length === 4 ? stepTwoJson : combinaisons[0].length === 8 ? stepThreeJson : combinaisons[0].length === 10 ? stepForeJson : null;
    const classes = combinaisons[0].length === 2 ? stepOneClasses : combinaisons[0].length === 4 ? stepTwoClasses : combinaisons[0].length === 8 ? stepThreeClasses : combinaisons[0].length === 10 ? stepForeClasses : null;
    const previousClasses = combinaisons[0].length === 2 ? baseClasses : combinaisons[0].length === 4 ? stepOneClasses : combinaisons[0].length === 8 ? stepTwoClasses : combinaisons[0].length === 10 ? stepThreeClasses : null;
    const tmpClasses = combinaisons[0].length === 2 ? tmpStepOneClasses : combinaisons[0].length === 4 ? tmpStepTwoClasses : combinaisons[0].length === 8 ? tmpStepThreeClasses : combinaisons[0].length === 10 ? tmpStepForeClasses : null;

    for (const combinaison of combinaisons) {
        const parents = splitArray(combinaison);
        parent1 = previousClasses[parents[0]];
        parent2 = previousClasses[parents[1]];
        const title = parent1.name + "/" + parent2.name;
        const nextPrompt = promptMaker(parent1, parent2);
        res = await oraPromise(api.sendMessage(nextPrompt, {conversationId: res.conversationId, parentMessageId: res.id}), {
            text: "Combining " + parent1.name + " and " + parent2.name
        });
        tmpClasses[title] = JSON.parse("[" + res.text.split("[")[1].split("]")[0] + "]");
    }

    for (const tmpClassesKey in tmpClasses) {
        const parents = splitArray(tmpClassesKey.split("/"));
        parent1 = previousClasses[parents[0]];
        parent2 = previousClasses[parents[1]];
        console.log(tmpClasses[tmpClassesKey]);
        let answer = await askQuestion("Choisissez le meilleur nom et description pour la combinaison " + parent1.name + ", " + parent2.name + ", entre 1 et 5 : ");
        const authorized = ["1", "2", "3", "4", "5"];
        while (!authorized.includes(answer.toString())) {
            answer = await askQuestion("Choisissez le meilleur nom et description pour la combinaison " + parent1.name + ", " + parent2.name + ", entre 1 et 5 : ");
        }
        const selected = parseInt(answer) - 1;
        const newStepClasses = new Step(tmpClasses[tmpClassesKey][selected]["name"], tmpClasses[tmpClassesKey][selected]["description"], parent1.name, parent2.name)
        classes[tmpClassesKey] = newStepClasses;
        json.set(tmpClassesKey, newStepClasses);
        json.save();
    }
}

export async function start() {
    // await step(generateCombinations(baseArray, 4));
    // await step(generateCombinations(baseArray, 8));
}

start();