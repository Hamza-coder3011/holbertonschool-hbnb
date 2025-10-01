# High-Level Package Diagram

**General Overview**

This document explains the overall architecture of the HBnB Evolution application.
We chose a three-layer structure to clearly separate user interactions, business logic, and data storage.

<img width="381" height="851" alt="High-level package diagramme" src="https://github.com/user-attachments/assets/b6c6e4b8-41a7-41b1-8445-807314a0804a" />

## A brief definition of layers
1. **Presentation Layer**

This is where the user interacts with the system through API calls.
It contains services that receive requests and then call the business logic

***Note :***

This layer should never access the database directly; it always goes through the business logic layer.

2. **Business Layer**

The business logic layer contains all the rules and core logic of the application defined in ModelClasses.
This is where the main entities are defined and managed with the HBNB Facade.

***Note :***

This layer centralizes the business logic to avoid duplicating the rules across multiple services or controllers.

3. **Persistence Layer**

The persistence layer is responsible for all operations related to data and the database.
It ensures the reading, writing, and updating data while adhering to the storage structure using Data Access Objects.

***Note :***

The persistence layer contains no business logic, only CRUD (Create, Read, Update, Delete) operations.
