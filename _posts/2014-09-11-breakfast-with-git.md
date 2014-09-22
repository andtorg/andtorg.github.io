---
layout: post
title: "Breakfast with Git"
description: "a few notes about using git the right way (in my opinion)"
category: "lue"
tags: [git]
---
{% include JB/setup %}

For over a year now I have been using git. I consider it the single most valuable tool a software developer must use: good git habits keep your code healthy and clean.

Tons of stuff are available to learn git, so I won't dive into commands. I will give you some links at the bottom in order to start from scratch.

Here I just want to share a few high-level thoughts. 

<br>

#### Never commit against master
The *Master* branch is the main development line. Each developer must have a chance to start contributing from a _relatively_ clean code base. So, it should be populated only by tested piece of new/updated code. Whenever a fix occurred or a new functionality has to be addressed, first thing is to create a new branch. All the commits goes into this branch.

When you are happy with your work, switch to your local master branch again, merge your dev-branch into it, and push to remote master in order to share the news. Issuing pull request can be necessary according to repository permission rules.

<br>

#### Commit very often and exploit messages
Don't worry about committing frequently. Git is very smart (see in Resource section), so it does not waste memory. Furthermore you can better annotate, via commit messages, the changes you are doing and gain an additional media to keep projects metadata.  

Up to a point, metadata and comments can comfortably live along with your codebase but out of it. This reduces the _comment pollution_ in your file. Did you ever come across files with 10 lines of comments and 4 lines of code? Awful, but not so uncommon. Don't put history in code comments. Use messages (and write cleaner self-explaining code, but this is a whole other subject). 

<br>

#### Always attach commits to issues
For this you need an issue tracking system. Both [Github](https://github.com/) and [Bitbucket](https://bitbucket.org/) have a not-so-minimal free platform that allows you to open issues and attach code changes via smart commit messages, i.e. referencing issues with special symbol or syntax. I found this is a very good way to save additional information about your development progress. An entire discussion among several developers can be stored alongside the code under modification, without resort to external systems that would be very hard to check later (think about emails). As a bonus, smart commits let you set the issue status, for instance closing when pushing the last fix as in a github `git commit -m 'added a towel class; fix #42'`. There are of course more sophisticated issue trackers, like [Jira](https://www.atlassian.com/software/jira), that can be hooked to git repository hosting, but the logic behind the scene is almost similar.

<br>

#### Don't be afraid of multi-branching
Sometimes you need working on different features. A good practice is to keep these parallel jobs separated in each own branch (I use to give branch a name containing the issue-to-be-solved number). So, you can have a functionality waiting for tests, a fix to apply elsewhere, a completely new feature in an early development stage. Branches can also be originated by other branch, in a tree fashion. I suggest using this kind of structure whenever the code you are writing has an autonomous bulk. The only rule you need to keep in mind is that branches must be merged in the right order, i.e. the children in the parent, in order to unwind the tree and reach for the master. 
Occasionally, you would update your branch with new code recently pushed either by other developers or by you on a parent branch. In a such a case you would merge the parent in the children and keep working on the last. I always do that when a branch takes too long and I would like to check if something has happened I should be concerned of. [Dag](http://stackoverflow.com/questions/1057564/pretty-git-branch-graphs) diagrams are very helpful at visualizing branch hierarchy and suggesting the merging order.
What if you need to quickly switch to another branch with some modifications already applied, but not committed (this can happen when code is _too unfinished_ also for a commit)? *Stash* is your friend here. Basically, the stash command freezes your changes and stores it aside, allowing you to come back later, maybe after another chunk of work executed elsewhere in your base.       
Finally, consider pushing to remote when you need backups. Git repositories can be either local or remote. When you commit changes, you are actually alter the local instance of the repository. I use to push upstream if the life of the branch is longer than, say, one working day. Furthermore, it is a way to let other devs to give a look in what are you doing. You can always delete remote (and local) branches after merging into master. Actually I recommend deleting in order to have a clean tree.

<br>

#### Tags and versioning
Last, let's talk about those times when you would like to release something stable enough to find its way into the wild. You can image tags, not surprisingly, as labels attached to a specific points of the development course. At each of this point you made an assertion about the status of the software. You should distribute only tags. As a plus, you can also embed git tags in your build metadata. I recently exploited this feature with a couple of ant execute tasks calling `git describe --abbrev=0` that returns last tag label, and `git log --pretty=format:%h -n 1` that returns last commit hash. Then, via token, passed these returned strings to placeholders in a config.properties. This way, I can mark each build with the last defined tag and the last commit and always know what distribution we are talking about when customers raise an issue.  

<br>

That's all for now. Comments are welcome.

<br>

#### Resources 
* [Git official documentation](http://git-scm.com/doc)
* [Try git course at Code School](https://www.codeschool.com/courses/try-git)
* [How does git store files](http://stackoverflow.com/questions/8198105/how-does-git-store-files)
