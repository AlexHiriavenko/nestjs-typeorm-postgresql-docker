const baseUrl_1 = 'http://192.168.0.105:3000';
const baseUrl_2 = 'http://localhost:3000';

// найти книгу по айди

async function findBook(id) {
  const res = await fetch(`${baseUrl_2}/books/${id}`);
  const data = await res.json(); // Дожидаемся выполнения промиса
  console.log(data); // Теперь здесь уже объект
}

findBook(2);
// findBook(11);
// findBook("qwerty");

// создать книгу

const createBookBtn = document.getElementById('createBookBtn');

const book_1 = {
  title: 'Robinson Crusoe',
  author: 'Daniel Defoe',
  published_year: 1719,
};

const wrongBook = {
  title: '',
  author: 123,
  published_year: 'not_a_number',
};

// createBookBtn.addEventListener("click", () => createBook(wrongBook));
createBookBtn.addEventListener('click', () => createBook(book_1));

async function createBook(book) {
  try {
    const res = await fetch(`${baseUrl_2}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      return;
    }
    console.log('Успех:', data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// обновить книгу

const book_2 = {
  title: 'Clean Code',
  author: 'Robert Cecil Martin',
  published_year: 2008,
  genre: 'Technic',
  price: 12,
  // extra: "extra",
};

const updateBookBtn = document.getElementById('updateBookBtn');

updateBookBtn.addEventListener('click', () => updateBook(6, book_2));

async function updateBook(id, book) {
  try {
    const res = await fetch(`${baseUrl_2}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      return;
    }

    console.log('Успех:', data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

//  вебсокет

class SocketApi {
  static socket = null;

  static createConnection() {
    if (!this.socket || this.socket.disconnected) {
      // this.socket = io(baseUrl_2);
      this.socket = io(baseUrl_2, { transports: ['websocket'] });

      this.socket.on('connect', () => {
        console.log('connected');
      });

      this.socket.on('disconnect', () => {
        console.log('disconnected');
      });

      this.socket.on('msg-for-client', (data) => console.log(data));

      this.socket.on('find-product-result', (data) => console.log(data));
    }
  }
}

const connectSocket = () => SocketApi.createConnection();

connectSocket();

const sendMessageToServer = (message) => {
  SocketApi.socket?.emit('msg-for-server', { text: message });
};

if (SocketApi.socket) {
  sendMessageToServer('hello server!');
} else {
  setTimeout(() => sendMessageToServer('hello server!'), 2000);
}

const fetchProduct = (id) => {
  SocketApi.socket?.emit('find-product', { id: id });
};

if (SocketApi.socket) {
  fetchProduct(5);
} else {
  setTimeout(() => fetchProduct(5), 2000);
}
