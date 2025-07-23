"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBIM360Files = fetchBIM360Files;
async function fetchBIM360Files(token) {
    return [
        {
            source: 'bim360',
            projectId: 'bim-p1',
            fileId: 'file-001',
            name: 'SitePlan.dwg',
            version: 'v4',
            size: 204800,
            downloadUrl: 'https://bim360.fake/download/001',
            updatedAt: '2025-07-20T12:00:00Z',
        },
        // Add more mocked entries
    ];
}
//# sourceMappingURL=bim360.js.map