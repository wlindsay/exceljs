const BaseXform = require('../base-xform');

class AGraphicDataXform extends BaseXform {
  get tag() {
    return 'a:graphicData';
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag, { uri: 'http://schemas.openxmlformats.org/drawingml/2006/chart' });
    xmlStream.leafNode('c:chart', {
      'xmlns:c': 'http://schemas.openxmlformats.org/drawingml/2006/chart',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'r:rId': model.rId
    });
    xmlStream.closeNode();
  }

  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          rId: node.attributes['r:rId'],
        };
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

module.exports = AGraphicDataXform;
