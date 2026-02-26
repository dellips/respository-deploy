const notes = [
    {
        id: 1,
        title: 'first note',
        content: 'My first note is here.'
    }
];

// mengambil note by id
export const get = (id) => {
    const note = notes.find(
        (note) => note.id === id
    );
    if(!note){
        throw new Error('Note not found');
    }
    return note;
}

// create note
export const create = (title, content) => {
    const { id: lastId } = notes[notes.length - 1];
    const newNote = {
        id: lastId + 1,
        title,
        content,
    };
    notes.push(newNote);
    return newNote;
}

// update note
export const update = (id, title, content) => {
    const index = notes.findIndex(
        (note) => note.id === id
    );
    if (index < 0){
        throw new Error('Note not found for update');
    }
    const note = notes[index];
    note.title = title;
    note.content = content;
    notes[index] = note;
    return note;
}

// delete
export const remove = (id) => {
    const index = notes.findIndex(note => note.id === id);

    if (index === -1){
        throw new Error('Note not found for delete');
    }

    notes.splice(index, 1);
}

export const list = () => {
    return notes.map(({id, title, content}) => ({
        id, 
        title,
        content,
    }));
};