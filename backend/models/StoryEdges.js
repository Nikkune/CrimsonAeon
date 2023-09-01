class StoryEdges {
    constructor(source, target) {
        {
            this.id = source + "-" + target;
            this.source = source;
            this.target = target;
        }
    }
}

module.exports = StoryEdges;