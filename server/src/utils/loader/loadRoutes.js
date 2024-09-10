import { readdirSync, access, statSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';

export default async function loadRoutes(app, pathRoutes) {
    try {
        const files = readdirSync(pathRoutes);
        
        for (const file of files) {
            if (!statSync(join(pathRoutes, file)).isDirectory()) continue;
            
            const folderPath = join(pathRoutes, file);
            const routerPath = join(folderPath, 'router.js');
            
            try {
                existsSync(routerPath);
                const routerUrl = pathToFileURL(routerPath).href;
                const router = await import(routerUrl);
                
                if (typeof router.default === 'function') {
                    app.use(`/${file}`, router.default);
                    console.log(`Route chargée: /${file}`);
                } else {
                    console.warn(`Avertissement: ${routerPath} n'exporte pas une fonction par défaut.`);
                }
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.log(`Pas de router.js trouvé dans ${folderPath}`);
                } else {
                    console.error(`Erreur lors du chargement de ${routerPath}:`, error);
                }
            }
        }
    } catch (error) {
        console.error(`Erreur lors de la lecture du répertoire ${pathRoutes}:`, error);
        throw error;
    }
}