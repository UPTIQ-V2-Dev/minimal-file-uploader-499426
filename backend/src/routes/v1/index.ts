import config from '../../config/config.ts';
import authRoute from './auth.route.ts';
import docsRoute from './docs.route.ts';
import mcpRoute from './mcp.route.ts';
import mcpRestRoute from './mcpRest.route.ts';
import uploadRoute from './upload.route.ts';
import userRoute from './user.route.ts';
import express from 'express';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/mcp',
        route: mcpRestRoute
    },
    {
        path: '/mcp-protocol',
        route: mcpRoute
    },
    {
        path: '/api/upload',
        route: uploadRoute
    }
];

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: docsRoute
    }
];

defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach(route => {
        router.use(route.path, route.route);
    });
}

export default router;
