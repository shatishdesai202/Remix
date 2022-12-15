import fs from 'fs/promises';

export async function getStoredNotes() {
    const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
    let data
    try {
        data = JSON.parse(rawFileContent);

    } catch (error) {
        data = []
    }
    const storedNotes = data.notes ?? [];
    return storedNotes;
}

export function storeNotes(notes) {
    console.log("@@@@@@@@@@@", notes)
    return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
}