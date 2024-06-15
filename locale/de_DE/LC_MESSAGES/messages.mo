��    ^           �      �  �   �       +  �  �   �	  �   ^
       I     H   b  1   �  �   �    n  �   �     0     6  �   ?       C     �   U  �   �  �   u  �   U  
   >  e  I    �     �     �  Y   �     1  	   F  
   P  	   [  M   e  �   �     _     k  �   y     P     f     ~     �  �   �  F  �  u  �  r   c    �     �     �  �    �   �   �  �!  �  0#     0%     6%     ?%     N%  $   U%     z%  �   �%     &  #   &     =&     F&     Y&     `&  �  o&     (  ]  )  _  b+    �.  U  B0  �  �2  �   �4  (  5  K   B6  $   �6    �6  u   �7     18     M8  	   R8  B  \8  �  �9     |;  (   �;     �;     �;  	   �;     �;  x  �;  6   f=  %  �=     �>     �>  �   �>  �   �?     O@  w  W@  �   �A  �   �B     qC  Q   wC  K   �C  -   D  �   CD  }  �D  �   zF  
   NG  
   YG    dG     yH  V   �H  �   �H  �   �I  !  TJ    vK     �L  �  �L  Y  oN     �O     �O  {   �O     YP     xP     �P  	   �P  R   �P  �   �P     �Q     �Q  �   �Q     �R     �R     S  �  .S    �U  �  �V  �  yX  �   fZ  H  �Z     4\     ;\    [\  �   j^    F_  �  Ma     �c  
   �c     �c  
   �c  (   d     0d  �   8d     �d  #   �d  
   	e     e     )e     6e    Ne  I  jg  �  �h  �  �k  �  p  P  �q  3  u  �   Dw  k  �w  l   My  1   �y  >  �y  �   +{  1   �{     |  	   	|  �  |  j  �}     �  +   (�     T�     o�  
   t�     �  �  ��  ;   <�  a  x�     ڃ     ��     X       3   C      K   ^             4       '   2   J       W             V       R   Q   	      !      =      &   N   O       L   1           I           S       Z           P       :         ?   U   
      ,                                M      F             0          (       >   D      H       )   E   +      B   #             @       <   [   %   *       -          7   G      \   Y   9       ]   8       "       /   6          $   A   ;       T             5      .     also made contributions. Some functionality was also carried over from the Ada Viewer app, upon which the Clirio View app was based.  page.  using Blazor, to try using a web framework that has C# as its programming language, which would be an advantage considering we also used C# for Unity development. After setting up authentication, subscription management, and workspace listing with metadata, development was mostly handed off to me.  versions of the Clirio View apps, complexity had ballooned, as MRTK2 had poor cross-platform support, which resulted in different prefabs, UI, and logic for iOS and HMDs.  with few options, the feature was later expanded to include expiry, password protection, and embed functionalities. Finally, in 2023, the UI was refreshed in collaboration with  , and  , view logic and prefabs were combined, which greatly reduced complexity. , who designed mockups in Figma, as the Clirio View app was migrated to  , who designed mockups, which I then implemented. A collection of features in the Clirio View apps for loading and viewing photogrammetry scans. Includes on-map, XR, comparison, and other views. A noteworthy feature that was added fairly late, are the interactive Bing maps. These are used to position new workspaces and points of interest and can get the user's location for convenience. They are accommodated by a set of GPS coordinate input fields, which sync with the map. A web-based collection of tools for managing workspaces in Clirio View. Includes a user dashboard, workspace and observation creation tools, and interactive Bing maps. About About Me After adding all of the workspace management features such as 3D model upload and user invitations, I started working on another set of stories revolving around the dashboard. I partnered up with  All Projects An example of data binding between the form and data model for the  An interactive example of an embedded scan share. Click and drag to look at the model from different angles. The same share can also be opened on its  An interesting change to my approach to writing controllers was first tested in this feature, after a discussion I had with my teammate  An overview of the different scan views in the Clirio View Meta Quest VR app. A scan is first opened on-map, then scan view is entered, where the scan is viewed from different angles, measured, and compared to another scan. Another layer of complexity was the different file formats, features, and sources for 3D models. Especially the various material properties, texture reference formats, coordinate and unit systems were tricky to develop and test for. Challenges Challenges with the setup of Three.js included adding support for loading the texture files defined in the MTL file with the correct SAS tokens, ensuring different MTL file formats and material properties are supported and displayed as desired, and making the viewer dynamic so it supports a wide range of model sizes and shapes, on a wide range of devices. Clirio Cloud is a collection of tools that have been growing over time. These tools are provided to users of the Clirio Suite on a website developed with Blazor. Clirio builds solutions that help users inspect, document, and collaborate in 3D and XR on geospatial workspaces. Code Sample Company Contact me if you would like to make cool stuff together! I'm currently looking for work. Copied to Clipboard! Copyright Create POI Dashboard Developed with Blazor and Three.js. Backend token sharing was implemented by  Developed with C# in Unity, as a pop-up accessible through the observation details view of any scan in the Clirio View app. UI was designed in Figma in collaboration with  Development Featured Work Furthermore, Clirio Cloud provides an analytics dashboard to users, as well as an easy way to access the Clirio knowledge base and training videos. Finally, there also are subscription and account management tools. Hi there, I'm Robert! Hi, I'm Robert Michels. I design and program I enjoyed learning Blazor, as it shared some similarities to PHP but had quite a lot of advantages, such as easy form binding to data models, data validation, and improved readability and writeability to me as a developer who often works in C#. Besides Blazor, the Tailwind CSS Framework was also new to me, but learning that wasn't too hard since I am fairly familiar with CSS3. I did enjoy learning about it too, because I prefer its customizability and efficiency compared to Bootstrap, although I still prefer Sass for my personal projects. I'm a designer, and developer from Vancouver. My inexhaustible curiosity and love for digital media led me to attend Simon Fraser University (SFU), where I earned my Bachelor's Degree of Science with a major in Interactive Arts & Technology. I've prototyped, designed, and developed various interactive applications throughout my career, covering everything from XR to web development. These experiences have shaped me into a designer who emphasizes a user-goal-driven approach, a developer who values scalability and accessibility, and an expert in rapid prototyping. Implementing the webviewer was the more complex story, as it was standalone and most functionality needed to be created from scratch. The viewer was written in C# with Blazor, JavaScript with Three.js, and uses Tailwind CSS for styling. I had worked with Three.js in the past and enjoyed using it again, and a lot of my work revolved around setting up the viewer correctly. In the past, I would write public functions for button clicks, and hook them up in the inspector via the button's  Later, other features were added, such as viewing scans on-map, more viewing tools such as freehand manipulation in XR, and more comparison modes such as the overlay mode which fades the transparencies on XR, and the swipe comparison view on iOS which crops the viewports. Learning On-Map View (Desktop) Once the user is satisfied with their selected options, they can generate the link, and either copy it to the clipboard or use the share function to trigger the share options native to each platform. For instance, on iOS this will open the share dialogue with compatible apps such as messengers, while on Windows the mail app will open. There is also an option for users to configure and generate a formatted embed iframe element with the share. One of the biggest challenges has been the complexity originating from different UX flows, platforms, features, and states which have been expanded slowly over time. Particularly in the final  One of the key features of the Clirio product suite is the capability to capture photogrammetry scans with LiDAR-enabled iOS devices, and then manage and view those scans. Captured scans can be viewed on-map, they can be always-on as an integral part of the map, or they can be viewed in scan view mode which comes with measure, comparison, and XR capabilities depending on the platform. In XR view, the scan can be scaled to  One of the main goals of Clirio Cloud is to complement the upload and organizational capabilities of the iOS Clirio apps, which serve as the primary capture platform. While a user can easily capture and upload 3D photogrammetry scans with Clirio's iOS apps, they might also want to upload other 3D models, for which Clirio Cloud provides an interface. Other workspace tools are upload and management of custom basemaps, upload of boreholes, guest invitations, point of interest creation, and workspace deletion. Other Overview Privacy Policy Resume Robert Michels. All Rights Reserved. Say Hi: Scan Share is a feature of the Clirio product suite, for sharing photogrammetry scans quickly, and displaying them in a webviewer. Scan View (Desktop) Scan View Comparison Mode (Desktop) See More Share UI and Logic Skills Skills Applied Solutions for these complexity challenges typically involved unifying behaviors, once similarities had been identified, and there was time to refactor. For instance, saving the initial state and reset behavior was unified across platforms and modes, and the logic for switching in and out of AR in scan view was combined with the logic for doing the same in map view. Furthermore, with the migration to  Some examples of data model binding to forms in Blazor. Expanding/collapsing optional sections of the form, and rearranging elements in a list, is made easy with Blazor since user inputs result in direct feedback without the need to write boilerplate code. The Clirio Scan Share feature lets users quickly share a photogrammetry scan captured with the Clirio Scan app. The feature is comprised of share options in the Clirio View app developed in Unity and a webviewer developed in Blazor and Three.js, through which shared scans can be viewed. Pressing the share button on any of the Clirio View apps will open a pop-up to configure the share. The user has the option to set expiry, password protection, and to require that the viewer has been invited to the workspace, in which case the recipient will need to log in with their Clirio account to view the scan. The biggest challenge for me was designing the UX, as there were a lot of options for the user. This included the option to make shares private so that users could restrict sharing internally to teams in workspaces, which required an additional authentication flow in the webviewer as well. The range of options also made it more difficult to design a compact UI. I utilized dynamic design and layouts so that hidden options such as expiry renewal or password change could be elegantly hidden or shown. Developing the logic was a fairly easy process, thinking about how the feature should work in the first place was the bigger challenge. After every user interaction, the UI refreshes to match the share configuration and all other states. If there is a share matching the configuration, that existing link is shown, otherwise the generate share button is shown. The code snippet below contains the code related to loading the 3D Model inside the webviewer, using Three.js. It's a small section of the actual file, but it shows some of the solutions to challenges encountered, such as the modified process for loading the textures defined in the MTL file using SAS tokens, and functions to help configure the viewer based on the model dimensions. The first stories I implemented revolved around workspace management, where I added observation upload features. These typically use Blazor's forms to let users fill out required information, and a file upload tray. These first stories encompassed a variety of challenges. I had to connect to our APIs to load workspace and POI data, as well as to upload data. There was also the need to validate certain data such as coordinates, and to provide user feedback such as marking required or incorrect fields and showing the upload status. I designed the UI on the fly, following the existing styling. The initial set of requirements was the loading and viewing of scans in a scan view mode (no map), which would be supported in AR on the HoloLens 2, and in 3D non-AR on iOS. Once these core functionalities had been implemented, one of the most important additions was the comparison and measure modes. An important workflow supported by the Clirio View apps is the analysis and monitoring of construction sites, for which scan comparisons help detect differences, and scan measurements help understand scale. The returned result includes a URL for the client to display to the user, and to include in native share options for each platform. The scan views have been continuously worked on from 2021 to 2023. In that timeframe, I was responsible for setting up most of the logic and views involved. My workflow involved designing UX and UI, and then quickly prototyping and refining until each feature was ready for release. My teammates  The share UI has gone through multiple iterations. Initially developed for  The website was initially set up by  The webviewer through which recipients can view the scan is intended to be as lightweight and accessible as possible. The scan can be viewed from different angles, some metadata and a scale legend is displayed, and there are some buttons to hide or show elements. There were two stories for the development of this feature: the clientside app share UI and logic, and the webviewer. This portfolio website was  Type Webviewer When a user opens the share panel for a scan, the client checks whether there are existing links. If there are, the existing links are provided for the user to share. For any new configuration of a share that hasn't been created yet, the user can press generate, and a request will be sent to a backend API implemented by  When the user opens a share link, the page sends a request to our backend API to gather information about the share, including whether it's public, and a list of SAS tokens for all the files required to render the scan. If the scan is private, the user is routed to a login page, otherwise, the scan begins to load its resources right away. The viewer is lightweight, and only provides some metadata, and options to reset the view and show/hide the grid and dimensions legend. Workspace List Workspace Management Example: Create POI Workspace Management Tools Year developed digital media. event. Here, I instead set all the event listeners in the controller itself, kept all the corresponding listener functions private, and simplified the inspector setup so that each button only gets assigned once to the controller, and no other reference is needed. This makes setup in the editor less error-prone and maintainable, as it requires less understanding of the code. games.", "VR experiences.", "mobile apps.", "websites. or 1:1 scale, or freely manipulated with hand manipulation. On iOS and Desktop, the view is controlled by touch or mouse inputs. Comparison views feature side-by-side, swipe, and overlay modes. Besides scans captured with Clirio Scan, other 3D models are also supported and can be uploaded on  page with the LAMP stack. Project-Id-Version: PACKAGE VERSION
Report-Msgid-Bugs-To: 
PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE
Last-Translator: Robert Michels
Language: de
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
  leisteten ebenfalls Beiträge. Einige Funktionen wurden auch von der Ada-Viewer-App übernommen, auf der die Clirio-View-App basiert.  Seite.  unter der verwendung von Blazor, um ein Web-Framework mit C# als Programmiersprache auszuprobieren, was ein Vorteil wäre, wenn man bedenkt, dass wir C# auch für die Unity-Entwicklung verwenden. Nach der Einrichtung der Authentifizierung, der Abonnementverwaltung und der Auflistung der Arbeitsbereiche mit Metadaten wurde die Entwicklung größtenteils an mich übergeben.  Versionen der Clirio View-Apps hatte die Komplexität stark zugenommen, da MRTK2 nur unzureichend plattformübergreifende Unterstützung bot, was zu unterschiedlichen Prefabs, UI und Logik für iOS und HMDs führte.  mit wenigen Optionen, wurde die Funktion später um Funktionen wie Ablaufdatum, Passwortschutz und Einbettung erweitert. Im Jahr 2023 wurde die Benutzeroberfläche neu designed in Zusammenarbeit mit   und   Ansichtslogik und Prefabs kombiniert, was die Komplexität erheblich reduzierte. , der Mockups in Figma entwarf, als die Clirio View App mirgriert wurde zu  , der Mockups entwarf, die ich dann umsetzte. Eine Sammlung von Funktionen in den Clirio View Anwendungen zum Laden und Betrachten von Photogrammetrie-Scans. Umfasst die Ansichten Auf der Karte, XR, Vergleich und andere Ansichten. Eine bemerkenswerte Funktion, die relativ spät hinzugefügt wurde, sind die interaktiven Bing-Karten. Diese werden verwendet, um neue Arbeitsbereiche und Points of Interest zu positionieren, und können den Standort des Benutzers zur Bequemlichkeit abrufen. Sie werden durch eine Reihe von Eingabefeldern für GPS-Koordinaten unterstützt, die mit der Karte synchronisiert werden. Eine webbasierte Sammlung von Tools zur Verwaltung von Arbeitsbereichen in Clirio View. Enthält ein Benutzer-Dashboard, Tools zur Erstellung von Arbeitsbereichen und Beobachtungen sowie interaktive Bing-Karten. Über Mich Über Mich Nachdem ich alle Funktionen zur Verwaltung des Arbeitsbereichs, wie z. B. den Upload von 3D-Modellen und Benutzereinladungen, hinzugefügt hatte, begann ich mit der Arbeit an einer weiteren Reihe von Geschichten, die sich um das Dashboard drehten. Ich habe mich gepartnert mit Alle Projekte Ein Beispiel für die Datenbindung zwischen dem Formular und dem Datenmodell für die  Ein interaktives Beispiel für eine eingebettete Scanshare. Klicken und ziehen Sie, um das Modell aus verschiedenen Blickwinkeln zu betrachten. Der scan ist auch erreichbar auf seiner eigenen  Eine interessante Änderung meiner Herangehensweise an das Schreiben von Controllern wurde zum ersten Mal in diesem Feature getestet, nach einer Diskussion mit meinem Teamkollegen  Ein Überblick über die verschiedenen Scanansichten in der Clirio View Meta Quest VR-App. Ein Scan wird zunächst auf der Karte geöffnet, dann wird die Scanansicht aufgerufen, in der der Scan aus verschiedenen Blickwinkeln betrachtet, gemessen und mit einem anderen Scan verglichen wird. Eine weitere Ebene der Komplexität waren die verschiedenen Dateiformate, Funktionen und Quellen für 3D-Modelle. Insbesondere die verschiedenen Materialeigenschaften, Texturreferenzformate, Koordinaten- und Einheitensysteme waren schwierig zu entwickeln und zu testen. Herausforderungen Zu den Herausforderungen bei der Einrichtung von Three.js gehörten das Hinzufügen von Unterstützung für das Laden der in der MTL-Datei definierten Texturdateien mit den korrekten SAS-Tokens, die Sicherstellung, dass verschiedene MTL-Dateiformate und Materialeigenschaften unterstützt und wie gewünscht angezeigt werden, und die Gestaltung eines dynamischen Viewers, der eine breite Palette von Modellgrößen und -formen auf einer Vielzahl von Geräten unterstützt. Clirio Cloud ist eine Sammlung von Tools, die im Laufe der Zeit gewachsen ist. Diese Tools werden den Nutzern der Clirio Suite auf einer mit Blazor entwickelten Website zur Verfügung gestellt. Clirio entwickelt Lösungen, die den Nutzern helfen, geodätische Arbeitsbereiche in 3D und XR zu inspizieren, zu dokumentieren und zusammenzuarbeiten. Code Beispiel Firma Kontaktieren Sie mich, wenn Sie gemeinsam an coolen Projekten arbeiten möchten! Derzeit bin ich auf der Suche nach Arbeit. In die Zwischenablage kopiert! Urheberrecht POI Erstellen Dashboard Entwickelt mit Blazor und Three.js. Backend Token-Sharing wurde implementiert von  Entwickelt mit C# in Unity, als Pop-up, das über die Beobachtungsdetails eines beliebigen Scans in der Clirio View App zugänglich ist. Die Benutzeroberfläche wurde in Figma in Zusammenarbeit mit Jordan Wischmann entworfen. Entwicklung Projektübersicht Darüber hinaus bietet Clirio Cloud den Nutzern ein Analyse-Dashboard sowie eine einfache Möglichkeit, auf die Clirio-Wissensdatenbank und Schulungsvideos zuzugreifen. Schließlich gibt es auch Tools zur Abonnement- und Kontoverwaltung. Hallo, Ich bin Robert! Hi, Ich bin Robert Michels. Ich designe und programmiere Es hat mir Spaß gemacht, Blazor zu lernen, da es einige Ähnlichkeiten mit PHP aufweist, aber eine ganze Reihe von Vorteilen hat, wie z. B. die einfache Formularanbindung an Datenmodelle, die Datenvalidierung und die verbesserte Lesbarkeit und Schreibbarkeit für mich als Entwickler, der oft in C# arbeitet. Neben Blazor war auch das Tailwind CSS Framework neu für mich, aber das zu lernen war nicht allzu schwer, da ich mit CSS3 recht gut vertraut bin. Es hat mir auch Spaß gemacht, es kennenzulernen, weil ich seine Anpassbarkeit und Effizienz im Vergleich zu Bootstrap bevorzuge, obwohl ich für meine persönlichen Projekte immer noch Sass bevorzuge. Ich bin ein Designer und Entwickler aus Vancouver. Meine unerschöpfliche Neugier und Liebe zu digitalen Medien führten mich dazu, die Simon Fraser University (SFU) zu besuchen, wo ich meinen Bachelor of Science mit einem Schwerpunkt in Interaktiver Kunst und Technologie erworben habe. Im Laufe meiner Karriere habe ich verschiedene interaktive Anwendungen prototypisiert, entworfen und entwickelt, die alles von XR bis zur Webentwicklung abdecken. Diese Erfahrungen haben mich zu einem Designer geformt, der eine benutzerzielorientierte Herangehensweise betont, zu einem Entwickler, der Skalierbarkeit und Zugänglichkeit schätzt, und zu einem Experten im Bereich des schnellen Prototypings. Die Implementierung des Webviewers war die komplexere Geschichte, da es sich um eine eigenständige Anwendung handelt und die meisten Funktionen von Grund auf neu erstellt werden mussten. Der Viewer wurde in C# mit Blazor und JavaScript mit Three.js geschrieben und verwendet Tailwind CSS für das Styling. Ich hatte bereits in der Vergangenheit mit Three.js gearbeitet und genoss es, es wieder zu verwenden, und ein Großteil meiner Arbeit drehte sich darum, den Viewer korrekt einzurichten. In der Vergangenheit habe ich öffentliche Funktionen für Buttonklicks geschrieben und sie im Unity Inspektor verknüpft über das  Später kamen weitere Funktionen hinzu, z. B. die Anzeige von Scans auf der Karte, weitere Anzeigewerkzeuge wie die Freihandmanipulation in XR und weitere Vergleichsmodi wie der Überlagerungsmodus, mit dem die Transparenzen in XR ausgeblendet werden, und die Swipe-Vergleichsansicht in iOS, die die Ansichtsfenster beschneidet. Lehren Auf der Karte Ansicht (Desktop) Sobald der Benutzer mit den ausgewählten Optionen zufrieden ist, kann er den Link erstellen und ihn entweder in die Zwischenablage kopieren oder die Freigabefunktion verwenden, um die plattformeigenen Freigabeoptionen auszulösen. Unter iOS wird beispielsweise der Freigabedialog mit kompatiblen Apps wie Messenger geöffnet, während unter Windows die Mail-App geöffnet wird. Es gibt auch eine Option, mit der die Nutzer ein formatiertes, eingebettetes Iframe-Element für die Freigabe konfigurieren und generieren können. Eine der größten Herausforderungen war die Komplexität, die sich aus den verschiedenen UX-Flows, Plattformen, Funktionen und Zuständen ergab, die im Laufe der Zeit langsam erweitert wurden. Besonders in den letzten  Eine der wichtigsten Funktionen der Clirio-Produktsuite ist die Möglichkeit, photogrammetrische Scans mit LiDAR-fähigen iOS-Geräten zu erfassen und diese Scans anschließend zu verwalten und anzuzeigen. Erfasste Scans können auf der Karte angezeigt werden, sie können immer als integraler Bestandteil der Karte angezeigt werden, oder sie können im Scan-Ansichtsmodus angezeigt werden, der je nach Plattform über Mess-, Vergleichs- und XR-Funktionen verfügt. In der XR-Ansicht kann der Scan skaliert werden auf  Eines der Hauptziele von Clirio Cloud ist es, die Upload- und Organisationsfunktionen der iOS-Apps von Clirio zu ergänzen, die als primäre Erfassungsplattform dienen. Während ein Benutzer mit den iOS-Apps von Clirio problemlos 3D-Photogrammetriescans erfassen und hochladen kann, möchte er möglicherweise auch andere 3D-Modelle hochladen, für die Clirio Cloud eine Schnittstelle bereitstellt. Weitere Werkzeuge für den Arbeitsbereich sind das Hochladen und Verwalten von benutzerdefinierten Basiskarten, das Hochladen von Bohrlöchern, das Einladen von Gästen, das Erstellen von Points of Interest und das Löschen von Arbeitsbereichen. Sonstige Übersicht Datenschutzerklärung Lebenslauf Robert Michels. Alle Rechte vorbehalten. Sag Hi: Scan Share ist eine Funktion der Clirio-Produktsuite, mit der Photogrammetriescans schnell ausgetauscht und in einem Webviewer angezeigt werden können. Scan View (Desktop) Scan View Vergleichsmodus (Desktop) Siehe Mehr Sharing UI und Logik Fähigkeiten Angewandte Fähigkeiten Die Lösungen für diese Komplexitätsherausforderungen bestanden in der Regel in der Vereinheitlichung von Verhaltensweisen, sobald Ähnlichkeiten identifiziert worden waren und Zeit für ein Refactoring zur Verfügung stand. So wurden beispielsweise das Speichern des Ausgangszustands und das Rücksetzverhalten plattform- und modusübergreifend vereinheitlicht, und die Logik für das Ein- und Ausschalten von AR in der Scanansicht wurde mit der Logik für dasselbe in der Kartenansicht kombiniert. Außerdem wurde mit der Migration zu  Einige Beispiele für die Anbindung von Datenmodellen an Formulare in Blazor. Das Erweitern/Kollabieren von optionalen Abschnitten des Formulars und das Umordnen von Elementen in einer Liste wird mit Blazor leicht gemacht, da die Benutzereingaben zu einem direkten Feedback führen, ohne dass man Boilerplate-Code schreiben muss. Mit der Clirio Scan Share-Funktion können Benutzer einen mit der Clirio Scan-App erfassten Photogrammetrie-Scan schnell teilen. Die Funktion besteht aus Freigabeoptionen in der in Unity entwickelten Clirio View-App und einem in Blazor und Three.js entwickelten Webviewer, über den geteilte Scans betrachtet werden können. Durch Drücken der Freigabe-Schaltfläche in einer der Clirio View-Apps öffnet sich ein Pop-up-Fenster zur Konfiguration der Freigabe. Der Benutzer hat die Möglichkeit, den Ablauf und den Passwortschutz festzulegen und zu verlangen, dass der Betrachter in den Arbeitsbereich eingeladen wurde. In diesem Fall muss sich der Empfänger mit seinem Clirio-Konto anmelden, um den Scan anzuzeigen. Die größte Herausforderung für mich war die Gestaltung der Benutzeroberfläche, da es eine Vielzahl von Optionen für den Benutzer gab. Dazu gehörte auch die Option, Freigaben privat zu machen, so dass Benutzer die Freigabe intern auf Teams in Arbeitsbereichen beschränken konnten, was ebenfalls einen zusätzlichen Authentifizierungsfluss im Webviewer erforderte. Die Vielzahl der Optionen erschwerte auch die Gestaltung einer kompakten Benutzeroberfläche. Ich nutzte dynamisches Design und Layouts, damit versteckte Optionen wie die Verlängerung des Gültigkeitszeitraums oder die Änderung des Passworts elegant ein- oder ausgeblendet werden konnten. Die Entwicklung der Logik war ein relativ einfacher Prozess, die größere Herausforderung war die Überlegung, wie die Funktion überhaupt funktionieren sollte. Nach jeder Benutzerinteraktion wird die Benutzeroberfläche aktualisiert, um der Freigabekonfiguration und allen anderen Zuständen zu entsprechen. Wenn es eine Freigabe gibt, die mit der Konfiguration übereinstimmt, wird dieser vorhandene Link angezeigt, andernfalls wird die Schaltfläche zum Erzeugen einer Freigabe angezeigt. Der unten stehende Codeschnipsel enthält den Code zum Laden des 3D-Modells im Webviewer mit Three.js. Es handelt sich um einen kleinen Ausschnitt aus der eigentlichen Datei, aber er zeigt einige der Lösungen für aufgetretene Herausforderungen, wie z. B. den geänderten Prozess zum Laden der in der MTL-Datei definierten Texturen mithilfe von SAS-Tokens und Funktionen zur Konfiguration des Viewers auf der Grundlage der Modellabmessungen. Die ersten features, die ich implementiert habe, drehten sich um die Verwaltung von Arbeitsbereichen, wo ich Funktionen zum Hochladen von Beobachtungen hinzugefügt habe. Diese nutzen typischerweise die Formulare von Blazor, um den Benutzern das Ausfüllen der erforderlichen Informationen zu ermöglichen, sowie einen Dateiupload-Tray. Diese ersten Projekte waren mit einer Reihe von Herausforderungen verbunden. Ich musste eine Verbindung zu unseren APIs herstellen, um Arbeitsraum- und POI-Daten zu laden und Daten hochzuladen. Außerdem mussten bestimmte Daten, wie z. B. Koordinaten, validiert und dem Benutzer Feedback gegeben werden, z. B. durch Markierung erforderlicher oder falscher Felder und Anzeige des Upload-Status. Ich habe die Benutzeroberfläche währrend der Umsetzung entworfen und mich dabei an das bestehende Styling gehalten. Die ersten Anforderungen waren das Laden und Betrachten von Scans in einem Scan-Ansichtsmodus (keine Karte), der in AR auf der HoloLens 2 und in 3D-Non-AR auf iOS unterstützt werden sollte. Nachdem diese Kernfunktionalitäten implementiert worden waren, war eine der wichtigsten Ergänzungen der Vergleichs- und Messmodus. Ein wichtiger Arbeitsablauf, der von den Clirio View-Apps unterstützt wird, ist die Analyse und Überwachung von Baustellen, bei denen Scan-Vergleiche helfen, Unterschiede zu erkennen, und Scan-Messungen helfen, den Maßstab zu verstehen. Das zurückgegebene Ergebnis enthält eine URL, die der Client dem Benutzer anzeigen und in die nativen Freigabeoptionen für jede Plattform aufnehmen kann. An den Scanansichten wurde von 2021 bis 2023 kontinuierlich gearbeitet. In diesem Zeitraum war ich für die Einrichtung der meisten Logiken und Ansichten verantwortlich. Zu meinem Arbeitsablauf gehörte das Entwerfen von UX und UI und dann das schnelle Prototyping und die Verfeinerung, bis jede Funktion für die Veröffentlichung bereit war. Meine Teamkollegen  Die Benutzeroberfläche für die Freigabe hat mehrere Iterationen durchlaufen. Ursprünglich entwickelt mit  Die Website wurde ursprünglich eingerichtet von  Der Webviewer, mit dem die Empfänger den Scan betrachten können, soll so einfach und zugänglich wie möglich sein. Der Scan kann aus verschiedenen Blickwinkeln betrachtet werden, es werden einige Metadaten und eine Maßstabslegende angezeigt, und es gibt einige Schaltflächen zum Ein- und Ausblenden von Elementen. Für die Entwicklung dieser Funktion gab es zwei Bereiche: die gemeinsame Nutzung der Benutzeroberfläche und der Logik der clientseitigen Anwendung und den Webviewer. Diese Portfolio Website wurde mit dem LAMP-Stack  Typ Webviewer Wenn ein Benutzer das Freigabe-Panel für einen Scan öffnet, prüft der Client, ob es bereits Links gibt. Wenn dies der Fall ist, werden die vorhandenen Links für den Benutzer zur Freigabe bereitgestellt. Für jede neue Konfiguration einer Freigabe, die noch nicht erstellt wurde, kann der Benutzer auf Generieren drücken, woraufhin eine Anfrage an eine Backend-API gesendet wird, die entwickelt wurde von  Wenn der Benutzer einen Freigabelink öffnet, sendet die Seite eine Anfrage an unsere Backend-API, um Informationen über die Freigabe zu sammeln, einschließlich der Angabe, ob sie öffentlich ist, und eine Liste von SAS-Tokens für alle Dateien, die zum Rendern des Scans erforderlich sind. Wenn der Scan privat ist, wird der Benutzer zu einer Anmeldeseite weitergeleitet, andernfalls beginnt der Scan sofort mit dem Laden seiner Ressourcen. Der Viewer ist leichtgewichtig und bietet nur einige Metadaten sowie Optionen zum Zurücksetzen der Ansicht und zum Ein- und Ausblenden des Rasters und der Dimensionslegende. Workspace Liste Workspace Management Beispiel: Erstelle POI Workspace Management Tools Jahr entwickelt Digitale Medien. Event. Hier habe ich stattdessen alle Ereignis-Listener im Controller selbst gesetzt, alle entsprechenden Listener-Funktionen privat gehalten und die Einrichtung des Inspektors vereinfacht, so dass jede Schaltfläche nur einmal dem Controller zugewiesen wird und keine weitere Referenz benötigt wird. Dies macht die Einrichtung im Editor weniger fehleranfällig und wartbar, da es weniger Verständnis für den Code erfordert. Videospiele.", "VR Erlebnisse.", "Mobile Apps.", "Websiten. oder im Maßstab 1:1, oder frei mit der Hand manipuliert werden. Auf iOS und Desktop wird die Ansicht durch Touch- oder Mauseingaben gesteuert. Vergleichsansichten bieten die Modi Seite-an-Seite, Streichen und Überlagern. Neben Scans, die mit Clirio Scan erfasst wurden, werden auch andere 3D-Modelle unterstützt und können hochgeladen werden in die  Seite . 