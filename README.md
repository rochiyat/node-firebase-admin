Berikut adalah versi lengkap dari `README.md` yang dirancang untuk memudahkan developer lain dalam meng-clone dan mengimplementasikan proyek Anda:

```markdown
# Node Firebase Admin

Firebase Admin for CRUD operations using Node.js, TypeScript, Express, and Firebase Admin.

## Tech Stack

- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Express**: Web framework for Node.js to build APIs.
- **Firebase Admin**: Firebase Admin SDK for server-side Firebase operations.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Firebase project with Firestore enabled

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/node-firebase-admin.git
cd node-firebase-admin
```

### 2. Install Dependencies

Install the required dependencies:

```bash
npm install
```

### 3. Set Up Firebase Admin SDK

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or use an existing one.
   - Enable **Firestore** in the Firebase Console.

2. **Generate a Service Account Key**:
   - In the Firebase Console, go to **Project Settings** > **Service accounts**.
   - Click **Generate new private key** and download the JSON file.

3. **Add the Service Account Key to the Project**:
   - Place the downloaded JSON file in the root directory of the project.
   - Rename the file to `serviceAccountKey.json` (or any name you prefer).
   - Update the `FIREBASE_SERVICE_ACCOUNT_KEY_PATH` in the `.env` file to point to this file.

### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./serviceAccountKey.json
```

### 5. Build and Run the Project

Build the TypeScript project and start the server:

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`.

## Project Structure

```
node-firebase-admin/
├── src/
│   ├── controllers/       # Controllers for handling routes
│   ├── configs/           # Firebase Admin initialization
│   ├── routes/            # Express routes
│   ├── utils/             # Utility functions
│   └── index.ts           # Entry point of the application
├── .env                   # Environment variables
├── .gitignore             # Files and directories to ignore in Git
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Routes

### Users

- **GET /users**: Retrieve a list of all users.
- **POST /users**: Create a new user.
- **GET /users/:userId**: Retrieve a specific user by ID.
- **PUT /users/:userId**: Update a specific user by ID.
- **DELETE /users/:userId**: Delete a specific user by ID.

### Collections

- **GET /collections**: Retrieve a list of all collections.

## Example Requests

### Create a User

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Retrieve a Collection

```bash
curl -X GET http://localhost:3000/collections/your-collection-id
```

## Testing

To run tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/your-username/node-firebase-admin/issues).

---

**Happy Coding!** 🚀
```

### Penjelasan Tambahan:
1. **Struktur Proyek**: Menjelaskan struktur folder proyek agar developer mudah memahami di mana file-file penting berada.
2. **Langkah-Langkah Setup**: Memberikan panduan langkah demi langkah untuk mengatur Firebase Admin SDK dan environment variables.
3. **Contoh Request**: Memberikan contoh request API untuk memudahkan pengujian.
4. **Testing**: Menambahkan bagian testing untuk memastikan developer tahu cara menjalankan tes.
5. **Kontribusi**: Menjelaskan cara berkontribusi ke proyek.
6. **Dukungan**: Memberikan informasi tentang cara melaporkan masalah atau mendapatkan bantuan.

Dengan `README.md` ini, developer lain dapat dengan mudah meng-clone, mengatur, dan menjalankan proyek Anda.