import editJsonFile from 'edit-json-file'
import readline from 'readline'
import {oraPromise} from "ora";
import {ChatGPTAPI} from "chatgpt";
import APIKeys from '../ignored/APIKeys.js';
import moment from 'moment'

const startTime = moment();

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

const stepOneClasses = {
    "Chevalier/Mage": {
        "name": "Chevalier des éléments",
        "description": "Un noble chevalier maîtrisant les différents éléments, utilisant la magie pour manipuler l'eau, la terre, le feu et l'air en combat.",
        "parent1": "Chevalier",
        "parent2": "Mage"
    },
    "Chevalier/Voleur": {
        "name": "Chevalier des Ombres",
        "description": "Un guerrier agile et rusé, maître dans l'art du combat rapproché et de l'infiltration.",
        "parent1": "Chevalier",
        "parent2": "Voleur"
    },
    "Chevalier/Prêtre": {
        "name": "Templier Divin",
        "description": "Un défenseur intrépide qui allie la puissance et l'armure du chevalier à la magie divine du prêtre, protégeant ses alliés et repoussant les ténèbres.",
        "parent1": "Chevalier",
        "parent2": "Prêtre"
    },
    "Chevalier/Archer": {
        "name": "Sentinelle d'Acier",
        "description": "Un défenseur implacable qui utilise son arc pour éliminer les ennemis avant qu'ils n'atteignent ses lignes, puis passe à l'épée pour protéger ses alliés.",
        "parent1": "Chevalier",
        "parent2": "Archer"
    },
    "Chevalier/Sorcier": {
        "name": "Chevalier des Arcanes",
        "description": "Un noble guerrier qui maîtrise les arcanes, alliant l'épée et les sortilèges pour infliger des dégâts magiques tout en étant capable d'encaisser les assauts ennemis.",
        "parent1": "Chevalier",
        "parent2": "Sorcier"
    },
    "Chevalier/Barbare": {
        "name": "Chevalier sanguinaire",
        "description": "Un noble guerrier épris d'une soif de sang vorace, combinant la grâce chevaleresque à une brutalité inégalée.",
        "parent1": "Chevalier",
        "parent2": "Barbare"
    },
    "Chevalier/Moine": {
        "name": "Chevalier Serein",
        "description": "Un guerrier qui a trouvé l'harmonie entre la paix intérieure du moine et la force écrasante du chevalier, incarnant la sérénité au combat.",
        "parent1": "Chevalier",
        "parent2": "Moine"
    },
    "Chevalier/Invocateur": {
        "name": "Lame Appelante",
        "description": "Un guerrier chevalier qui a perfectionné l'art de l'invocation, faisant appel à des créatures épiques pour renforcer sa lame et déchaîner des attaques dévastatrices sur ses adversaires.",
        "parent1": "Chevalier",
        "parent2": "Invocateur"
    },
    "Chevalier/Spiritualiste": {
        "name": "Gardien Spirituel",
        "description": "Un protecteur dévoué qui unit les enseignements guerriers du chevalier aux connaissances ésotériques du spiritualiste, utilisant le pouvoir des esprits pour défendre les innocents.",
        "parent1": "Chevalier",
        "parent2": "Spiritualiste"
    },
    "Mage/Voleur": {
        "name": "Ombromage",
        "description": "Un être mystérieux qui maîtrise aussi bien la magie des ombres que les forces élémentaires, capable d'utiliser la discrétion et le pouvoir magique pour triompher.",
        "parent1": "Mage",
        "parent2": "Voleur"
    },
    "Mage/Prêtre": {
        "name": "Archimage Sacré",
        "description": "Un maître des arts magiques qui a fusionné les connaissances du mage avec la sagesse divine du prêtre, capable de conjurer des sorts destructeurs tout en maintenant la spiritualité et la guérison de son groupe.",
        "parent1": "Mage",
        "parent2": "Prêtre"
    },
    "Mage/Archer": {
        "name": "Arcaneur",
        "description": "Un expert en arcanes qui manie à la fois les sorts magiques et l'arc avec une habileté sans égale, tirant des flèches enchantées qui libèrent des déflagrations élémentaires sur les ennemis.",
        "parent1": "Mage",
        "parent2": "Archer"
    },
    "Mage/Sorcier": {
        "name": "Mage Élémentaliste",
        "description": "Un mage qui a maîtrisé les arts de la magie élémentaire et non-élémentaire, capable de lancer une large gamme de sorts puissants qui manipulent à la fois les forces naturelles et mystiques.",
        "parent1": "Mage",
        "parent2": "Sorcier"
    },
    "Mage/Barbare": {
        "name": "Mage sanguinaire",
        "description": "Un utilisateur de la magie élémentaire embrassant le pouvoir du sang, combinant des sorts dévastateurs avec une sauvagerie inégalée.",
        "parent1": "Mage",
        "parent2": "Barbare"
    },
    "Mage/Moine": {
        "name": "Mage Harmonique",
        "description": "Un mage qui maîtrise à la fois la magie élémentaire et les arts martiaux du moine, combinant des sorts puissants avec des attaques rapides et précises, créant une harmonie mortelle entre le corps et l'esprit.",
        "parent1": "Mage",
        "parent2": "Moine"
    },
    "Mage/Invocateur": {
        "name": "Mage Élémentaliste",
        "description": "Un mage qui maîtrise à la fois la magie élémentaire et l'art de l'invocation, capable de canaliser les forces primordiales pour non seulement lancer des sorts puissants, mais aussi invoquer des créatures élémentaires à ses côtés pour combattre.",
        "parent1": "Mage",
        "parent2": "Invocateur"
    },
    "Mage/Spiritualiste": {
        "name": "Mage des Esprits Élémentaires",
        "description": "Un mage qui invoque et domine les esprits élémentaires grâce à la magie élémentaire, utilisant leur puissance pour renforcer ses propres sorts et déchaîner des attaques magiques redoutables contre ses ennemis.",
        "parent1": "Mage",
        "parent2": "Spiritualiste"
    },
    "Voleur/Prêtre": {
        "name": "Prêtre des Ombres",
        "description": "Un voleur qui a embrassé les pouvoirs divins, capable de manipuler les ombres dans un but de guérison, de protection et de combat subtil.",
        "parent1": "Voleur",
        "parent2": "Prêtre"
    },
    "Voleur/Archer": {
        "name": "Ombre d'Arc",
        "description": "Un voleur habile qui manie l'arc avec précision, capable de se faufiler dans les ombres et de décocher des flèches mortelles depuis la distance.",
        "parent1": "Voleur",
        "parent2": "Archer"
    },
    "Voleur/Sorcier": {
        "name": "Sombre Illusionniste",
        "description": "Un voleur qui manipule les arcanes sombres, capable de créer des illusions trompeuses pour déjouer ses ennemis et se faufiler dans l'ombre.",
        "parent1": "Voleur",
        "parent2": "Sorcier"
    },
    "Voleur/Barbare": {
        "name": "Sauvageon ombreux",
        "description": "Un combattant agile et insaisissable qui manie à la fois les ténèbres et la fureur, passant des attaques furtives aux ravages brutaux.",
        "parent1": "Voleur",
        "parent2": "Barbare"
    },
    "Voleur/Moine": {
        "name": "Ombre Zen",
        "description": "Un voleur qui a embrassé la voie du moine, alliant l'agilité furtive à la maîtrise des arts martiaux pour des attaques précises et dévastatrices.",
        "parent1": "Voleur",
        "parent2": "Moine"
    },
    "Voleur/Invocateur": {
        "name": "Ombremancien",
        "description": "Une classe hybride qui combine l'agilité du voleur avec le pouvoir de contrôler les ombres et d'invoquer des créatures obscures, capable de voler et de diriger une armée d'ombres mortelles.",
        "parent1": "Voleur",
        "parent2": "Invocateur"
    },
    "Voleur/Spiritualiste": {
        "name": "Lame Spectrale",
        "description": "Un combattant agile et spirituellement connecté, capable de manier l'esprit et l'épée avec une habileté exceptionnelle. Ce voleur invoque des esprits pour l'aider dans le vol, la désactivation de pièges complexes et les attaques surprises, fusionnant l'art du combat agile avec la puissance mystique des entités spirituelles.",
        "parent1": "Voleur",
        "parent2": "Spiritualiste"
    },
    "Prêtre/Archer": {
        "name": "Archer Sacré",
        "description": "Un archer doté de compétences sacrées, maîtrisant l'arc tout en canalisant les pouvoirs divins. Ses flèches bénies repoussent les forces démoniaques et apportent la guérison à ceux qui en ont besoin. Il se tient à distance, protégeant son équipe tout en infligeant des attaques précises et dévastatrices aux ennemis.",
        "parent1": "Prêtre",
        "parent2": "Archer"
    },
    "Prêtre/Sorcier": {
        "name": "Champion Divin",
        "description": "Un puissant sorcier imprégné des énergies divines, capable de canaliser des sorts non-élémentaires avec une force extraordinaire. Il utilise sa magie pour soigner les blessures, protéger contre les forces démoniaques et manifester le pouvoir divin sur le champ de bataille. En tant que champion divin, il est un véritable catalyseur de la puissance divine.",
        "parent1": "Prêtre",
        "parent2": "Sorcier"
    },
    "Prêtre/Barbare": {
        "name": "Barbare bénit",
        "description": "Un guerrier sauvage béni par les dieux, mélangeant la brutalité du barbare avec la capacité de canaliser des pouvoirs divins pour infliger le jugement sacré sur ses ennemis.",
        "parent1": "Prêtre",
        "parent2": "Barbare"
    },
    "Prêtre/Moine": {
        "name": "Pugiliste Divin",
        "description": "Un combattant divinement béni, maître des arts martiaux et capable de canaliser les pouvoirs divins dans ses poings. Ses attaques rapides et précises portent la force de la divinité, infligeant des dégâts redoutables à ses ennemis tout en apportant la guérison à ses alliés. En tant que pugiliste divin, il est un champion de la justice et de la spiritualité.",
        "parent1": "Prêtre",
        "parent2": "Moine"
    },
    "Prêtre/Invocateur": {
        "name": "Prêtre des Bêtes",
        "description": "Un prêtre qui a développé une connexion sacrée avec le royaume animal, capable d'invoquer et de contrôler des créatures divines pour combattre à ses côtés. Il soigne les blessures de ses alliés tout en invoquant des monstres puissants pour repousser les forces démoniaques. En tant que prêtre des bêtes, il est le gardien de la nature et des esprits animaux.",
        "parent1": "Prêtre",
        "parent2": "Invocateur"
    },
    "Prêtre/Spiritualiste": {
        "name": "Ange-Guérisseur",
        "description": "Un être céleste envoyé par les dieux pour apporter guérison et protection à ceux qui en ont besoin. L'ange-guérisseur combine les pouvoirs divins du prêtre avec la sensibilité spirituelle du spiritualiste. Capable de communiquer avec les anges et les êtres spirituels supérieurs, il soigne les blessures physiques et spirituelles, repoussant les ténèbres grâce à sa lumineuse présence.",
        "parent1": "Prêtre",
        "parent2": "Spiritualiste"
    },
    "Archer/Sorcier": {
        "name": "Arcane Archer",
        "description": "Un maître qui allie la précision de l'archer avec la puissance destructrice de la magie non-élémentaire. L'arcane archer décoche des flèches enchantées imprégnées de sorts, infligeant des dégâts mortels à distance. Il manipule les énergies magiques pour renforcer ses attaques et utiliser des sortilèges spéciaux pour neutraliser ou affaiblir ses ennemis.",
        "parent1": "Archer",
        "parent2": "Sorcier"
    },
    "Archer/Barbare": {
        "name": "Archer sanguinaire",
        "description": "Un combattant farouche qui manie l'arc et le sang avec une adresse mortelle, alliant la sauvagerie du barbare à la capacité de neutraliser les menaces à distance.",
        "parent1": "Archer",
        "parent2": "Barbare"
    },
    "Archer/Moine": {
        "name": "Faucon Zen",
        "description": "Un archer d'une sérénité parfaite, capable d'utiliser son arc avec une précision absolue grâce à sa maîtrise des enseignements du moine. Le faucon zen décoche des flèches avec une calme assurance, touchant toujours sa cible avec une précision chirurgicale. Il canalise son énergie intérieure pour atteindre un état de tranquillité totale, éliminant toute interférence extérieure et se concentrant uniquement sur le tir parfait.",
        "parent1": "Archer",
        "parent2": "Moine"
    },
    "Archer/Invocateur": {
        "name": "Sylvegardien",
        "description": "Un archer qui peut se connecter au monde des esprits de la nature et invoquer des gardiens sylvestres pour l'aider en combat. Le Sylvegardien décoche des flèches avec une précision inégalée tout en appelant des esprits de la forêt qui protègent et attaquent ses ennemis. Sa connexion profonde avec la nature lui donne un avantage tactique, combinant les pouvoirs de l'archer avec les forces mystiques de la faune sylvestre.",
        "parent1": "Archer",
        "parent2": "Invocateur"
    },
    "Archer/Spiritualiste": {
        "name": "Mystique d'Arcane",
        "description": "Un archer qui marie l'arc et les flèches avec la puissance des énergies spirituelles. Le Mystique d'Arcane tire des projectiles chargés de magie spirituelle, infligeant des dégâts mystiques à ses ennemis. Il possède également la capacité de canaliser les esprits pour renforcer sa propre précision et sa perception, faisant de lui un archer capable de percer les voiles du monde physique et spirituel.",
        "parent1": "Archer",
        "parent2": "Spiritualiste"
    },
    "Sorcier/Barbare": {
        "name": "Sorcier sanguinaire",
        "description": "Un guerrier sauvage embrassant les pouvoirs magiques non-élémentaires, mêlant la brutalité du barbare à une sorcellerie sanglante.",
        "parent1": "Sorcier",
        "parent2": "Barbare"
    },
    "Sorcier/Moine": {
        "name": "Sorcier Éthermancien",
        "description": "Un sorcier qui combine la maîtrise de la magie non-élémentaire avec les techniques de combat intenses du moine. Le Sorcier Éthermancien canalise l'énergie intérieure pour renforcer ses sorts, lançant des attaques magiques rapides et puissantes. Il harmonise la fluidité du mouvement du moine avec la puissance destructrice de la magie, créant une fusion unique entre la grâce et le pouvoir arcanique.",
        "parent1": "Sorcier",
        "parent2": "Moine"
    },
    "Sorcier/Invocateur": {
        "name": "Sorcier Conjurateur",
        "description": "Un sorcier qui se spécialise dans l'art de la conjuration, utilisant la magie non-élémentaire pour manifester des créations magiques sur le champ de bataille. Le Sorcier Conjurateur crée des créatures et des objets magiques à partir de rien, les commandant pour attaquer et protéger. Il est capable de matérialiser des êtres fantastiques et des armes en utilisant sa propre énergie arcanique, créant ainsi un arsenal de puissance illimitée.",
        "parent1": "Sorcier",
        "parent2": "Invocateur"
    },
    "Sorcier/Spiritualiste": {
        "name": "Mage Spectral",
        "description": "Un mage qui se spécialise dans la manipulation des énergies spirituelles tout en maîtrisant la magie non-élémentaire. Le Mage Spectral a la capacité de projeter des illusions spectrales et de matérialiser des formes éthérées pour combattre à ses côtés. Il canalise les forces spirituelles pour renforcer ses sorts et créer des enchantements magiques qui confondent et affaiblissent ses ennemis.",
        "parent1": "Sorcier",
        "parent2": "Spiritualiste"
    },
    "Barbare/Moine": {
        "name": "Moine sanguinaire",
        "description": "Un maître martial embrassant la fureur barbare, canalisant l'énergie intérieure pour propulser ses attaques avec une vélocité et une violence dévastatrices.",
        "parent1": "Barbare",
        "parent2": "Moine"
    },
    "Barbare/Invocateur": {
        "name": "Invocateur sanguinaire",
        "description": "Un maître de l'invocation qui a embrassé la fureur barbare, appelant des créatures sanguinaire pour déchaîner une destruction implacable sur les ennemis.",
        "parent1": "Barbare",
        "parent2": "Invocateur"
    },
    "Barbare/Spiritualiste": {
        "name": "Spiritualiste sauvage",
        "description": "Un expert des énergies spirituelles qui embrasse la fureur barbare, canalisant les pouvoirs des esprits pour alimenter ses attaques dévastatrices et semer le chaos sur le champ de bataille.",
        "parent1": "Barbare",
        "parent2": "Spiritualiste"
    },
    "Moine/Invocateur": {
        "name": "Invocateur Éclairé",
        "description": "Un utilisateur de la magie d'invocation qui s'est entraîné dans les voies martiales du moine. L'Invocateur Éclairé canalise l'énergie intérieure pour appeler des monstres lors des combats, mais il utilise également son agilité et sa maîtrise martiale pour se battre directement. Il frappe rapidement et puissamment, combinant les coups mortels du moine avec les créatures invoquées, semant la confusion et la destruction chez ses ennemis.",
        "parent1": "Moine",
        "parent2": "Invocateur"
    },
    "Moine/Spiritualiste": {
        "name": "Moine Éthéré",
        "description": "Un maître martial qui a développé une connexion profonde avec les énergies spirituelles. Le Moine Éthéré canalise son énergie intérieure tout en communiquant avec les esprits, puisant dans leur pouvoir pour renforcer ses attaques rapides et puissantes. Il combine l'agilité du moine avec la sagesse spirituelle, créant ainsi une harmonie parfaite entre le corps et l'esprit sur le champ de bataille.",
        "parent1": "Moine",
        "parent2": "Spiritualiste"
    },
    "Invocateur/Spiritualiste": {
        "name": "Maître Spirite",
        "description": "Un invocateur qui est devenu un maître dans l'art de la communication avec les esprits. Le Maître Spirite possède une profonde compréhension des énergies spirituelles et est capable d'appeler des monstres capturés pour combattre à ses côtés. Il établit une connexion harmonieuse avec les esprits, leur demandant leur soutien et canalisant leur pouvoir pour renforcer ses invocations. Son expertise spirituelle lui confère une sagesse et une intuition supérieures lors des combats.",
        "parent1": "Invocateur",
        "parent2": "Spiritualiste"
    }
};
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
        'Génère-moi en un array JSON, 5 idées de Nom de Classe ("name") et une Description d\'UNE phrase MAXIMUM ("description") pour la combinaison de ces deux classes.'
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
    let combinaisonsProcessed = 0;
    const totalIterations = combinaisons.length;
    let parent1 = {};
    let parent2 = {};
    const json = combinaisons[0].length === 2 ? stepOneJson : combinaisons[0].length === 4 ? stepTwoJson : combinaisons[0].length === 8 ? stepThreeJson : combinaisons[0].length === 10 ? stepForeJson : null;
    const classes = combinaisons[0].length === 2 ? stepOneClasses : combinaisons[0].length === 4 ? stepTwoClasses : combinaisons[0].length === 8 ? stepThreeClasses : combinaisons[0].length === 10 ? stepForeClasses : null;
    const previousClasses = combinaisons[0].length === 2 ? baseClasses : combinaisons[0].length === 4 ? stepOneClasses : combinaisons[0].length === 8 ? stepTwoClasses : combinaisons[0].length === 10 ? stepThreeClasses : null;
    const tmpClasses = combinaisons[0].length === 2 ? tmpStepOneClasses : combinaisons[0].length === 4 ? tmpStepTwoClasses : combinaisons[0].length === 8 ? tmpStepThreeClasses : combinaisons[0].length === 10 ? tmpStepForeClasses : null;

    for (const combinaison of combinaisons) {
        let success = false;
        while (!success){
            try{
                const parents = splitArray(combinaison);
                parent1 = previousClasses[parents[0]];
                parent2 = previousClasses[parents[1]];
                const nextPrompt = promptMaker(parent1, parent2);
                res = await oraPromise(api.sendMessage(nextPrompt, {conversationId: res.conversationId, parentMessageId: res.id}), {
                    text: "Combining " + parent1.name + " and " + parent2.name + "  " + (combinaisonsProcessed + 1).toString() + "/" + totalIterations ,
                    spinner: "aesthetic"
                });
                tmpClasses[parents.join("/")] = JSON.parse("[" + res.text.split("[")[1].split("]")[0] + "]");
                success = true;
            }catch (error) {
                console.error("Error occurred:", error);
                console.log("Retrying the combination...");
            }
        }
        combinaisonsProcessed++;
        const currentTime = moment();
        const elapsedMilliseconds = currentTime.diff(startTime);
        const timePerIteration = elapsedMilliseconds / combinaisonsProcessed;
        const remainingIterations = totalIterations - combinaisonsProcessed;
        const estimatedRemainingTime = timePerIteration * remainingIterations;
        const duration = moment.duration(estimatedRemainingTime, 'milliseconds');
        console.log("Estimated time remaining:", duration.humanize());
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
    await step(generateCombinations(baseArray, 4));
    await step(generateCombinations(baseArray, 8));
}

start();