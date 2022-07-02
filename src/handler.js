// const nanoid = require('nanoid');
// const notes = require("./notes");
import {
    nanoid
} from "nanoid";
import notes from "./notes.js";

//CREATE (POST) --> data masuk ke server, server memberikan response berupa satus berhasil/gagal
const addNoteHandler = (request, h) => {
    const {
        title,
        tags,
        body
    } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    // response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
    return response;
};

// READ --> server lgsg memberikan response ke client berupa view data nya
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// atau
const getAllNotesHandler2 = (request, h) => {
    const response = h.response({
        status: 'success',
        data: {
            notes,
        },
    });
    return response;
};

const getNoteByIdHandler = (request, h) => {
    const {
        id
    } = request.params;
    // dapatkan note sesuai id nya, kebetulan data cuma 1 brarti ambil index ke[0]
    const note = notes.filter((n) => n.id === id)[0];

    //jika berhasil (penulisan lsgs nulis status,data,dll gaperlu buat const, sama aaja sih kek yg gagal, kalo yg gagal pake variable const, kalo ini enga)
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            }
        }
    };

    //jika gagal
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });
    response.code(404);
    return response;


};
// UPDATE (PUT)
const editNoteNyHandler = (request, h) => {
    const {
        id
    } = request.params;
    const {
        title,
        tags,
        body
    } = request.payload;
    const updatedAt = new Date().toISOString();

    // logic ganti data
    // temukan id sesuai id user dengan array.findIndex(ketemu, bernilai id,tidak ketemu nilai -1)
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        //response ke client hanya status kalo udh berhasil ngedit
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        });
        response.code(200);
        return response;
    }

    // jika fail
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan'
    });
    response.code(404);
    return response;
};

// DELETE
const deleteNoteByIdHandler = (request, h) => {
    const {
        id
    } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    // notes kan array yg didalamny ada array data2 tiap ID, yaudah pake array splice aja
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    // jika fail
    const response = h.response({
        status: 'fail',
        message: 'catatan gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
};
export {
    addNoteHandler,
    getAllNotesHandler,
    getAllNotesHandler2,
    getNoteByIdHandler,
    editNoteNyHandler,
    deleteNoteByIdHandler
};