import { BaseNode } from "./base_node.js"

// HardNode extends BaseNode as well (indirectly)
export class SoftNode extends BaseNode {
    constructor(data) {
        super(data)
    }
    
    // these are getters because when calling .replaceInnards() on a node the indices of hardNodes shift, these getters piggyback on that shift (otherwise they'd be wrong)
    get startIndex() {
        return this._startIndexOffset + this.getReferencePoint().index
    }
    
    get startPosition() {
        return {
            row: this._startRowOffset + this.getReferencePoint().position.row,
            column: this._startColOffset + this.getReferencePoint().position.column,
        }
    }

    get endIndex() {
        return this._endIndexOffset + this.getReferencePoint().index
    }
    
    get endPosition() {
        return {
            row: this._endRowOffset + this.getReferencePoint().position.row,
            column: this._endColOffset + this.getReferencePoint().position.column,
        }
    }
}