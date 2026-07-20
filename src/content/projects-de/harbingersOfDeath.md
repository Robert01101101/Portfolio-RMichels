---
slug: "harbingersOfDeath"
name:
  en: "Harbingers Of Death"
  de: "Harbingers Of Death"
projectType:
  en: "LAMP Website"
  de: "LAMP Website"
year: "2018"
inDevelopment: false
roles: ["back-end", "front-end", "java-dev"]
description:
  en: "'Are you going to die?' compiles historic superstitions about death. This project satirizes present-day conspiracy theories, by presenting now-defunct superstitions as if they are real."
  de: "'Are you going to die?' sammelt historische Aberglauben über den Tod. Dieses Projekt satirisiert heutige Verschwörungstheorien, indem es veraltete Aberglauben als real darstellt."
links:
  - label: "View Website"
    url: "http://harbingersofdeath.rmichels.com"
order: 7
---

## The Task

    
The intent of this project was to practice back-end development, using the LAMP stack. Users can sign up to the site, interact with items on the site and are greeted by a customized homepage. The site features database driven content, secure authentication handling, and AJAX searching and filtering.

  

  
  
    
      
        
        Homepage
      
      
        
        Omen Content Unit
      
    
  

  
  
    
## The Result

    
Harbingers of Death presents now-defunct omens sourced from an 1889 article as if they are real, as a satire of modern conspiracy theories. The Content Units are individual omens. They contain information about who is affected, what triggers the omen, and the kind of scenario you would encounter them in. Users can explore them through different taxonomies and by search.

    
Visitors can filter the omens by who is at fault, who will die, and the aspect of life that they apply to. Visitors may also search omens using a text input.

    
Website members sign in to keep track of which omens they have experienced, and whom it indicates is going to die.

  

  
  
    
      
        
        Search
      
      
        
        Filter
      -->
      
        
        Form Styling (ARIA-friendly)
      
      
        
        Member Homepage
      
    
  

  
  
    
## The Code

    
A crucial element for the success of this project was the separation of views and logic. This allowed us to write very clean code. For instance, when I implemented the individual omen's content pages, I seperated code responsible for displaying the page from the code that deals with retrieving and organizing data. At runtime, when the omen route is processed in `index.php`, the code constructs an `Omen` instance using `OmenCollection.php`, and passes this instance to the page view `omen.php`.

  

  
  
    


    


    


  

  
  
    
An interesting challenge was the implementation of floating labels for text inputs. These labels appear like placeholder text until the user enters text into the text input, at which point the labels are shrunk and positioned above the input, like a traditional label. The challenge was making sure that there is no compromise of function for form. As a result, labels and inputs are separate DOM objects, and the form is ARIA-friendly.

  

  
  
    


  

  
  
    
For this project I was also responsible for setting up our database, as well as all database queries. I designed the database with the following tables: user (to store user information), user_omen (an associative table to store which omens a user encountered), omen (to store information about each omen) and three taxonomy tables: aspect, death and fault (for tagging omens). The only two tables that can be modified through our website are the user and user_omen tables. The omen and taxology tables on the other hand are static.

  

  
  
    
      
        
        ER Diagram of our database.
