const BaseXform = require('../base-xform');
const AGraphicXform = require('./a-graphic-xform');

const XfrmXform = require('./xfrm-xform');
const NvGraphicFramePrXform = require('./nv-graphic-frame-pr-xform');

class ChartXform extends BaseXform {
  constructor() {
    super();

    this.map = {
      'xdr:nvGraphicFramePr': new NvGraphicFramePrXform(),
      'xdr:xfrm': new XfrmXform(),
      'a:graphic': new AGraphicXform()
    };
  }

  get tag() {
    return 'xdr:graphicFrame';
  }

  prepare(model, options) {
    model.index = options.index + 1;
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag, { macro: '' });

    this.map['xdr:nvGraphicFramePr'].render(xmlStream, model);
    this.map['xdr:xfrm'].render(xmlStream, model);
    this.map['a:graphic'].render(xmlStream, model);

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
        this.mergeModel(this.parser.model);
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        return false;
      default:
        // not quite sure how we get here!
        return true;
    }
  }
}

module.exports = ChartXform;
