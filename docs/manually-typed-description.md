# Manually typed description

Tucano typing is a platform where the use can practice typing.

The project is composed of a frontend application and a backend application.

The fronend application is the interface the user interacts with.
The backend applicaiton will provide the text the use is typing and praticing with.
The backend application will also store data of the typing tests from the user.

In the frontend application the user will choose one type of typing tests.
The user will be redirected to a page where the test will be displayed.
In this new page, the frontend application will request the backend service the text for the typing test.
In the backend, the AI generates a text with the desired length.
In the frontend application, every keyboard key pressed by the user will generate a fingerprint with the key and the timestamp.
At the end of the typing test, an array with the fingerprints will be generated. The whole data will be forwarded to the backend service.
The backend service will analyse the data and provide the metrics for the user.
The backend will also store the data with the metrics in the database.

At this point, two tables are necessary:

- pressed keys fingerprints table 
    - timestamp
    - presed key
- performed tests table with metrics: 
    - speed (wpm)
    - accuracy
    - timestamp (when the metrics were calculated)

The application as whole needs authentication, which will be implemented with google oauth.
Another table will be necessary (Users table).

In the frontend another page will display a scoreboard.

The user will be able to control if their data is public or private. When he decided to have the data private, the scoreboard will present the data in anonymous way since the backend service.

The backend service will also analyse the wrong typed words and provide:

- personal analisis of the most wrong typed words
- personalised texts using those words