import { Router } from "express";
import * as Note from "../models/note.js";
import { Post } from "../models/index.js";

const router = Router();

// get all
router.get('/', async (req, res, next) => {
    // const notes = Note.list();
    const notes = await Post.find();
    res.status(201).json(notes);
});

// get by id
router.get('/:id', async (req, res, next) => {
    // const id = Number(req.params.id);
    const id = req.params.id;
    try {
        // const note = Note.get(id);
        const note = await Post.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan"});
        }

        res.status(201).json(note);
    } catch (e) {
        next(e);
    }
});

// create
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        // const note = Note.create(title, content);
        const note = await Post.create({
            title,
            content,
        });
        res.status(201).json(note);
    } catch (e) {
        next(e);
    }
});

// modification by id
router.put('/:id', async (req, res, next) => {
    // const id = Number(req.params.id);
    const id = req.params.id;
    const { title, content } = req.body;
    try {
        const note = await Post.findByIdAndUpdate(id, {
            title,
            content,
        }, { returnDocument: 'after' });

        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan"});
        }

        res.status(201).json(note);
    } catch (e) {
        next(e);
    }
});

// delete
router.delete('/:id', async (req, res) => {
    // console.log(req.params.id);
    // Note.remove(Number(req.params.id));
    const deletePost = await Post.findByIdAndDelete(req.params.id);

    if (!deletePost) {
            return res.status(404).json({ message: "Note tidak ditemukan"});
        }

    res.status(201).json(deletePost);

});

export default router;