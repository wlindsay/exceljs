const BaseXform = require('../base-xform');
const AGraphicDataXform = require('./a-graphic-data-xform');

class AGraphicXform extends BaseXform {
  constructor() {
    super();

    this.map = {
      'a:graphicData': new AGraphicDataXform()
    };
  }

  get tag() {
    return 'a:graphic';
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag);
    this.map['a:graphicData'].render(xmlStream, model);
    xmlStream.closeNode();
  }

  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case this.tag:
        this.reset();
        break;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        break;
    }
    return true;
  }

  parseText() {}

  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        this.model = this.map['xdr:cNvPr'].model;
        return false;
      default:
        return true;
    }
  }
}

module.exports = AGraphicXform;
