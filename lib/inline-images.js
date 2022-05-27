module.exports = function ( less ) {

    const ParamStringReplacementNode = require( './param-string-replacement-node' )( less );

    function InlineImages() {
        this._visitor = new less.visitors.Visitor( this );
    }

    InlineImages.prototype = {
        isReplacing: true,
        isPreEvalVisitor: true,
        run: function ( root ) {
            return this._visitor.visit( root );
        },
        visitDeclaration: function ( declarationNode, visitArgs ) {
            this._inDeclaration = true;
            return declarationNode;
        },
        visitDeclarationOut: function ( declarationNode, visitArgs ) {
            this._inDeclaration = false;
        },
        visitUrl: function ( URLNode, visitArgs ) {
            if ( !this._inDeclaration ) {
                return URLNode;
            }
            if ( URLNode?.value?.value?.indexOf( '#' ) === 0 ) {
                // Might be part of a VML url-node value like:
                // ``behavior:url(#default#VML);``
                return URLNode;
            }
            return new less.tree.Call(
                "data-uri",
                [ new ParamStringReplacementNode( URLNode.value ) ],
                URLNode.index || 0,
                URLNode.fileInfo(),
            );
        }
    };
    return InlineImages;
};
