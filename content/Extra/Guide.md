---
modified: 2025-08-12
---
Little guide for other obsidian editors: 

# Templates

I made templates for new resources in afrocademy, for general pages and for team members. This way everything is styled the same way. 

How to activate templates?
1. Add plugin templater
2. In plugin settings, change template folder location to: content/Extra/Templates
3. Go to settings (below), then **core plugins**, then activate **slash commands**
	1. ![[Pasted image 20250804204602.png]]
4. Now you can add templates by just typing "/" + "templates"


# AfroAcademy
Everything in afroacademy is based on tags, make sure this is done so the tags can work: 
1. Add template "afrocademy"
2. Add the tags to the properties section
	1. ![[Pasted image 20250804204940.png]]
3. Then add the tags to the code
4. Then add the tags to the [[content/en/Afromedica Academy/Afromedica Academy]] site (both in the properties section and in the code)

# Properties
![[Pasted image 20250804205309.png]]
- title: the website will make this the title no matter what is written as the title in the heading
- publish: page will only be published if this is checked
- modified: when the page was last modified, this happens automatically if you have the plugin "update time on edit"

# Index
= home page of the site

# Wiki-links
- make a wikilink by typing "[["
- you can add external links, or internal links with different name by right clicking
	- ![[Pasted image 20250804210249.png]]