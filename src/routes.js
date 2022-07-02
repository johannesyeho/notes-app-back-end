// const addNote = require("./handler");
import {
    addNoteHandler,
    getAllNotesHandler,
    getAllNotesHandler2,
    getNoteByIdHandler,
    editNoteNyHandler,
    deleteNoteByIdHandler
} from './handler.js';
const routes = [{
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
}, {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler2,
}, {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
}, {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteNyHandler,
}, {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
}, ];

export default routes;