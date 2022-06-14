const BaseCellAnchorXform = require('./base-cell-anchor-xform');
const StaticXform = require('../static-xform');

const CellPositionXform = require('./cell-position-xform');
const PicXform = require('./pic-xform');
const ChartXform = require('./chart-xform');

class TwoCellAnchorXform extends BaseCellAnchorXform {
  constructor() {
    super();

    this.map = {
      'xdr:from': new CellPositionXform({tag: 'xdr:from'}),
      'xdr:to': new CellPositionXform({tag: 'xdr:to'}),
      'xdr:pic': new PicXform(),
      'xdr:graphicFrame': new ChartXform(),
      'xdr:clientData': new StaticXform({tag: 'xdr:clientData'}),
    };
  }

  get tag() {
    return 'xdr:twoCellAnchor';
  }

  prepare(model, options) {
    if (model.picture) {
      this.map['xdr:pic'].prepare(model.picture, options);
    } else if (model.chart) {
      this.map['xdr:graphicFrame'].prepare(model.chart, options);
    }
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag, {editAs: model.range.editAs || 'oneCell'});

    this.map['xdr:from'].render(xmlStream, model.range.tl);
    this.map['xdr:to'].render(xmlStream, model.range.br);
    if (model.picture) {
      this.map['xdr:pic'].render(xmlStream, model.picture);
    } else if (model.chart) {
      this.map['xdr:graphicFrame'].render(xmlStream, model.chart);
    }
    this.map['xdr:clientData'].render(xmlStream, {});

    xmlStream.closeNode();
  }

  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        this.model.range.tl = this.map['xdr:from'].model;
        this.model.range.br = this.map['xdr:to'].model;
        this.model.picture = this.map['xdr:pic'].model;
        this.model.chart = this.map['xdr:graphicFrame'].model;
        return false;
      default:
        // could be some unrecognised tags
        return true;
    }
  }

  reconcile(model, options) {
    model.medium = this.reconcilePicture(model.picture, options);
  }
}

module.exports = TwoCellAnchorXform;
