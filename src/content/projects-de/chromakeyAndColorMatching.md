---
slug: "chromakeyAndColorMatching"
name:
  en: "Chromakey & Color Matching"
  de: "Chromakey & Color Matching"
projectType:
  en: "Java App"
  de: "Java App"
year: "2018"
inDevelopment: false
roles: ["java-dev", "design"]
description:
  en: "A digital image compositing process. Automatically creates high-quality composites. Advantages include the ability to deal with any foreground color, preventing color spill and color grading the subject to match the background."
  de: "Ein digitales Bild-Compositing-Verfahren. Erstellt automatisch hochwertige Composites."
links:
  - label: "Download app"
    url: "/assets/other/ChromakeyAndColorMatching.exe"
order: 10
---

## The Task

    
The goal of this project was to practice computational signal processing techniques for digital media. We researched experimental image processing techniques and decided to combine two techniques that we believed would complement each other well. The first technique is an advanced chroma key, which neutralizes color spill and supports all possible foreground colors. The second technique transfers color characteristics from one image to another. The idea was that by combining these two techniques, we would create a very effective process that creates high-quality image composites, where the subject doesn’t noticeably differ from the background.

  

  
  
    
      
![gallery](assets/img/chromakeyAndColorMatching/lqip/1.jpg)

      
![gallery](assets/img/chromakeyAndColorMatching/lqip/2.jpg)

      
![gallery](assets/img/chromakeyAndColorMatching/lqip/3.jpg)

      
![gallery](assets/img/chromakeyAndColorMatching/lqip/4.jpg)

    
    
      
![gallery](assets/img/chromakeyAndColorMatching/lqip/5.jpg)

      
![gallery](assets/img/chromakeyAndColorMatching/lqip/6.jpg)

      
![gallery](assets/img/chromakeyAndColorMatching/lqip/7.jpg)

      
![gallery](assets/img/chromakeyAndColorMatching/lqip/8.jpg)

    
    
  

  
  
    
## The Result

    
Our interface allows users to select a foreground image that includes both a green and magenta background and create a matte. At the same time, the user is also able to select the background image in which the foreground image will appear on top. The color transfer of the background image will affect the foreground image and apply its characteristics at a set value. Once set, the user is able to control the intensity of the color transfer, brightness transfer, and the blurring of the foreground matte edges to help create a more believable composite image. The user is also able to view all of the process images created to form the final output image in order to view the progression. Lastly, the user is able to save the image they have created with a save button on the bottom of the main screen.

    
The first step in this process is based on the paper Color invariant chroma keying and color spill neutralization for dynamic scenes and cameras (Grundhöfer, Kurz, Thiele, & Bimber, 2010). This technique cleverly uses two complementary background colors, such as green and magenta, to be able to A) feature any colors in the foreground, and B) automatically suppress color spill. A) is achieved by deriving the maximum of the two mattes resulting from a simple chromakey with each background color. B) is achieved by blending the two images with the complementary background colors, so that the light spilling onto the subject is neutralized into a grayscale tone, rather than green or magenta.

    
The second step in the process is not specifically intended for composites but proved to be very useful. The technique described in Color transfer between images (Reinhard, Adhikhmin, Gooch, & Shirley, 2001) analyzes a source image’s color characteristics by calculating the mean and standard deviation of each color channel. These characteristics are then applied to the color distribution of the target image. For this technique to work, the images need to be converted into the lαβ color space, which heavily considers the human visual system and minimizes correlation between channels for most natural scenes.

  

  
  
    
      
        
        An overview of the entire process, with a clear distinction between the two techniques implemented, and additional processing applied to the images.
