import app from "./app.js";
import { PORT } from "./utils/env.js";

app.listen(PORT, () => {
    console.info(`Server BACKMINE started on http://localhost:${PORT}/`);
})