let game = null;

function getStartGame() {
    return {
        money: D(1000000000000000000000000000000000000000000000000000000000000000000000000000),
        ladder: [],
        unlocks: {},

        gems: D(100000000000000000000),
        gemGens: D(10),
        gemUpgs: D(10),
        runes: [],
        runeEquip: [],
        scraps: D(1000000000),

        milestones: {},

        tokens: D(100000000000000000000000000),
        tokenUpg: {},

        charge: D(1000000000000000000000000000000000),
        charges: [],
        nextCharge: 1,
        chargerUpg: {},
        autoActive: true,
        automators: {},

        sigils: [],

        collapsium: D(0),
        colTimer: 0,
        colPoints: D(0),
        colUpg: {},

        options: {
            tickRate: 10,

            forceSci: false,
            pixelText: true,

            autoSave: true,

            autoConfirm: {}
        },

        stats: {
            timePlayed: 0,
            presses: 0,
            runeBought: 0,
            chargerDist: 0,
            chargeClick: 0,
            sigilForged: 0,
        },
        best: {},

        currentTab: "buttons",
    }
}

function load() {
    try {
        game = JSON.parse(decodeURIComponent(atob(localStorage.getItem("ibsim"))));
        game = deepCopy(game, getStartGame())
    } catch {
        game = getStartGame();
    }
}

function save() {
    localStorage.setItem("ibsim", btoa(encodeURIComponent(JSON.stringify(game))));
}

function exportToClipboard() {
    navigator.clipboard.writeText(btoa(encodeURIComponent(JSON.stringify(game))));
}

function hardReset(wipeOptions = false) {
    exportToClipboard();
    if (wipeOptions) localStorage.removeItem("ibsim");
    else localStorage.setItem("ibsim", btoa(encodeURIComponent(JSON.stringify({options: game.options}))));
    game.options.autoSave = false;
    document.location.reload();
}

function deepCopy(target, source) {
    for (item in source) {
        if (target[item] === undefined) target[item] = source[item];
        else if (source[item] instanceof OmegaNum) target[item] = new OmegaNum(target[item]);
        else if (typeof source[item] == "object") target[item] = deepCopy(target[item], source[item]);
    }
    return target;
}
