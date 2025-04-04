import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, deleteThought, updateThought, addThoughtReaction, removeThoughtReaction} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// /api/thoughts/:thoughtsId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeThoughtReaction);
 

export default router;