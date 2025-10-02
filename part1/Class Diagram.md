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
