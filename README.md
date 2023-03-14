
# ILT Cloud 2 Bangkit Assigment

## Answer Demo Video
https://user-images.githubusercontent.com/72277295/225004548-1dbf3d22-5d08-4b74-a29a-b44890fe2b2b.mp4


## Task
Create the simple RESTFul API using Node.js Natively and Hapi Framework with the specification:

| Method | Path          | Response Code | Body | Description         |
| ------ |---------------| ------------- | ---- |---------------------|
| POST   | /contacts     | 201 | JSON | Create new contacts |
| GET    | /contacts     | 200 | JSON | List of contacts    |
| DELETE | /contacts/:id | 200 | JSON | Delete contacts     |

User data structure:

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```
Server options:
 - `port`: 3000
 - `host`: localhost

## Usage

1. To use any of the scripts in this repository, clone this repostory:

    ```git clone https://github.com/Muhthoriqas/Simple-RESTFul-API.git ```

2. Go to Simple-RESTFul-API Folder
    ```cd Simple-RESTFul-API ```
    
3.  Go to native, or hapi, or express folder
    ```cd native ```
    
4. Run Server
    ``` npm start ```

## Contributing
If you have any Bash scripts that you would like to share or any improvements to suggest, feel free to contribute to this repository! Fork the repository, make your changes, and submit a pull request.

## License
This repository is licensed under the MIT License. See the LICENSE file for more information.
