"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructQuery = void 0;
const constructQuery = (queryObj) => {
    const copy = Object.assign({}, queryObj);
    Object.keys(queryObj).forEach((k) => {
        if (!queryObj[k]) {
            delete copy[k];
        }
    });
    return copy;
};
exports.constructQuery = constructQuery;
//# sourceMappingURL=constructQuery.js.map