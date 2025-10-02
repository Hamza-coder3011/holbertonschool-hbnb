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

