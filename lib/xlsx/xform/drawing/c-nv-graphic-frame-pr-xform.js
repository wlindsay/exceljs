const BaseXform = require('../base-xform');

class CNvGraphicFramePrXform extends BaseXform {
  get tag() {
    return 'xdr:cNvPicPr';
  }

  render(xmlStream) {
    xmlStream.openNode(this.tag);
    xmlStream.leafNode('a:graphicFrameLocks');
    xmlStream.closeNode();
  }

  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        return true;
      default:
        return true;
    }
  }

  parseText() {}

  parseClose(name) {
    switch (name) {
      case this.tag:
        return false;
      default:
        // unprocessed internal nodes
        return true;
    }
  }
}

module.exports = CNvGraphicFramePrXform;
