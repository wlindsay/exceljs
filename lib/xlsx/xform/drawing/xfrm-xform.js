const BaseXform = require('../base-xform');

class XfrmXform extends BaseXform {
  get tag() {
    return 'xdr:xfrm';
  }

  render(xmlStream) {
    xmlStream.openNode(this.tag);
    xmlStream.leafNode('a:off', { x: '0', y: '0' });
    xmlStream.leafNode('a:ext', { cx: '0', cy: '0' });
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

module.exports = XfrmXform;
