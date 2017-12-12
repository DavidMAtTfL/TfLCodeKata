const
    discounts = {
        1: 0,
        2: 0.05,
        3: 0.1,
        4: 0.2,
        5: 0.25
    },

    filterZeroes = arr => arr.filter(Number),
    decrementMultiples = arr => arr.map(cur => cur > 0 ? cur - 1 : 0),

    getBooksPrice = (books) => {
        const filteredBooks = filterZeroes(books);
        
        if (!filteredBooks.length) return 0;
        
        const numUniqueBooks = filteredBooks.length;
        return (8 * numUniqueBooks * (1-discounts[numUniqueBooks])) + getBooksPrice(decrementMultiples(filteredBooks));
    };

getBooksPrice([2,2,1]);