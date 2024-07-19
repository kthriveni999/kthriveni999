// controllers/noteController.js
const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching notes' });
    }
};

exports.createNote = async (req, res) => {
    const { title, content, tags, backgroundColor, archived } = req.body;
    try {
        const newNote = new Note({
            userId: req.user.userId,
            title,
            content,
            tags,
            backgroundColor,
            archived
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Error creating note' });
    }
};

exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, tags, backgroundColor, archived } = req.body;
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        if (note.userId.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        note.title = title;
        note.content = content;
        note.tags = tags;
        note.backgroundColor = backgroundColor;
        note.archived = archived;
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Error updating note' });
    }
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        if (note.userId.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        await note.remove();
        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting note' });
    }
};
