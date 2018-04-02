class Utils 
{
    static transformShelfs(shelves) {
        const shelfMap = {}

        Object.keys(shelves).forEach(shelfName => {
          const booksIds = shelves[shelfName];
          booksIds.forEach(bookId => {
            shelfMap[bookId] = shelfName;
          });
        });
        return shelfMap;
    }

    static transformBooks(books) {
      const bookMap = {hasBooks: false}

      books.forEach(book => {
        if (bookMap[book.shelf]) {
          bookMap[book.shelf].push(book);
        } else {
          bookMap[book.shelf] = [book];
        }
        bookMap.hasBooks = true;
      });

      return bookMap;
    }
}

export default Utils