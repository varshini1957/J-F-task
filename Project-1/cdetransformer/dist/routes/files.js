"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bim360_1 = require("../services/bim360");
const procore_1 = require("../services/procore");
const viewpoint_1 = require("../services/viewpoint");
const trimble_1 = require("../services/trimble");
const accnoex_1 = require("../services/accnoex");
const sort_1 = require("../utils/sort");
const router = express_1.default.Router();
router.get('/v1/files', async (req, res) => {
    const { cdes, credentials } = req.body;
    const promises = [];
    for (const cde of cdes || []) {
        switch (cde) {
            case 'bim360':
                promises.push((0, bim360_1.fetchBIM360Files)(credentials.bim360));
                break;
            case 'procore':
                promises.push((0, procore_1.fetchProcoreFiles)(credentials.procore));
                break;
            case 'viewpoint':
                promises.push((0, viewpoint_1.fetchViewpointFiles)(credentials.viewpoint));
                break;
            case 'trimble':
                promises.push((0, trimble_1.fetchTrimbleFiles)(credentials.trimble));
                break;
            case 'acconoex':
                promises.push((0, accnoex_1.fetchAccnoexFiles)(credentials.acconoex));
                break;
        }
    }
    try {
        const results = await Promise.all(promises);
        const flattened = results.flat();
        const sorted = (0, sort_1.sortByUpdatedAtDesc)(flattened);
        res.json(sorted);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch files' });
    }
});
exports.default = router;
//# sourceMappingURL=files.js.map