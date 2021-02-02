#### GeekBots

`An application for all your educational needs.`

- Team Members
    - Harsh Thakur
    - Pranav Gawade
    - Himanshu Kumar Maurya
    - Shagun Attri

### Problem Statement

Effective delivery of online education to students has been a major concern during this period of crisis. Students as well as educators faced a lot of different challenges like lack of interaction, improper evaluation, inability to ensure attentiveness and personal attention towards lacking students. As this was an unforeseen situation, the education we already had were designed to support education not deliver. Platform’s that can deliver online education to students effectively must be developed to prevent loss in the upcoming future.

### Solution Proposed

We aim to develop an application that can at least partially solve those issues. This platform will have the facility to provide study material to students in the form of videos, pdf and urls. It will provide alternatives for assessment such as MCQ based quizzes and handwritten submissions. Apart from this educators can conduct online classes from the same platform ensuring proper delivery. We will also use ML models to predict and assess progress of the students so that the parents and teachers are aware of it. All in all this is going to be an upgraded version on LMS (Learning Management System) platforms that we are already aware of.

### Existing Solutions

A lot of solutions were developed in the span of several moths during lockdown period. Platforms like Zoom and Google meet exploded in popularity due to their usefulness in conducting classes in online mode. LMS platforms like Moodle and Collpoll which were already there before lockdown also saw a widespread adoption in a lot of educational institutes. Lastly, platforms like Udemy and Coursera which were designed specifically for delivering courses online also proved to be useful for a lot of students trying to learn new things. But these platforms don’t allow educational institutes to create their own classes and conduct online lectures there. They strictly use recorded lectures and assignments which are not interactive which is especially concerning for middle and high school students.

### Advantage over the existing Solution

As mentioned in the previous slide, there were a lot of platforms available at that time as well. But there was no single place to go for doing all the things. Educators could provide the study material and assignments through LMS platform, but they had to conduct classes on other web conferencing platforms. Apart from that, taking attendance, maintaining records of assignment grades and conducting examination in online mode were the other side hassles that they needed to take care of. To overcome these problems, we are going to build a platform which will strongly integrate these processes and provide a go to destination for there needs.

Microsoft Teams has taken over the market right now as it provides a lot of these features that other platforms lacked. Still, As it is not strongly designed for educational proposes. It lacks a lot of things that traditional LMS used to provide. We intend to design an application especially for providing online education.

### Proposed Tech-Stack For the Solution

- `Application Type:`  Web Application
- `Front-end:`   React, Redux(State-management)
- `Back-end:`   Firebase Cloud Functions (Serverless)
- `DBMS (Database Management System):`  Firebase Cloud Firestore
- `Hosting:`   Firebase Web Application Hosting
- `Machine Learning Model:`   Python with Flask/Django for API
- `Model Hosting:`   Heroku

### Methodology of Implementation

- Create Routes and Manage web app state for students and teachers interface.
- Integrate ML model to the Web App
- Test Features
- Host the Web app on heroku
- Clean up and Polish

### Block Diagram of the Solution (WorkFlow)
![Screenshot from 2021-01-28 21-53-09](https://user-images.githubusercontent.com/29366864/106558585-045b2700-654a-11eb-8a47-0995bcf3eb16.png)

### Identified issues or Show Stoppers

- Making an effrective Machine Learning Model
- Designing app flow for Teachers and Students
- Ensuring intuitive UI/UX
- Addressing limited internet connectivity
- Creating easy adoption process

