---
layout: post
title: "Breakfast with Git"
description: "a few notes about using git the right way (in my opinion)"
category: "l-u-e"
tags: [git]
---
{% include JB/setup %}

For over a year now I have been using git. I consider it the single most valuable tool a software developer must use: good git habits keep your code healthy and clean.

Tons of stuff are available to learn git, so I won't dive into commands. I will give you some links at the bottom in order to start from scratch.

Here I just want to share a few high-level thoughts 

#### Never commit against master
The *Master* branch is the main development line. Each developer must have a chance to start contributing from a _relatively_ clean code base. So, it should be populated only by tested piece of new/updated code. Whenever a fix occurred or a new functionality has to be addressed, first thing is to create a new branch. All the commits goes into this branch.

When you are happy with your work, switch to your local master branch again, merge your dev-branch into it, and push to remote master in order to share the news. Issuing pull request can be necessary according to repository permission rules.

#### Commit very often and exploit messages
Don't worry about committing frequently. Git is very smart at use resources saver (see in Resource section), so it does not waste memory. Furthermore you can better annotate, via commit messages, the changes you are doing and gain an additional media to keep projects metadata.  

Up to a point, metadata and comments can comfortably live along with your codebase but out of it. This reduces the _comment pollution_ in your file. Did you ever come across files with 10 lines of comments and 4 lines of code? Awful, but not so uncommon. Don't put history in code comments. Use messages (and write cleaner self-explaining code, but this is a whole other subject). 

#### Always attach commits to issues 


#### Stash and push to remote branches


#### Don't be afraid of multi-branching


#### Tags and versioning


#### Resources 
* [Git official documentation](http://git-scm.com/doc)
* [Try git course at Code School](https://www.codeschool.com/courses/try-git)
* [How does git store files](http://stackoverflow.com/questions/8198105/how-does-git-store-files)