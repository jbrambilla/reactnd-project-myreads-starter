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
}

export default Utils