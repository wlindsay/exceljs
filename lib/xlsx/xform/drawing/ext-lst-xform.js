const BaseXform = require('../base-xform');

const generateGuid = () => {
  const u = Date.now().toString(16)+Math.random().toString(16)+'0'.repeat(16);
  const guid = [u.substr(0,8), u.substr(8,4), '4000-8' + u.substr(13,3), u.substr(16,12)].join('-');
  return guid;
};

class ExtLstXform extends BaseXform {
  get tag() {
    return 'a:extLst';
  }

  render(xmlStream) {
    xmlStream.openNode(this.tag);
    xmlStream.openNode('a:ext', {
      uri: '{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}',
    });
    xmlStream.leafNode('a16:creationId', {
      'xmlns:a16': 'http://schemas.microsoft.com/office/drawing/2014/main',
      id: `{${generateGuid()}}`,
    });
    xmlStream.closeNode();
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

module.exports = ExtLstXform;
