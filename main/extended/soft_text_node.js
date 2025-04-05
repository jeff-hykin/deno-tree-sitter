import { SoftNode } from "./soft_node.js"

export class SoftTextNode extends SoftNode {
    constructor({parent, ...data}) {
        super({...data, type: "text", typeId: -2})
        this._parent = parent
    }
    get parent() {
        return this._parent
    }
}