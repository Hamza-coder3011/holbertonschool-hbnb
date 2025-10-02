# HBnB Development 

## Opening

This document serves as **the technical reference documentation for the HBnB project**. Its main objective is to gather and organize, in a coherent manner, all the diagrams and explanatory notes produced with a clear and detailed view of the system’s overall architecture, the business logic that structures it, and the main interactions between its components through API calls.

By consolidating the high-level package diagram, the detailed class diagram of the Business Logic layer, and the sequence diagrams, this document offers a comprehensive overview that will act as a blueprint for the implementation phases.

---

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

The **Facade Pattern** (`HBnBFacade`) centralizes business logic interactions, simplifying the communication from the Presentation Layer to the Business Logic Layer. It ensures:
- Clear separation of concerns.
- Simplified maintenance and testing.
- Unified access to business operations.

***Note :***

This layer centralizes the business logic to avoid duplicating the rules across multiple services or controllers.

3. **Persistence Layer**

The persistence layer is responsible for all operations related to data and the database.
It ensures the reading, writing, and updating data while adhering to the storage structure using Data Access Objects.

***Note :***

The persistence layer contains no business logic, only CRUD (Create, Read, Update, Delete) operations.

---

# UML Class Diagram #

This file presents the class diagram of the HBnB Evolution application’s Business Layer.
It describes the structure, attributes, methods, and relationships between the main domain entities.

The diagram focuses on four core classes:

**User**  
**PLace**  
**Review**  
**Amenity**

These classes define the heart of the system's behavior, following object-oriented principles and aligned with the high-level architecture.

<img width="3160" height="1604" alt="mermaid-diagram-2025-10-01-203057" src="https://github.com/user-attachments/assets/13f08cf7-e42f-4b97-b495-e1f643dd3bb6" />

---

## 1. Explanation of entities

### **User**
- **Role** : Represents a platform user (host or guest).  
- **Key Attributes** : `id`, `name`, `email`, `password`, `created_at`, `updated_at`.  
- **Methods** :  
  - `createPlace()` → creates a new place.  
  - `writeReview()` → leaves a review for a place.  
  - `updateProfile()` → updates the user’s profile.  

---

### **Place**
- **Role** : Represents an accommodation listed by a user.  
- **Key Attributes** : `id`, `title`, `description`, `price`, `location`, `created_at`, `updated_at`.  
- **Methods** :  
  - `addAmenity()` / `removeAmenity()` → manage amenities for the place.  
  - `getReviews()` → retrieve all reviews associated with the place.  

---

### **Review**
- **Role** : Allows a user to provide feedback on a place.  
- **Key Attributes** : `id`, `text`, `rating`, `created_at`, `updated_at`.  
- **Methods** :  
  - `editReview()` → modify an existing review.  
  - `deleteReview()` → delete a review.

---

### **Amenity**
- **Role** : Represents a facility or service offered in a place (e.g., Wi-Fi, pool, air conditioning).
- **Key Attributes** : `id`, `name`, `description`, `created_at`, `updated_at`.  
- **Methods** : `updateAmenity()` → updates the amenities.

---

## 2. Relationships between entities

- **User → Place (1..*)** : A user can own multiple places.  
- **User → Review (1..*)** : A user can write multiple reviews. 
- **Place → Review (1..*)** : A place can have multiple reviews.  
- **Place ↔ Amenity** (0..* to 0..*) : Many places can include multiple amenities  

---







# API Sequence Diagrams

## Summary

This document describes four key user interactions in the HBnB Evolution system, using sequence diagrams to illustrate the internal flow.
These flows cover the registration, creation, review, and filtering functionalities.
The architecture follows a three-layer pattern: Presentation → Business → Persistence.

Each use case shares a common logic path:

Service → HBnBFacade → Models → Repository → Database

---

## 1. User Registration

The actions for registering a new user.


**STEPS :**


<img width="902" height="342" alt="Diagramme de sequence User drawio" src="https://github.com/user-attachments/assets/8acf0ea9-6436-4fca-87df-cabb9bbde164" />

**Details**
- `UserService` receives the registration request and validates inputs.
- It forwards the call to `HBnBFacade`, which delegates to `UserModel`.
- `UserModel` creates a new user.
- `DataBase` persists the user in the database.

---

## 2. PLace Creation

The creation of a new place by an user.

**STEPS :**


<img width="761" height="289" alt="Diagramme sequence Place drawio" src="https://github.com/user-attachments/assets/7c8474ad-c625-42b4-aa52-5cb87a8b2019" />

**Details**
- `PlaceService` handles the input and passes it to `HBnBFacade`.
- The Facade calls `PlaceModel`, which creates a new place object.
- The object is stored using `DataBase`.

---

## 3. Review Submission

The feedback of a place by a user.

**STEPS :**


<img width="1061" height="341" alt="Diagramme de sequence Review drawio" src="https://github.com/user-attachments/assets/9f31f75b-67cd-4cc4-87ea-ce1b80714715" />

**Details**
- `ReviewService` collects and validates review data.
- It calls `HBnBFacade`, which uses `ReviewModel`.
- If confirmed, `DataBase` stores the review.


---

## 4. Fetching a List of Places

The user filters places by criteria.

**STEPS :**


<img width="881" height="341" alt="Diagramme de sequence List places drawio" src="https://github.com/user-attachments/assets/89ef852a-e9f8-43f3-ab93-93d563b3bd90" />

**Details**

- `User` sends a query
- `API` passes filters to `Business Logic`.
- `Database`returns matching results.
- Response includes a list of places.





