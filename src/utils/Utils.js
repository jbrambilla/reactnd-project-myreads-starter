class Utils 
{
    static getShelf(shelfArray, bookId) {
        let shelf = '';
        if (shelfArray.currentlyReading.indexOf(bookId) !== -1) {
            shelf = 'currentlyReading';
        } else if (shelfArray.wantToRead.indexOf(bookId) !== -1) {
            shelf = 'wantToRead';
        } else if (shelfArray.read.indexOf(bookId) !== -1) {
            shelf = 'read';
        }
        return shelf;
    }
}

export default Utils