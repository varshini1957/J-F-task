"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByUpdatedAtDesc = sortByUpdatedAtDesc;
function sortByUpdatedAtDesc(files) {
    return files.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}
//# sourceMappingURL=sort.js.map