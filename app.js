import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
const PORT = 3000;
const app = express();
app.get('/app.js', (req, res) => {
    // Preventing reading server source code as static resource.
    res.status(403).end('403 Forbidden');
});
app.use(express.static(path.resolve(DIRNAME, '../public')));
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}`);
});
