const books = [
	{
		title: "React Billionaire",
		pages: 250,
		author: {
			name: 'Alice',
			age: 35
		},
		available: false,
		price: '101€',
		tags: ['advanced', 'js', 'react', 'senior']
	},
	{
		title: "Advanced JS",
		pages: 500,
		author: {
			name: 'Bob',
			age: 20
		},
		available: true,
		price: '25€',
		tags: ['advanced', 'js', 'mid-senior']
	},
	{
		title: "CSS Secrets",
		pages: 320,
		author: {
			name: 'Alice',
			age: 17
		},
		available: true,
		price: '8€',
		tags: ['html', 'css', 'junior']
	},
	{
		title: "HTML Mastery",
		pages: 200,
		author: {
			name: 'Charlie',
			age: 50
		},
		available: false,
		price: '48€',
		tags: ['html', 'advanced', 'junior', 'mid-senior']
	},
];
//========================================================================================
/*
🏆 Snack 1 - Filtra e Modifica\

✅ Crea un array (longBooks) con i libri che hanno più di 300 pagine.
✅ Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
✅ Stampa in console ogni titolo nella console.
*/
const longBooks = books.filter(book => book.pages > 300)
// console.log(longBooks);

const longBooksTitles = longBooks.map(book => book.title)
// console.log(longBooksTitles)

longBooksTitles.forEach(title => console.log(/*title*/))

//========================================================================================
/*
🏆 Snack 2 - Il primo libro scontato

✅ Creare un array (availableBooks) che contiene tutti i libri disponibili.
✅ Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo
Scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
✅ Salva in una variabile(fullPricedBook) il primo elemento di discountedBooks
che ha un prezzo intero(senza centesimi).
 */
const availableBooks = books.filter(book => book.available === true)
// console.log(availableBooks);

const discountedBooks = availableBooks.map(book => {
	const priceConverted = parseInt(book.price.replace('€', ''));
	const priceDiscounted = priceConverted - ((priceConverted * 20) / 100);
	const priceFormatted = priceDiscounted.toFixed(2);

	return {
		...book,
		price: `${priceFormatted}€`
	}
})
// console.log(discountedBooks);

const fullPricedBook = discountedBooks.find(book => book.price.includes(".00"))
// console.log(fullPricedBook);

//========================================================================================
/*
🏆 Snack 3 - Ordinare gli Autori

✅ Creare un array (authors) che contiene gli autori dei libri.
✅ Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
✅ Ordina l’array authors in base all’età, senza creare un nuovo array.
(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
*/
const authors = books.map(book => book.author)
//console.log(authors);

const areAuthorsAdult = authors.every(author => author.age > 18)
//console.log(areAuthorsAdult)

authors.sort((a, b) => {
	if (areAuthorsAdult) {
		return a.age - b.age
	} else {
		return b.age - a.age
	}
})
// console.log(authors);

//========================================================================================
/*
🏆 Snack 4 - Calcola l’età media

✅ Creare un array (ages) che contiene le età degli autori dei libri.
✅ Calcola la somma delle età (agesSum) usando reduce.
✅ Stampa in console l’età media degli autori dei libri.
*/
const ages = books.map(book => book.author.age)
// console.log(ages)

const agesSum = ages.reduce((acc, curr) => {
	return acc + curr
}, 0)
// console.log(agesSum / ages.length);

//========================================================================================
/*
🎁 Snack 5 (Bonus) - Raccogli i libri
✅ Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id}
usa la combinazione di .map() e Promise.all(), per creare una funzione
(getBooks) che a partire da un array di id (ids), ritorna una promise
che risolve un array di libri (books).
✅ Testala con l’array [2, 13, 7, 21, 19] .
*/
const booksId = [2, 13, 7, 21, 19];

async function getBooks(idArray) {
	const booksPromises = idArray.map(id => fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/books/${id}`).then(response => response.json()))
	const booksData = await Promise.all(booksPromises)

	return booksData
}
//  getBooks(booksId)
//  .then(response => console.log(response))

//========================================================================================
/*
🎁 Snack 6 (Bonus) - Ordina i libri
✅ Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
✅ Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
✅ Ordina l’array booksByPrice in base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.
*/
const areThereAvailableBooks = books.some(book => book.available === true)
// console.log(areThereAvailableBooks);

const booksByPrice = books.sort((a, b) => (parseInt(a.price.replace('€', ''))) - (parseInt(b.price.replace('€', ''))))
// console.log(booksByPrice);

booksByPrice.sort((a, b) => a.available === b.available ? 0 : a.available ? -1 : 1)
// console.log(booksByPrice);

//========================================================================================
/*
🎁 Snack 7 (Bonus) - Analizza i tag
✅ Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.
*/
const tagCounts = books.reduce((acc, book) => {
	book.tags.forEach(tag => {
		if (acc[tag]) {
			acc[tag]++
		} else {
			acc[tag] = 1;
		}
	})
	return acc
}, {})

// console.log(tagCounts);