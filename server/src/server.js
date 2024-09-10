import app from "./app";
import { PORT } from "./utils/env";

app.listen(PORT, () => {
    console.info(`Server BACKMINE started on http://localhost:${PORT}/`);
})