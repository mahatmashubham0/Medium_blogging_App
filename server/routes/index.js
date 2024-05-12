import express from 'express'
import v1Routes from './v1/user-routes.js'

const router = express.Router(); 

// 1980

router.use('/v1', v1Routes);

export default router;
