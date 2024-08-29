import { Router } from 'express';
import {
    addUser,
    userLogin
} from './controllers/user.controller'
import { verifyUserAccMiddleware } from './middleware/authenticator';
import { addTask, completeTask, editTask } from './controllers/tasks.controller';

// import {
//   addProduct,
//   getAllProducts,
//   deleteProduct,
//   updateProduct,
//   getProduct,
// } from './controllers/product.controller';
// import {
//   post_validation,
//   getById_validation,
// } from './middlewares/product.middlewares';

const router = Router();

router.get('/', (req, res) => {
    return res.send("ainda lembro dos teus beijos")
});
router.post('/register', addUser)
// router.get('/produtos/:id', getById_validation, getProduct);
router.post('/login', userLogin)

router.use(verifyUserAccMiddleware)

router.post('/tarefa', addTask)

router.patch('/tarefa/:id/is_completed', completeTask)
// router.post('/produtos', post_validation, addProduct);
router.put('/tarefa/:id', editTask)

router.delete('/tarefa/:id')
// router.delete('/produtos/:id', deleteProduct);

// router.put('/produtos/:id', updateProduct);

export default router;