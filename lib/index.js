const getInlineImages = require("./inline-images");

module.exports = {
    install: function(less, pluginManager) {
        const InlineImages = getInlineImages(less);
        pluginManager.addVisitor(new InlineImages());
    }
};
