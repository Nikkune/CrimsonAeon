class StoryNodes {
    constructor(id, label) {
        this.id = id;
        this.type = 'default';
        this.data = {label: label};
        this.position = {x: 100, y: 100};
    }
}

module.exports = StoryNodes